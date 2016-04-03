import Immutable from 'immutable'
import * as types from '../constants/action-types.js'

const postList = new Immutable.Map()

export default function feedReducer(state = postList, action){
  switch(action.type){
    case types.UPDATE_POSTS:
      break
    case types.INSERT_POSTS:
      return insertPosts(state, action.posts)
      break
    default:
      return state
  }
}

function insertPosts(state, posts){
  return state.merge(new Immutable.Map(posts.map(post => [post.id, post])))
}
