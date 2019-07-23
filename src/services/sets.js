import Api from '@/services/Api'

export default {
  fetchSetsData (userid) {
    return Api.hi().get('/sets?user_id=' + userid)
  },
  addSet (userid, name, t) {
    return Api.hi().post('/sets/add', {
      user_id: userid,
      name: name,
      timestr: t
    })
  }
}
