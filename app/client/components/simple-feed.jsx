import React from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import * as creators from '../redux/action-creators/feed-actions.js'

import SimplePost from './simple-post.jsx'

@connect(state=>({feedState: state.feedReducer}))
export default class Feed extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      message: ''
    }
  }

  fetchPosts = () => {
    this.setState({message: 'Loading...', loading: true})
    fetch(`/api/${this.props.adapter}/posts/${this.props.id}`, {credentials: 'include'}).
      then(response => {
        if(!response.ok)
          throw response

        return response.json()
    }).
    then(responseObj  => {
      this.setState({message: '', loading: false})
      this.props.dispatch(creators.insertPosts(responseObj))
    }).
    catch(err => err.text ? err.text() : err).
    then(errMesg => { this.setState({message: errMesg, loading: false})})
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

  handlePosts = (posts) => posts.
    toList().
    filter(this.isMine).
    sortBy(post=>-post.id).
    map(function(post,i){
      return <SimplePost key={i} post={post} />
    })

  isMine = (post) => post.source == this.props.adapter && post.username == this.props.username

  render() {
    var iconClass = ['fa', `fa-${this.props.adapter}`].join(' ')
    var refreshClass = classnames({
      'fa': true,
      'fa-refresh': true,
      'fa-spin': this.state.loading
    })
    return (
      <div className="uk-width-1-3">
      <div className="uk-panel" style={{padding: '1em'}}>
        <div className="uk-float-right">
          <button
            className="uk-button uk-button-small uk-button-primary"
            disabled={this.state.loading}
            onClick={this.fetchPosts}>
            <i className={refreshClass}></i> update
          </button>
          <button className="uk-button uk-button-small uk-button-success uk-margin-left" onClick={this.authenticateAdapter}>
            <i className="fa fa-exchange"></i> connect
          </button>
        </div>
        <h3 className="uk-panel-title"><i className={iconClass}></i> {this.props.username}</h3>
        {this.handlePosts(this.props.posts)}
        {this.state.message}
      </div>
      </div>)
  }
}
Feed.propTypes = {
  adapter: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired
};
