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

  /*
  doFetch = () => {
    this.setState({message: 'Loading...'})
    fetch('/api/tumblr/posts/aetherstragic', {credentials: 'include'}).
      then(response => {
        if(!response.ok)
          throw response
        return response.json()
    }).
    then(responseObj  => {
      this.setState({posts: responseObj, message: ''})
    }).
    catch(err => err.text()).
    then(errMesg => this.setState({message: errMesg}))
  }
  */

  componentDidMount(){
    // this.doFetch()
  }

  render() { return (
    <Feed adapter="tumblr" username="aetherstragic" />)
  }
  /*
  render() {
    return (
      <div>
        app here
        <dl>
        {this.state.posts.map(function(post,i){
          return <div key={i}><dt>{post.title}</dt><dd>{post.summary}</dd></div>
        })}
        </dl>
        {this.state.message}
        <button onClick={this.doFetch}>retry</button><br/>
        <a href="/connect/tumblr">log in</a> <a href="/api/logout">log out</a>
      </div>)
  }*/
}
