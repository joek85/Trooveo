<template>
  <v-container fluid grid-list-xs>
    <v-card class="elevation-10" color="primary">
      <v-container fluid grid-list-xs>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="accent" :to="{name: 'Player', params: {id: url } }">
                  <v-card-media id="v-card-media"
                                class="white--text"
                                height="180px"
                                :src="imgurl"
                  >
                  </v-card-media>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <div>
              <router-link tag="a" class="subheading" :to="{name: 'Player', params: {id: url } }"> {{ title }}</router-link>
            </div>
            <div>
              <router-link tag="a" class="subheading grey--text" :to="{name: 'Channel', params: {id: urlchannel } }">{{ subtitle }}</router-link>
            </div>
            <v-chip v-if="getDuration" small disabled outline color="secondary">{{dur}}</v-chip>
            <v-chip v-if="getPlayCounts" small disabled outline color="secondary">
              <v-icon>play_arrow</v-icon>
              <span>{{playCounts}}</span>
            </v-chip>
            <v-chip v-if="getTimeM" small disabled outline color="secondary">{{timeM}}</v-chip>
          </v-flex>
          <v-menu bottom left>
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile color="primary" v-for="item in items" :key="item.length" @click="item.click">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
        <v-divider class="my-1"></v-divider>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
import playerservice from '@/services/player'
export default {
  components: {
    VCardTitle
  },
  props: ['url'],
  data () {
    return {
      dur: '00:00',
      playCounts: '0',
      title: '',
      subtitle: '',
      imgurl: '',
      timeM: '0',
      urlchannel: '1',
      items: [
        {title: 'Go to Youtube', click: this.gotoyoutube},
        {title: 'Add to sets', click: this.addtosets},
        {title: 'Add to favorites', click: this.addtofavorites}
      ]
    }
  },
  watch: {
    'url' (to, from) {
      this.fetchplayerdata(this.url)
    }
  },
  created () {
    this.fetchplayerdata(this.url)
  },
  mounted () {
  },
  methods: {
    async fetchplayerdata (id) {
      let t = this
      playerservice.fetchPlayerdata(id)
        .then(function (response) {
          t.dur = 0
          t.playCounts = 0
          t.title = response.data.items[0].snippet.title
          t.subtitle = response.data.items[0].snippet.channelTitle
          t.imgurl = response.data.items[0].snippet.thumbnails.high.url
          t.dur = playerservice.convertTime(response.data.items[0].contentDetails.duration)
          t.playCounts = playerservice.formatNumbers(response.data.items[0].statistics.viewCount)
          t.timeM = playerservice.formatTime(response.data.items[0].snippet.publishedAt)
          t.urlchannel = response.data.items[0].snippet.channelId
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    gotoyoutube () {
      let win = window.open('https://www.youtube.com/watch?v=' + this.url, '_blank')
      win.focus()
    },
    addtosets () {
    },
    addtofavorites () {
    }
  },
  computed: {
    getDuration () {
      return this.dur !== '00:00'
    },
    getPlayCounts () {
      return this.playCounts !== '0'
    },
    getTimeM () {
      return this.timeM !== '0'
    }
  }
}
</script>
