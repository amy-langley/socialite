import React from 'react'

export default class Feed extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      message: '',
      posts: []
    }
  }

  fetchPosts = () => {
    this.setState({message: 'Loading...'})
    fetch(`/api/${this.props.adapter}/posts/${this.props.username}`, {credentials: 'include'}).
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

  componentDidMount(){
    this.fetchPosts()
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
        <button onClick={this.fetchPosts}>retry</button><br/>
        <a href="/connect/tumblr">log in</a> <a href="/api/logout">log out</a>
      </div>)
  }
}
Feed.propTypes = {
  adapter: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired
};
