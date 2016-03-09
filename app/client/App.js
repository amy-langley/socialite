import React from 'react'
import Feed from './components/feed.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading',
      posts: [ ]
    };
  }

  render() { return (
    <Feed adapter="tumblr" username="aetherstragic" />)
  }
}
