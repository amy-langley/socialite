import express from 'express'
import Tumblr from 'tumblr.js'

import AdapterBase from './adapter-base.js'

export default class TumblrAdapter extends AdapterBase{

  makeCredentials(acct){
    var credentials = super.makeCredentials('tumblr', acct)
    credentials.token = acct.access_token
    credentials.token_secret = acct.access_secret
    return credentials
  }

  makeItem(post){
    return {
      id: post.id,
      title: post.title,
      markup: post.body || post.photos[0].alt_sizes[1].url, //JSON.stringify(post.photos),
      source: 'tumblr',
      score: post.note_count
  } }

  fetchPosts(acct, res){
    var tumblr = Tumblr.createClient(this.makeCredentials(acct))

    tumblr.posts(acct.username, (err, resp) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else{
        var items = resp.posts.map(post => this.makeItem(post))
        res.send(JSON.stringify(items))
      }
    })
  }
}
