import express from 'express'
import Tumblr from 'tumblr.js'

import grantconfig from '../../config/grant-config.json'
import AdapterBase from './adapter-base.js'

export default class TumblrAdapter extends AdapterBase{

  makeCredentials(grant,query){
    return{
      consumer_key: grant.tumblr.key,
      consumer_secret: grant.tumblr.secret,
      token: query.access_token,
      token_secret: query.access_secret
    }
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
    var tumblr = Tumblr.createClient(
      this.makeCredentials(grantconfig, {
        access_token: acct.token,
        access_secret: acct.secret
      }))

    tumblr.posts(acct.username, (err, resp) => {
      if(err) res.status(500).send(JSON.stringify(err))
      else{
        var items = resp.posts.map(post => this.makeItem(post))
        res.send(JSON.stringify(items))
      }
    })
  }
}
