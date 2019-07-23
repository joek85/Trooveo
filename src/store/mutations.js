export default {
  setAudioPlayerUrl (state, url) {
    state.audioplayerdata[0].mediaUrl = url
  },
  setAudioPlayerId (state, id) {
    state.audioplayerdata[0].mediaId = id
  },
  setHeaderData (state, data) {
    state.headers = data
  },
  setInfosData (state, data) {
    state.infos = data
  },
  setRelatedData (state, data) {
    state.relatedData = data
  },
  pushRelatedData (state, data) {
    state.relatedData[0].url = state.relatedData[0].url.concat(data[0].url)
    state.relatedData[1] = data[1]
  },
  setMostPopularData (state, data) {
    state.mostpopularData = data
  },
  pushMostPopularData (state, data) {
    state.mostpopularData[0].datas = state.mostpopularData[0].datas.concat(data[0].datas)
    state.mostpopularData[1] = data[1]
  },
  setId (state, id) {
    state.Id = id
  },
  setfootervisibility (state, visibility) {
    state.footerstyle.visibility = visibility
  },
  setUser (state, user) {
    state.user = user
  },
  setHistoryData (state, data) {
    state.historyData = data
  },
  setSetsData (state, data) {
    state.sets = data
  },
  setSetsAdd (state, data) {
    state.setsAdded = data
  },
  setAutoPlay (state, data) {
    state.autoplay = data
  }
}
