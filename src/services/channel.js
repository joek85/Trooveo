import Api from '@/services/Api'

export default {
  fetchChannelData (channelId) {
    return Api.hi().get('/channel?channelId=' + channelId)
  },
  fetchChannelSectionData (channelId) {
    return Api.hi().get('/channel/channelsection?channelId=' + channelId)
  }
}
