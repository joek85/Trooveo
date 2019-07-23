import Api from '@/services/Api'

export default {
  getMostPopular (nextToken) {
    if (nextToken !== undefined) {
      return Api.hi().get('/player/mostpopular?nexttoken=' + nextToken)
    } else {
      return Api.hi().get('/player/mostpopular')
    }
  }
}
