import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'foo',
      message: 'Loading',
      posts: [ ]
    };
  }

  doFetch = () => {
    this.setState({message: ''})
    fetch('/api/posts', {credentials: 'include'}).
      then(response => {
        if(!response.ok)
          throw response
        return response.json()
    }).
    then(responseObj  => {
      this.setState({posts: responseObj})
    }).
    catch(err => err.text()).
    then(errMesg => this.setState({message: errMesg}))
  }

  componentDidMount(){
    this.doFetch()
  }

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
  }
}
