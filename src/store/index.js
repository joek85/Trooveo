import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: '',
    audioplayerdata: [
      {mediaUrl: 'mediaurl', mediaId: ''}
    ],
    headers: [
      {title: '', duration: '', subtitle: '', imgurl: '', Id: '', playcounts: '', timeM: ''},
      {chips: []}
    ],
    infos: [{
      title: '', descriptions: ''}
    ],
    relatedData: [],
    footerstyle: {
      visibility: 'hidden'
    },
    user: null,
    historyData: [],
    mostpopularData: [
      {datas: []}, {nextToken: '', totalResults: '', loadText: ''}
    ],
    sets: [],
    setsAdded: false,
    autoplay:false
  },
  getters,
  mutations,
  actions
})
