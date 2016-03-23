import express from 'express'
import Tumblr from 'tumblr.js'
import grantconfig from '../../config/grant-config.json'
import schema from '../../shared/models/schema.js'

export default class TumblrAdapter {

  middleware = () => {
    var router = express.Router()

    router.get('/register', this.authenticate)
    router.get('/posts/:p', this.fetchPosts)
    return router
  }

  authenticate(req, res){
    req.session.credentials = req.session.credentials || {}

    var credentials = {
      consumer_key: grantconfig.tumblr.key,
      consumer_secret: grantconfig.tumblr.secret,
      token: req.query.access_token,
      token_secret: req.query.access_secret
    }
    
    req.session.credentials.tumblr = credentials

    if(req.session.linking){
      var linkId = req.session.linking
      delete req.session.linking
      schema.linkedAccount.findOne({where: {id: linkId}}).
        then(acct => Object.assign(acct, {token: credentials.token, secret: credentials.token_secret})).
        then(acct => acct.save()).
        then(res.redirect('/home'))
    }
    else
      res.redirect('/home')
  }

  fetchPosts(req,res){
    var blog = req.params.p
    var credentials = req.session.credentials ?
      req.session.credentials['tumblr'] :
      null

    if(!credentials){
      res.status(500).send('Not logged in')
      return
    }

    var tumblr = Tumblr.createClient(credentials)
    tumblr.posts(blog, (err, resp) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else res.send(JSON.stringify(resp.posts))
    })
  }
}
