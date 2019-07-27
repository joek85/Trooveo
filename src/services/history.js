import Api from '@/services/Api'

export default {
  fetchHistorydata (user, d) {
    return Api.hi().get('/history?userid=' + user + "&d=" + d)
  },
    fetchHistorydates (user) {
        return Api.hi().get('/history/dates?userid=' + user)
    }
}
