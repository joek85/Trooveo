import Api from '@/services/Api'

export default {
  fetchPlaylistData (playlistId) {
    return Api.hi().get('/playlist?playlistId=' + playlistId)
  },
  fetchPlaylistItemsData (playlistId) {
    return Api.hi().get('/playlist/playlistitems?playlistId=' + playlistId)
  }
}
