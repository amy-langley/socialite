import React from 'react'
import Feed from './components/feed.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading',
      posts: [ ],
      feeds: [
        { adapter: 'tumblr', feed: 'aetherstragic' },
        { adapter: 'tumblr', feed: 'just-discourse-things' }
      ]
    };
  }

  render() {
    var feeds = this.state.feeds.map((feed,idx) => {
      return <Feed key={feed.feed+idx} adapter={feed.adapter} username={feed.feed} />
    })
    return (
      <div>
        {feeds}
      </div>
    )
  }
}
