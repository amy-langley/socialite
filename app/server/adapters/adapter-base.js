import express from 'express'
import grantConfig from '../../config/grant-config.json'
import schema from '../../shared/models/schema.js'

export default class AdapterBase{
  constructor(){
    // if (this.makeCredentials=== undefined) {
      // or maybe test typeof this.method === "function"
      // throw new TypeError("Must override method");
    // }
  }

  makeCredentials(serviceName, tokenSource){
    return {
      consumer_key: grantConfig[serviceName].key,
      consumer_secret: grantConfig[serviceName].secret,
      access_token: tokenSource.access_token || tokenSource.token,
      access_secret: tokenSource.access_secret || tokenSource.secret
    }
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

      schema.linkedAccount.findOne({where: {id: linkId}}).
        then(acct => Object.assign(acct, {token: credentials.access_token, secret: credentials.access_secret})).
        then(acct => acct.save()).
        then(res.redirect('/'))
    }
    else {
      res.redirect('/')
    }
  }

  fetchPostsWrapper = (req,res) => {
    var acctId = req.params.p

    schema.linkedAccount.findOne({where: {id: acctId}}).
    then(acct => {
      if(!acct.token || !acct.secret)
        res.status(500).send('Not logged in')
      else{
        this.fetchPosts(acct,res)
      }
    })
  }
}
