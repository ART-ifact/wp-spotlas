import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  recent: [],
  loaded: false
}

// getters
const getters = {
  recentPosts: state => {
    return state.recent;
  },

  recentPostsLoaded: state => state.loaded,

  recentPost: state => id => {
   /* if (!id || !_.isNumber(id) || _.isNull(id) || typeof id == 'undefined') {
      return state.recent
    }
    let recent = state.recent*/
    return ;
  },

  recentPostLoaded: state => (id) => state.loaded
}

// actions
const actions = {
  getPosts ({ commit }) {
    api.getPosts(posts => {
      commit(types.STORE_FETCHED_POSTS, { posts })
      commit(types.POSTS_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  },
  getPost({ commit }) {
    console.log(id);
    api.getPost(41, post => {
      commit(types.STORE_FETCHED_POST, { post })
      commit(types.POST_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_POSTS] (state, { posts }) {
    state.recent = posts
  },

  [types.POSTS_LOADED] (state, val) {
    state.loaded = val
  },

  [types.STORE_FETCHED_POST](state, { post }) {
    state.recent = post
  },

  [types.POST_LOADED](state, val) {
    state.loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
