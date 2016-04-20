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

  makeItem(post, username){
    return {
      id: post.id,
      title: post.title,
      markup: post.body || (post.photos ? post.photos[0].alt_sizes[1].url : ''), //JSON.stringify(post.photos),
      source: 'tumblr',
      username: username,
      score: post.note_count
  } }

  fetchPosts(acct, res){
    var tumblr = Tumblr.createClient(this.makeCredentials(acct))

    tumblr.posts(acct.get('username'), (err, resp) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else{
        var items = resp.posts.map(post => this.makeItem(post,acct.get('username')))
        res.send(JSON.stringify(items))
      }
    })
  }
}
