import Express from 'express';
import Twitter from 'twitter';
import schema from '../../shared/models/schema.js'
import GrantConfig from '../../config/grant-config.json';

export default class TwitterAdapter {

  middleware = () => {
    var router = Express.Router()

    router.get('/register', this.authenticate)
    router.get('/posts/:p', this.fetchPosts)
    return router
  }

  makeCredentials(token,secret){
    return{
      consumer_key: GrantConfig.twitter.key,
      consumer_secret: GrantConfig.twitter.secret,
      access_token_key: token,
      access_token_secret: secret
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
        then(res.redirect('/home'))
    }
    else
      res.redirect('/home')
  }

  fetchPosts = (req,res) => {
    var acctId = req.params.p

    schema.linkedAccount.findOne({where: {id: acctId}}).
      then(acct => {
        if(!acct.token || !acct.secret)
          res.status(500).send('Not logged in')
        else {
          var credentials = this.makeCredentials(acct.token, acct.secret)
          console.log(credentials)
      		var twitter = new Twitter(credentials);

      		twitter.get('statuses/user_timeline', (err, tweet, response) => {
            if(err) { console.log(err); }
            else { console.log(tweet); }
            res.send();
          })
      }})
  }
};
