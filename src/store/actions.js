import historyservice from '@/services/history'
import playerservice from '@/services/player'
import getPopulars from '@/services/mostpopular'
import setservice from '@/services/sets'
/* eslint-disable */
export default {
  commitAudioPlayerUrl ({commit}, url) {
    commit('setAudioPlayerUrl', url)
  },
  commitFooterVisibility ({commit}, visibility) {
    commit('setfootervisibility', visibility)
  },
  commitAudioPlayerId ({commit}, id) {
    commit('setAudioPlayerId', id)
  },
  commitUser ({commit}, user) {
    commit('setUser', user)
  },
  commitLogout ({commit}) {
    firebase.auth().signOut().then(() => {
      commit('setUser', null)
      console.log('logout')
    }).catch(err => console.log(err))
  },
    commitHistoryDates ({commit, getters}) {
        historyservice.fetchHistorydates(getters.getUser).then(function (responsedata) {
            commit('setHistoryDates', responsedata)
        })
    },
  commitHistoryData ({commit, getters},d) {
    // console.log(getters.getUser)
    historyservice.fetchHistorydata(getters.getUser,d).then(function (responsedata) {
       // console.log(responsedata)
      // console.log(responsedata.data.length)
      //let arr = []
      //for (let i = 0; i < responsedata.data.length; i++) {
        // arr.push({date: responsedata.data[i].date,
        //     medias:{ids:responsedata.data[i].ids.split('\n').map(function (n) { return {id: n} }),
        //         titles: responsedata.data[i].title.split('\n').map(function (n) { return {title: n} })}
        //
        // }
        // )
        // playerservice.fetchPlayerdata(responsedata.data[i])
        //   .then(function (response) {
        //     arr.push({
        //       title: response.data[0].title,
        //       subtitle: response.data[0].subtitle,
        //       imgurl: response.data[0].thumbnail,
        //       duration: playerservice.convertTime(response.data[0].duration),
        //       playcounts: playerservice.formatNumbers(response.data[0].play_counts),
        //       timeM: playerservice.formatTime(response.data[0].published_at),
        //       Id: response.data[0].id,
        //       channelid: response.data[0].channel_id,
        //       played: response.data[0].played})
        //   })
        //   .catch(function (error) {
        //     console.log(error)
        //   })
        //   console.log(arr)
      //}

      commit('setHistoryData', responsedata.data)
    })
  },
  commitPlayerData ({commit, getters}, id) {
    commit('setId', id)
    playerservice.fetchPlayerdata(id,getters.getUser,playerservice.formatTime2())
      .then(function (response) {
        // console.log(response)
        let playerarray = []
        let chipsArray = []
        let infosArray = []
        let relatedArray = []
        for (let i = 0; i < response.data.length; i++) {
          playerarray.push({
            title: response.data[i].title,
            subtitle: response.data[i].subtitle,
            imgurl: response.data[i].thumbnail.url.split('?')[0],
            duration: playerservice.convertTime(response.data[i].duration),
            playcounts: playerservice.formatNumbers(response.data[i].play_counts),
            timeM: playerservice.formatTime(response.data[i].published_at),
            Id: id,
              channel_id:response.data[i].channel_id});
          infosArray.push({
            title: response.data[i].subtitle, descriptions: response.data[i].description
          })
          if (response.data[i].tags) {
            for (let j = 0; j < response.data[i].tags.length; j++) {
              chipsArray.push({
                title: response.data[i].tags[j]
              })
            }
          }
          playerarray.push({chips: chipsArray})
          let relates = response.data[i].related
          for (let x = 0; x < relates.length; x++) {
            relatedArray.push({
              id: relates[x].id !== undefined ? relates[x].id : relates[x].video_id,
              title: relates[x].title !== undefined ? relates[x].title : relates[x].playlist_title,
              subtitle: relates[x].author,
              imgurl: relates[x].iurlhq !== undefined ? relates[x].iurlhq.split('?')[0] : relates[x].playlist_iurlhq.split('?')[0],
              duration: playerservice.convertTime(relates[x].length_seconds),
              playcounts: relates[x].short_view_count_text})
          }
        }
        commit('setHeaderData', playerarray)
        commit('setInfosData', infosArray)
        commit('setRelatedData', relatedArray)
        commit('setAudioPlayerUrl', response.data[0].formats.url)
        commit('setfootervisibility', 'visible')
        commit('setAudioPlayerId', id)
      })
      .catch(function (error) {
        console.log(error)
      })
    // playerservice.fetchRelateddata(id)
    //   .then(function (response) {
    //     // console.log(response)
    //     let relatedarray = []
    //     let urls = []
    //     for (let i = 0; i < response.data.items.length; i++) {
    //       urls.push({
    //         url: response.data.items[i].id.videoId !== undefined ? response.data.items[i].id.videoId : ''})
    //     }
    //     relatedarray.push({url: urls})
    //     relatedarray.push({nextToken: response.data.nextPageToken})
    //     commit('setRelatedData', relatedarray)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
  },
  commitRelatedData ({commit, getters}) {
    playerservice.fetchRelateddata(getters.getId, getters.getRelatedData[1].nextToken)
      .then(function (response) {
        // console.log(response)
        let relatedarray = []
        let urls = []
        for (let i = 0; i < response.data.items.length; i++) {
          urls.push({
            url: response.data.items[i].id.videoId !== undefined ? response.data.items[i].id.videoId : ''})
        }
        relatedarray.push({url: urls})
        relatedarray.push({nextToken: response.data.nextPageToken})
        commit('pushRelatedData', relatedarray)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  commitPopularData ({commit, getters}, payload) {
    if (!payload) {
      getPopulars.getMostPopular()
        .then(function (response) {
          let datas = []
          let arr = []
          // console.log(response)
          for (let i = 0; i < response.data.items.length; i++) {
            datas.push({
              title: response.data.items[i].snippet.title,
              subtitle: response.data.items[i].snippet.channelTitle,
              imgUrl: response.data.items[i].snippet.thumbnails.high.url,
              url: response.data.items[i].id,
              dur: playerservice.convertTime(response.data.items[i].contentDetails.duration),
              playCounts: playerservice.formatNumbers(response.data.items[i].statistics.viewCount),
              timeM: playerservice.formatTime(response.data.items[i].snippet.publishedAt)})
          }
          arr.push({datas: datas})
          arr.push({nextToken: response.data.nextPageToken, totalResults: response.data.pageInfo.totalResults, loadText: 'load more'})
          commit('setMostPopularData', arr)
        })
        .catch(function (error) {
          console.log(error)
          let datas = []
          let arr = []
          arr.push({datas: datas})
          arr.push({nextToken: '', totalResults: '0', loadText: 'load more'})
          commit('setMostPopularData', arr)
        })
    } else {
      getPopulars.getMostPopular(getters.getMostPopularData[1].nextToken)
        .then(function (response) {
          let datas = []
          let arr = []
          // console.log(response)
          for (let i = 0; i < response.data.items.length; i++) {
            datas.push({
              title: response.data.items[i].snippet.title,
              subtitle: response.data.items[i].snippet.channelTitle,
              imgUrl: response.data.items[i].snippet.thumbnails.high.url,
              url: response.data.items[i].id,
              dur: playerservice.convertTime(response.data.items[i].contentDetails.duration),
              playCounts: playerservice.formatNumbers(response.data.items[i].statistics.viewCount),
              timeM: playerservice.formatTime(response.data.items[i].snippet.publishedAt)})
          }
          arr.push({datas: datas})
          arr.push({nextToken: response.data.nextPageToken, totalResults: response.data.pageInfo.totalResults, loadText: 'load more'})
          commit('pushMostPopularData', arr)
        })
        .catch(function (error) {
          console.log(error)
          let arr = []
          arr.push({loadText: 'load more'})
          commit('pushMostPopularData', arr)
        })
    }
  },
  commitSetsData ({commit, getters}) {
    setservice.fetchSetsData(getters.getUser)
      .then(function (response) {
        const arr = []
        for (let i = 0; i < response.data.length; i++) {
          arr.push({check: false, title: response.data[i].name, subtitle: response.data[i].time})
        }
        commit('setSetsData', arr)
      })
  },
  commitAddSet ({commit, getters}, name, t) {
    setservice.addSet(getters.getUser, name, t)
      .then(function (response) {
        // console.log(response)
        commit('setSetsAdd', true)
        setservice.fetchSetsData(getters.getUser)
          .then(function (response) {
            const arr = []
            for (let i = 0; i < response.data.length; i++) {
              arr.push({check: false, title: response.data[i].name, subtitle: response.data[i].time})
            }
            commit('setSetsData', arr)
          })
      })
      .catch(function (err) {
        console.log(err)
        commit('setSetsAdd', false)
      })
  },
    commitAutoPlay ({commit}, autoplay) {
        commit('setAutoPlay', autoplay)
    }
}
