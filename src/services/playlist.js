import Api from '@/services/Api'

export default {
  fetchPlaylistData (playlistId) {
    return Api().get('/playlist?playlistId=' + playlistId)
  },
  fetchPlaylistItemsData (playlistId) {
    return Api().get('/playlist/playlistitems?playlistId=' + playlistId)
  }
}
