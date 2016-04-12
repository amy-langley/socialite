import React from 'react'
import { connect } from 'react-redux'

import Feed from '../components/feed'

@connect(state=>({dashState: state.feedReducer}))
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading',
      feeds: [ ]
    };
  }

  componentDidMount(){
    fetch(`/api/session`, {credentials: 'include'}).
      then(response => { return response.json() }).
      then(response => {
        var feeds = response.linkedAccounts.map(a => { return { id: a.id, adapter: a.service, feed: a.username } })
        this.setState({feeds: feeds})
      })
  }

  render() {
    const { dashState, dispatch } = this.props
    var feeds = this.state.feeds.map(feed => {
      return <Feed
        dispatch={this.props.dispatch}
        posts={dashState}
        key={feed.id}
        id={feed.id}
        username={feed.feed}
        adapter={feed.adapter} />
    })
    return <div className="uk-grid uk-grid-small">
        {feeds}
      </div>
  }
}
