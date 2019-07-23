<template>
  <v-container grid-list-xs>
    <v-card class="elevation-0">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card class="cardpizza" color="accent" :to="{name: 'Player', params: {id: url } }">
                  <!--<v-card-media class="v-card-media"-->
                                <!--height="180px"-->
                                <!--:src="imgurl">-->
                  <!--</v-card-media>-->
              <v-img
                :src="imgurl"
                aspect-ratio="1"
                height="180px"
              ></v-img>
              <v-progress-linear
                class="my-0"
                color="info"
                height="10"
                v-model="played"
                v-if="isplayed"
              ></v-progress-linear>
              <!--<v-container fill-height class="cont">-->
                <!--<v-layout fill-height row wrap align-center class="lay">-->
                  <!--<v-flex xs12 class="text-xs-center">-->
                    <!--&lt;!&ndash;<v-btn @click="play()" small fab color="primary" dark>&ndash;&gt;-->
                      <!--&lt;!&ndash;<v-icon>play_arrow</v-icon>&ndash;&gt;-->
                    <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
                    <!--<v-btn @click="gotoyoutube" round small color="primary">-->
                      <!--go to youtube-->
                    <!--</v-btn>-->
                    <!--&lt;!&ndash;<v-btn round small fab color="primary">&ndash;&gt;-->
                    <!--&lt;!&ndash;<v-icon>playlist_add</v-icon>&ndash;&gt;-->
                    <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
                  <!--</v-flex>-->
                <!--</v-layout>-->
              <!--</v-container>-->
            </v-card>
            <v-card-title class="primary-title">
              <div>
                <router-link tag="a" class="subheading" :to="{name: 'Player', params: {id: url } }"> {{ title }}</router-link>
              </div>
              <div>
                <router-link tag="a" class="subheading grey--text" :to="{name: 'Channel', params: {id: urlchannel } }">{{ subtitle }}</router-link>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-chip v-if="getDuration" small disabled outline color="accent">{{duration}}</v-chip>
              <v-chip v-if="getPlayCounts" small disabled outline color="accent">
                <v-icon>play_arrow</v-icon>
                <span>{{playcounts}}</span>
              </v-chip>
              <v-chip v-if="getTimeM" small disabled outline color="accent">{{timeM}}</v-chip>
            </v-card-actions>
          </v-flex>
          <!--<v-menu bottom left>-->
            <!--<v-btn icon slot="activator">-->
              <!--<v-icon>more_vert</v-icon>-->
            <!--</v-btn>-->
            <!--<v-list>-->
              <!--<v-list-tile color="primary" v-for="item in menuItems" :key="item.length" @click="item.click">-->
                <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
          <!--</v-menu>-->
        </v-layout>
        <v-divider class="my-1"></v-divider>
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
      duration: '00:00',
      playcounts: '0',
      title: '',
      subtitle: '',
      imgurl: '',
      timeM: '0',
      played: 0,
      urlchannel: '0',
      isplayed: (this.played > 0),
      menuItems: [
        {title: 'Go to Youtube', click: this.gotoyoutube},
        {title: 'Add to sets', click: this.openDialogs},
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
    gotoyoutube (event) {
      event.preventDefault()
      let win = window.open('https://www.youtube.com/watch?v=' + this.url, '_blank')
      win.focus()
    },
    addtofavorites () {
    },
    openDialogs () {
      this.$bus.$emit('openSetsDialogs')
    },
    async fetchplayerdata (id) {
      // console.log(id)
      let t = this
      playerservice.fetchPlayerdata(id)
        .then(function (response) {
          t.duration = 0
          t.playcounts = 0
          t.title = response.data[0].title
          t.subtitle = response.data[0].subtitle
          t.imgurl = response.data[0].thumbnail
          t.duration = playerservice.convertTime(response.data[0].duration)
          t.playcounts = playerservice.formatNumbers(response.data[0].play_counts)
          t.timeM = playerservice.formatTime(response.data[0].published_at)
          t.urlchannel = response.data[0].channel_id
          t.played = response.data[0].played
          t.isplayed = (t.played > 0)
        })
        .catch(function (error) {
          console.log(error)
        })
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
<style scoped>
  .v-card-media{
    opacity: 1;
    transition: .5s ease;
  }
  .cardpizza:hover .cont{
    opacity: 1;
  }
  .cardpizza:hover .v-card-media{
    opacity: 1;
  }
  .cont{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: .5s ease;
    background-color: transparent;
    opacity: 0;
  }
</style>
