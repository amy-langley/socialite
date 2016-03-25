import React from 'react'
import Feed from './components/feed.js'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading',
      posts: [ ],
      feeds: [ ]
    };
  }

  componentDidMount(){
    fetch(`/api/session`, {credentials: 'include'}).
      then(response => { return response.json() }).
      then(response => {
        var feeds = response[0].linked_accounts.map(a => { return { id: a.id, adapter: a.service, feed: a.username } })
        this.setState({feeds: feeds})
      })
  }

  render() {
    var feeds = this.state.feeds.map(feed => {
      return <Feed
        key={feed.id}
        id={feed.id}
        adapter={feed.adapter} />
    })
    return <div>{feeds}</div>
  }

}
