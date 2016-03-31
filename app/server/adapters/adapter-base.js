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

  middleware(){
    var router = express.Router()

    router.get('/register', this.authenticate)
    router.get('/posts/:p', this.fetchPostsWrapper)
    return router
  }

  authenticate = (req, res) => {
    var credentials = this.makeCredentials(grant, req.query)
    if(req.session.linking){
      var linkId = req.session.linking
      delete req.session.linking

      schema.linkedAccount.findOne({where: {id: linkId}}).
        then(acct => Object.assign(acct, {token: credentials.token, secret: credentials.token_secret})).
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
      else
        this.fetchPosts(acct,res)
    })
  }
}
