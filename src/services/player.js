/* eslint-disable */
import Api from '@/services/Api'
import moment from 'moment'

let videourl = 'https://www.youtube.com/watch?v=';
export default {
  fetchPlayerdata (id, user, d) {
      if (user !== null && user !== undefined) {
          return Api.hi().get('/player?id=' + id + '&user=' + user + '&d=' + d)
      } else {
          return Api.hi().get('/player?id=' + id + '&d=' + d)
      }
    // return Api.hi().get('/player?id=' + id)
  },
  fetchRelateddata (id, nexttoken) {
    if (nexttoken !== undefined) {
      return Api.hi().get('/player/related?id=' + id + '&nexttoken=' + nexttoken)
    } else {
      return Api.hi().get('/player/related?id=' + id)
    }
  },
  fetchMediadata (id, user, d) {
    if (user !== null && user !== undefined) {
      return Api.hi().get('/player/media?id=' + id + '&user=' + user + '&d=' + d)
    } else {
      return Api.hi().get('/player/media?id=' + id + '&d=' + d)
    }
  },
  updateplayed (id, played) {
    return Api.hi().get('/player/updateplayed?id=' + id + '&played=' + played)
  },
  fetchMediadata2 (id) {
    return Api.hi().get('/medias/audio/' + id)
  },
  downloadfile (id) {
    return Api.hi().get('/download?id=' + id)
  },
  parse_str (str) {
    return str.split('&').reduce(function (params, param) {
      let paramSplit = param.split('=').map(function (value) {
        return decodeURIComponent(value.replace('+', ' '))
      })
      params[paramSplit[0]] = paramSplit[1]
      return params
    }, {})
  },
  replaceat (index, str) {
    return replaceAt(index, str)
  },
  convertTime (time) {
    return converttime(time)
  },
  formatNumbers (number) {
    return format(number)
  },
  formatTime (time) {
    return timemoment(time)
  },
  formatTime2 () {
    return timemoment2()
  },
  getc (url, fn) {
    return getCORS(url, fn)
  },
  getTimeNow () {
    return timenow()
  },
    getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
function getCORS (url, success) {
  let xhr = new XMLHttpRequest()
  if (!('withCredentials' in xhr)) xhr = new XDomainRequest() // fix IE8/9
  xhr.open('POST', url)
  xhr.onload = success
  xhr.send()
  return xhr
}
function converttime (duration) {
  // let matches = duration.match(/[0-9]+[HMS]/g)
  //
  // let seconds = 0
  // matches.forEach(function (part) {
  //   let unit = part.charAt(part.length - 1)
  //   let amount = parseInt(part.slice(0, -1))
  //
  //   switch (unit) {
  //     case 'H':
  //       seconds += amount * 60 * 60
  //       break
  //     case 'M':
  //       seconds += amount * 60
  //       break
  //     case 'S':
  //       seconds += amount
  //       break
  //     default:
  //   }
  // })
  // return moment.duration(duration, 'minutes').format('h:mm')

  // Hours, minutes and seconds
  let hrs = ~~(duration / 3600)
  let mins = ~~((duration % 3600) / 60)
  let secs = ~~duration % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = ''

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}
function replaceAt (index, char) {
  let a = char.split('')
  a[index] = char
  return a.join('')
}
// function toHHMMSS (secs) {
//   let secnum = parseInt(secs, 10)
//   let hours = Math.floor(secnum / 3600) % 24
//   let minutes = Math.floor(secnum / 60) % 60
//   let seconds = secnum % 60
//   return [hours, minutes, seconds]
//     .map(v => v < 10 ? '0' + v : v)
//     .filter((v, i) => v !== '00' || i > 0)
//     .join(':')
// }
let pow = Math.pow
let floor = Math.floor
let abs = Math.abs
let log = Math.log

function round (n, precision) {
  let prec = Math.pow(10, precision)
  return Math.round(n * prec) / prec
}

function format (n) {
  let base = floor(log(abs(n)) / log(1000))
  let suffix = 'kmb'[base - 1]
  return suffix ? round(n / pow(1000, base), 0) + suffix : '' + n
}
function timemoment (t) {
  // console.log(t)
  return moment((moment(t).format('YYYYMMDD'))).fromNow()
}
function timemoment2 () {
  // return '12/11/15'
  return moment().format('YYYY-MM-DD')
}
function timenow () {
  return moment()
}
