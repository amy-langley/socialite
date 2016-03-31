import Express from 'express';
import Twitter from 'twitter';

import GrantConfig from '../../config/grant-config.json';
import AdapterBase from './adapter-base.js'

export default class TwitterAdapter extends AdapterBase{

  makeCredentials(grant,query){
    return{
      consumer_key: grant.twitter.key,
      consumer_secret: grant.twitter.secret,
      access_token_key: query.access_token,
      access_token_secret: query.access_secret
    }
  }

  makeItem(tweet){
    return {
      title: '',
      markup: tweet.text,
      source: 'twitter',
      score: tweet.retweet_count + tweet.favorite_count
  } }

  fetchPosts = (acct, res) => {
    var twitter = new Twitter(this.makeCredentials(GrantConfig, {
      access_token: acct.token,
      access_secret: acct.secret
    }));

    twitter.get('statuses/user_timeline', (err, tweets, response) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else {
        var items = tweets.map(tweet => this.makeItem(tweet))
        res.send(JSON.stringify(items))
      }
    })
  }
}
