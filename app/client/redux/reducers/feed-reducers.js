import Immutable from 'immutable'
import * as types from '../constants/action-types.js'

const samplePosts = [{
  id: 9,
  title: 'sample redux post',
  markup: 'hello from redux',
  source: 'tumblr',
  score: 5
}]

const postList = new Immutable.List(samplePosts)

export default function feedReducer(state = postList, action){
  switch(action.type){
    case types.INITIALIZE_STORE:
      return state
    case types.UPDATE_POSTS:
      break
    case types.INSERT_POSTS:
      return insertPosts(state, action.contents)
      break
    default:
      return state
  }
}

function insertPosts(state, posts){
  return state
}
