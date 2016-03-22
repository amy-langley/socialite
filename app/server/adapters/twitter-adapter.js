import Express from 'express';
import Twitter from 'twitter';
import GrantConfig from '../../config/grant-config.json';

export default class TwitterAdapter {

  middleware(){
    var self  = this;
    var router = Express.Router();

    router.get('/register', (req, res) => {
      req.session.credentials = req.session.credentials || {};
      req.session.credentials.twitter = self.handleCredentials(req);
      req.session.save( () => res.redirect('/home') );
    });

    router.get('/posts/', self.fetchPosts);

    return router;
  }

  handleCredentials(req) {
    return {
      consumer_key: GrantConfig.twitter.key
		  , consumer_secret: GrantConfig.twitter.secret
		  , access_token_key: req.query.access_token
	    , access_token_secret: req.query.access_secret
    };
  }

  fetchPosts(req, res) {
    var credentials = req.session.credentials.twitter;

    if(!credentials) {
      res.status(500).send('Not logged in');
      return;
    }
    console.log(credentials)
		var twitter = new Twitter(credentials);

		twitter.get('statuses/user_timeline', (err, tweet, response) => {
      if(err) { console.log(err); }
      else { console.log(tweet); }
      res.send();
    });

    // var blog = req.params.p;
    // var credentials = req.session.credentials ?
    //   req.session.credentials['twitter'] :
    //   null;


    // var twitter = twitter.createClient(credentials);
    // twitter.posts(blog, (err, resp) => {
    //   if(err) res.status(500).send(JSON.stringify(err))
    //   else res.send(JSON.stringify(resp.posts))
    // });
  };
};
