import Express from 'express';
import Twitter from 'twitter.js';
import GrantConfig from '../../config/grant-config.json';

export default class TwitterAdapter {

  middleware(){
    var self  = this
    var router = express.Router()

    router.get('/register', function(req,res){
      req.session.credentials = req.session.credentials || {}
      req.session.credentials.twitter = self.handleCredentials(req)
      req.session.save( () => res.redirect('/home') )
    })

    router.get('/posts/:p', self.fetchPosts)

    return router
  }

  handleCredentials(req){
    return {
      consumer_key: grantconfig.twitter.key,
      consumer_secret: grantconfig.twitter.secret,
      token: req.query.access_token,
      token_secret: req.query.access_secret
    }
  }

  fetchPosts(req,res){
    var blog = req.params.p
    var credentials = req.session.credentials ?
      req.session.credentials['twitter'] :
      null

    if(!credentials){
      res.status(500).send('Not logged in')
      return
    }

    var twitter = twitter.createClient(credentials)
    twitter.posts(blog, (err, resp) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else res.send(JSON.stringify(resp.posts))
    })
  }
}