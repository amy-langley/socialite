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

  makeCredentials(token,secret){
    return{
      consumer_key: grantconfig.tumblr.key,
      consumer_secret: grantconfig.tumblr.secret,
      token: token,
      token_secret: secret
    }
  }

  authenticate = (req, res) => {
    var credentials = this.makeCredentials(req.query.access_token, req.query.access_secret)

    if(req.session.linking){
      var linkId = req.session.linking
      delete req.session.linking
      schema.linkedAccount.findOne({where: {id: linkId}}).
        then(acct => Object.assign(acct, {token: credentials.token, secret: credentials.token_secret})).
        then(acct => acct.save()).
        then(res.redirect('/'))
    }
    else
      res.redirect('/')
  }

  makeItem = (post) => { return {
    id: post.id,
    title: post.title,
    markup: post.body || post.photos[0].alt_sizes[1].url, //JSON.stringify(post.photos),
    source: 'tumblr',
    score: post.note_count
  } }

  fetchPosts = (req,res) => {
    var acctId = req.params.p

    schema.linkedAccount.findOne({where: {id: acctId}}).
      then(acct => {
        if(!acct.token || !acct.secret)
          res.status(500).send('Not logged in')
        else {
          var tumblr = Tumblr.createClient(this.makeCredentials(acct.token, acct.secret))
          tumblr.posts(acct.username, (err, resp) => {
            if(err) res.status(500).send(JSON.stringify(err))
            else{
              var items = resp.posts.map(post => this.makeItem(post))
              res.send(JSON.stringify(items))
            }
          })
        }
      })
  }
}
