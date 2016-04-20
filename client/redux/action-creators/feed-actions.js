import * as types from '../constants/action-types'

export function insertPosts(posts){
  return { type: types.INSERT_POSTS, posts: posts }
}
