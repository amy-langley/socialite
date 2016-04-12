import express from 'express'
import grantConfig from '../../config/grant-config.json'

import {User, LinkedAccount} from '../../models'

export default class AdapterBase{

  makeCredentials(serviceName, tokenSource){
    tokenSource.get = tokenSource.get || (key => tokenSource[key])
    var credentials = {
      consumer_key: grantConfig[serviceName].key,
      consumer_secret: grantConfig[serviceName].secret,
      access_token: tokenSource.get('access_token') || tokenSource.get('token'),
      access_secret: tokenSource.get('access_secret') || tokenSource.get('secret')
    }
    return credentials
  }

  middleware(){
    var router = express.Router()

    router.get('/register', this.authenticate)
    router.get('/posts/:p', this.fetchPostsWrapper)
    return router
  }

  authenticate = (req, res) => {
    var credentials = this.makeCredentials(req.query)
    if(req.session.linking){
      var linkId = req.session.linking
      delete req.session.linking

      LinkedAccount.where('id', linkId).fetch().
        then(acct => acct.set({token: credentials.access_token, secret: credentials.access_secret})).
        then(acct => acct.save()).
        then(res.redirect('/'))
    }
    else {
      res.redirect('/')
    }
  }

  fetchPostsWrapper = (req,res) => {
    var acctId = req.params.p

    LinkedAccount.where('id', acctId).fetch().
    then(acct => {
      if(!acct.get('token') || !acct.get('secret'))
        res.status(500).send('Not logged in')
      else{
        this.fetchPosts(acct,res)
      }
    })
  }
}
