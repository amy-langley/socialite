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
    var iconClass = ['fa', `fa-${this.props.adapter}`].join(' ')
    return (
      <div className="uk-width-1-3 uk-height-viewport">
      <div className="uk-panel" style={{padding: '1em'}}>
        <div className="uk-float-right">
          <button className="uk-button uk-button-small uk-button-primary uk-margin-right" onClick={this.fetchPosts}>retry</button>
          <button className="uk-button uk-button-small uk-button-success uk-margin-right" onClick={this.authenticateAdapter}>connect</button>
          <a className="uk-button uk-button-small uk-button-danger" href="/api/logout">log out</a>
        </div>
        <h3 className="uk-panel-title"><i className={iconClass}></i> {this.props.username}</h3>
        {this.state.posts.map(function(post,i){
          var markup = {__html: post.markup}
          return <div key={i} className="uk-panel uk-panel-box" style={{marginBottom: '1em'}}>
            <h4 className="uk-panel-header uk-panel-title">{post.title}</h4>
            <div style={{overflowX: 'hidden'}} dangerouslySetInnerHTML={markup} />
            <div className="uk-badge uk-float-right">{post.score}</div>
          </div>
        })}
        {this.state.message}
      </div>
      </div>)
  }
}
Feed.propTypes = {
  adapter: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
};
