<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-jumbotron color="primary" dark height="auto">
          <v-container grid-list-md>
            <v-layout row wrap align-center class="justify-center">
              <v-flex xs12 sm6 md4 lg4 xl2>
                <v-container fluid grid-list-sm>
                  <!--<v-card-media color="secondary" src="https://yt3.ggpht.com/-bp-G-1ubrMA/AAAAAAAAAAI/AAAAAAAAAAA/lysFIFc6AaQ/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" height="280px" avatar>-->
                  <!--</v-card-media>-->
                  <v-avatar
                    :size="256"
                    class="accent"
                  >
                    <img :src='channelImgUrl' alt="avatar">
                  </v-avatar>
                </v-container>
              </v-flex>
              <v-flex xs12 sm7 md8 lg8 xl10>
                <h6 class="display-1">{{channelTitle}}</h6>
                <span class="subheading">{{channelDesc}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-jumbotron>
        <v-container>
          <v-card-title class="justify-center subheading elevation-0">No data yet</v-card-title>
         <playlistcarousel
            :playlist="playlists[0]">
         </playlistcarousel>
        </v-container>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import channelservice from '@/services/channel'
import playlistcarousel from '@/components/PlaylistCarousel.vue'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
export default {
  components: {
    VCardTitle,
    playlistcarousel
  },
  data () {
    return {
      channelImgUrl: '',
      channelTitle: '',
      channelDesc: '',
      PlaylistsTitle: '',
      playlistDesc: '',
      playlistImgUrl: '',
      playlistitemscount: '',
      playlists: []
    }
  },
  mounted () {
    this.getChannelDatas(this.$route.params.id)
    // this.getChannelsectionDatas(this.$route.params.id)
  },
  watch: {
    '$route': function (pizza) {
      this.getChannelDatas(pizza.params.id)
      this.getChannelsectionDatas(pizza.params.id)
    }
  },
  methods: {
    getChannelDatas (channel) {
      let t = this
      channelservice.fetchChannelData(channel)
        .then(function (response) {
          console.log(response)
          t.channelImgUrl = response.data.items[0].snippet.thumbnails.high.url
          t.channelTitle = response.data.items[0].snippet.title
          t.channelDesc = response.data.items[0].snippet.description
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getChannelsectionDatas (channel) {
      let t = this
      channelservice.fetchChannelSectionData(channel)
        .then(function (response) {
          // console.log(response.data.items[3].contentDetails.playlists[0])
          // console.log(response)
          t.playlists.push(response.data.items[3].contentDetails.playlists[0])
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
