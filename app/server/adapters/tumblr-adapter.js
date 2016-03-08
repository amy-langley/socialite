import express from 'express'
import Tumblr from 'tumblr.js'
import grantconfig from '../../config/grant-config.json'

export default class TumblrAdapter {

  middleware(){
    var self  = this
    var router = express.Router()

    router.get('/register', function(req,res){
      req.session.credentials = req.session.credentials || {}
      req.session.credentials.tumblr = self.handleCredentials(req)
      req.session.save( () => res.redirect('/home') )
    })

    router.get('/posts/:p', self.fetchPosts)

    return router
  }

  handleCredentials(req){
    return {
      consumer_key: grantconfig.tumblr.key,
      consumer_secret: grantconfig.tumblr.secret,
      token: req.query.access_token,
      token_secret: req.query.access_secret
    }
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
