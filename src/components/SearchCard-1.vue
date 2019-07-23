<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="elevation-0" :to="{name: 'Player', params: {id: url }}">
        <!--<v-card-media-->
          <!--:src="imgurl"-->
          <!--height="200px"-->
        <!--&gt;-->
        <!--</v-card-media>-->
        <v-img
          :src="imgurl"
          aspect-ratio="1"
          height="200px"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="subheading">{{ title }}</h3>
            <span class="grey--text">{{ subtitle }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-chip small disabled outline color="accent">{{dur}}</v-chip>
          <v-chip small disabled outline color="accent">
            <v-icon>play_arrow</v-icon>
            <span>{{playCounts}}</span>
          </v-chip>
          <v-chip small disabled outline color="accent">{{timeM}}</v-chip>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
// import playerservice from '@/services/player'
export default {
  components: {VCardTitle},
  props: ['url', 'imgurl', 'dur', 'title', 'subtitle', 'playCounts', 'timeM'],
  data () {
    return {
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
  methods: {
    async fetchplayerdata (id) {
    //      let t = this
    //      playerservice.fetchPlayerdata(id)
    //        .then(function (response) {
    //        //          t.dur = 0
    //        //          t.playCounts = 0
    //        //          t.playCounts = 0
    //        //          t.title = response.data[0].title
    //        //          t.subtitle = response.data[0].subtitle
    //        //          t.imgurl = response.data[0].thumbnail
    //        //          t.dur = playerservice.convertTime(response.data[0].duration)
    //        //          t.playCounts = playerservice.formatNumbers(response.data[0].play_counts)
    //        //          t.timeM = playerservice.formatTime(response.data[0].published_at)
    //        })
    //        .catch(function (error) {
    //          console.log(error)
    //        })
    }
  }
}
</script>
<style scoped>
  #v-card-media{
    opacity: 0;
  }
  #v-card-media{
    opacity: 1;
    transition: opacity 2s;
  }
</style>
