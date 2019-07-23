export default {
  getheaderdata (state) {
    return state.headers
  },
  getInfosData (state) {
    return state.infos
  },
  getId (state) {
    return state.Id
  },
  getRelatedData (state) {
    return state.relatedData
  },
  getMostPopularData (state) {
    return state.mostpopularData
  },
  getAudioPlayerUrl (state) {
    return state.audioplayerdata[0].mediaUrl
  },
  getAudioPlayerId (state) {
    return state.audioplayerdata[0].mediaId
  },
  getfootervisibility (state) {
    return state.footerstyle
  },
  getUser (state) {
    return state.user
  },
  getHistoryData (state) {
    return state.historyData
  },
  getSets (state) {
    return state.sets
  },
  getAutoPlay (state) {
  return state.autoplay
  }
}
