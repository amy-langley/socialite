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
    fetch(`/api/${this.props.adapter}/posts/${this.props.id}`, {credentials: 'include'}).
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

  authenticateAdapter = () => {
    fetch(`/api/session`, {
      credentials: 'include',
      method: 'post',
      headers: new Headers({
      'Content-Type': 'application/json'
    }),
      body: JSON.stringify({linking: this.props.id})
    }).then(()=>{
      window.location.href=`/connect/${this.props.adapter}`
    })
  }

  render() {
    return (
      <div>
        <h3>{this.props.adapter}</h3>
        <dl>
        {this.state.posts.map(function(post,i){
          var markup = {__html: post.markup}
          return <div key={i}><dt>{post.title}</dt><dd><div dangerouslySetInnerHTML={markup} /></dd></div>
        })}
        </dl>
        {this.state.message}
        <button onClick={this.fetchPosts}>retry</button>
        <button onClick={this.authenticateAdapter}>connect</button>
        <a href="/api/logout">log out</a>
      </div>)
  }
}
Feed.propTypes = {
  adapter: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
};
