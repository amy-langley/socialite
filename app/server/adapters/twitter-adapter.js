import Express from 'express';
import Twitter from 'twitter';
import AdapterBase from './adapter-base.js'

export default class TwitterAdapter extends AdapterBase{

  makeCredentials(acct){
    var credentials = super.makeCredentials('twitter', acct)
    credentials.access_token_key = credentials.access_token
    credentials.access_token_secret = credentials.access_secret
    return credentials
  }

  makeItem(tweet, username){
    return {
      id: tweet.id,
      title: '',
      markup: tweet.text,
      source: 'twitter',
      username:username,
      score: tweet.retweet_count + tweet.favorite_count
  } }

  fetchPosts = (acct, res) => {
    var twitter = new Twitter(this.makeCredentials(acct));

    twitter.get('statuses/user_timeline', (err, tweets, response) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else {
        var items = tweets.map(tweet => this.makeItem(tweet, acct.get('username')))
        res.send(JSON.stringify(items))
      }
    })
  }
}
