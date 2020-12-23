<template>
    <v-card class="elevation-0 pa-1">
        <v-layout row wrap>
          <v-flex xs12 sm3 md4 lg4>
            <!--<v-card class="pizza" width="168px" height="94px" color="accent" :to="{name: 'Player', params: {id: url} }">-->
            <router-link :to="{name: 'Player', params: {id: url} }">
              <v-img @error="Error"
                     class="primary"
                     width="168px" height="94px"
                     :src="imgurl">
              </v-img>
              <v-progress-linear
                      class="my-0"
                      color="info"
                      height="10"
                      v-model="played"
                      v-if="isplayed"
              ></v-progress-linear>
            </router-link>

            <!--</v-card>-->
          </v-flex>
          <v-flex xs12 sm8 md8 lg8>

            <div>
              <router-link tag="a" class="subheading" :to="{name: 'Player', params: {id: url}, meta: {title: title} }"> {{ title }}</router-link>
            </div>

            <div>
              <span class="subheading grey--text">{{ subtitle }}</span>
              <!--<router-link tag="a" class="subheading grey&#45;&#45;text" :to="{name: 'Channel', params: {id: urlchannel } }">{{ subtitle }}</router-link>-->
            </div>

            <v-chip v-if="dur" small disabled outline color="accent">{{dur}}</v-chip>
            <v-chip v-if="playCounts" small disabled outline color="accent">
              <v-icon>play_arrow</v-icon>
              <span>{{playCounts}}</span>
            </v-chip>
            <v-chip v-if="timeM" small disabled outline color="accent">{{timeM}}</v-chip>
            <v-chip v-if="published" small disabled outline color="accent">{{published}}</v-chip>

            </v-flex>
        </v-layout>
        <v-divider class="my-1"></v-divider>
    </v-card>
</template>
<script>
    /* eslint-disable no-console */
//import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
// import playerservice from '@/services/player'
export default {
  components: {
//    VCardTitle
  },
  props: ['url', 'dur', 'playCounts', 'title', 'subtitle', 'imgurl', 'timeM', 'published'],
  data () {
    return {
      played: 0,
      isplayed: false,
      urlchannel: '1',
        failed_image: false,
      menuItems: [
        {title: 'Go to Youtube', click: this.gotoyoutube},
        {title: 'Add to sets', click: this.openDialogs},
        {title: 'Add to favorites', click: this.addtofavorites}
      ]
    }
  },
  watch: {
  //    'url' (to, from) {
  //      // this.fetchplayerdata(this.url)
  //    }
  },
  created () {
    // this.fetchplayerdata(this.url)
  },
  mounted () {
  },
  methods: {
      Error () {
        console.log('error image')
          this.failed_image = true;

      },
  //    async fetchplayerdata (id) {
  //      let t = this
  //      playerservice.fetchPlayerdata(id)
  //        .then(function (response) {
  //          t.dur = 0
  //          t.playCounts = 0
  //          t.title = response.data[0].title
  //          t.subtitle = response.data[0].subtitle
  //          t.imgurl = response.data[0].thumbnail
  //          t.dur = playerservice.convertTime(response.data[0].duration)
  //          t.playCounts = playerservice.formatNumbers(response.data[0].play_counts)
  //          t.timeM = playerservice.formatTime(response.data[0].published_at)
  //          t.urlchannel = response.data[0].channel_id
  //          t.played = response.data[0].played
  //          t.isplayed = (t.played > 0)
  //        })
  //        .catch(function (error) {
  //          console.log(error)
  //        })
  //    },
    gotoyoutube (event) {
      event.preventDefault()
      let win = window.open('https://www.youtube.com/watch?v=' + this.url, '_blank')
      win.focus()
    },
    addtofavorites () {
    },
    openDialogs () {
      this.$bus.$emit('openSetsDialogs')
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
    },
      cPicture: function() {
          return this.failed_image ? this.imgurl : this.imgurl.split('hqdefault')[0] + 'maxresdefault.jpg';
      },
  }
}
</script>
<style scoped>
  .pizza {
    display: flex;
    flex-direction: column;
  }
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
  .rounded-card{
    border-radius:50px;
  }
</style>
