import React from 'react'

export default class FeedPost extends React.Component{
  render() {
    var post = this.props.post
    var markup = {__html: post.markup}
      return <div key={post.id} className="uk-panel uk-panel-box" style={{marginBottom: '1em'}}>
        <h4 className="uk-panel-header uk-panel-title">{post.title}</h4>
        <div style={{overflowX: 'hidden'}} dangerouslySetInnerHTML={markup} />
        <div className="uk-badge uk-float-right">{post.score}</div>
      </div>
  }
}
