import Api from '@/services/Api'

export default {
  fetchChannelInfo (channelId) {
    return Api.hi().get('/channel?channelId=' + channelId)
  },
    fetchChannelVideos (channelId, sortBY) {
    return Api.hi().get('/channel/channelvideos?channelId=' + channelId + "&sortby=" + sortBY)
  },
    fetchChannelPlaylists (channelId, sortBY) {
        return Api.hi().get('/channel/channelplaylists?channelId=' + channelId + "&sortby=" + sortBY)
    }
}
