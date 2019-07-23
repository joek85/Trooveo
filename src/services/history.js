import Api from '@/services/Api'

export default {
  fetchHistory (user) {
    return Api.hi().get('/history?userid=' + user)
  }
}
