<template>
  <v-content>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-0">
            <v-card-title primary-title>
              <div>
                <span class="subheading">Searching for: {{sQuery}}</span><br>
                <!--<span class="subheading">About {{totalResults}} results</span><br>-->
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4 md4 lg3 xl2
                v-for="card in results"
                :key="card.length">
          <searchcard1
            :imgurl="card.imgurl"
            :title="card.title"
            :subtitle="card.subtitle"
            :url="card.url"
            :dur="card.dur"
            :playCounts="card.playCounts"
            :timeM="card.timeM"
            :channel_id="card.channel_id"
          ></searchcard1>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <v-btn v-if="results.length != '0'" @click="loadmore" round flat color="primary" dark>{{loadtext}}</v-btn>
        <v-progress-circular v-if="results.length == '0'" indeterminate :size="50" color="primary"></v-progress-circular>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import searchcard1 from '@/components/SearchCard-1.vue'
import search from '@/services/search'
import playerservice from '@/services/player'
export default {
    /* eslint-disable */
    components: {searchcard1},
  data () {
    return {
      cards: [],
      results: [],
      loadtext: 'load more',
      nextToken: '',
      sQuery: '',
      totalResults: '0'
    }
  },
  metaInfo () {
      return {
          title: this.sQuery,
          meta: [
              { vmid: 'description', name: 'description', content: this.sQuery },
              {name: 'keywords', content: this.sQuery},
              {name: 'robots', content: 'index, follow'}
          ]
      }
  },
  mounted () {
    //window.document.title = 'Search'
    this.sQuery = this.$route.query.q
    this.dosearch(this.sQuery)
//    this.track()
  },
  watch: {
    '$route.query.q': function (searchquery) {
      this.sQuery = searchquery
      this.nextToken = ''
        this.results = []
      this.dosearch(this.sQuery)
//      this.track()
    }
  },
  methods: {
    track () {
      this.$ga.page('search')
    },
    async dosearch (str) {
      //window.document.title = 'Search ' + str
      if (str) {
        let t = this
        search.search(str)
          .then(function (response) {
             console.log(response)
            let posts = []
            for (let i = 0; i < response.data[0].data.length; i++) {
               console.log(response.data[i])
              posts.push({
                url: response.data[0].data[i].id.videoId,
                title: response.data[0].data[i].title,
                subtitle: response.data[0].data[i].subtitle,
                dur: response.data[0].data[i].duration,
                playCounts: playerservice.formatNumbers(response.data[0].data[i].play_counts),
                timeM: response.data[0].data[i].published_at,
                imgurl: response.data[0].data[i].thumbnail[0].url.split('?')[0],
                  channel_id:response.data[0].data[i].channel_id
//                channel_id:response.data[1].data[i].channel_id.split('channel/')[1] !== undefined ? response.data[1].data[i].channel_id.split('channel/')[1] : response.data[1].data[i].channel_id.split('user/')[1]
              })
            }
            t.results = posts;
            t.nextToken = response.data[0].nextpageRef
          //            t.results = posts
          //            t.totalResults = response.data.pageInfo.totalResults
          //            t.loadtext = 'load more'
//              console.log(t.nextToken);
          })
          .catch(function (error) {
            console.log(error)
            // t.loadtext = 'load more'
          })
      }
    },
    loadmore () {
      this.loadtext = 'loading...'
      let t = this
        console.log(t.nextToken)
      search.search(this.sQuery, t.nextToken)
        .then(function (response) {
          for (let i = 0; i < response.data[1].data.length; i++) {
            t.results.push({
                url: response.data[1].data[i].id.videoId,
                title: response.data[1].data[i].title,
                subtitle: response.data[1].data[i].subtitle,
                dur: response.data[1].data[i].duration,
                playCounts: playerservice.formatNumbers(response.data[1].data[i].play_counts),
                timeM: response.data[1].data[i].published_at,
                imgurl: response.data[1].data[i].thumbnail,
                channel_id:response.data[1].data[i].channel_id})
          }
          t.nextToken = response.data[0].nextpageRef;
          t.loadtext = 'load more'
//            console.log(t.nextToken);
        })
        .catch(function (error) {
          console.log(error);
          t.loadtext = 'load more'
        })
    }
  }
}
</script>
