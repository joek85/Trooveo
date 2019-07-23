<template>
  <v-card light class="elevation-1">
    <v-container>
      <v-layout row wrap align-center class="ml-2">
        <v-avatar
          :size="64"
          class="grey lighten-4"
        >
          <img :src='playlistImgUrl' alt="avatar">
        </v-avatar>
        <v-card-title>
          <div>
            <h6 class="subheading">{{PlaylistsTitle}}</h6>
            <span class="subheading">{{playlistDesc}}</span>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-chip small disabled outline color="secondary">
          {{playlistitemscount}} items
        </v-chip>
      </v-layout>
      <v-container>
        <v-layout row wrap>
          <v-flex xs2 v-for="item in playlistItems"
                  :key="item.length">
            <playlistcard
              :url="item.url"
            ></playlistcard>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import playlistservice from '@/services/playlist'
import playlistcard from '@/components/PlaylistCard.vue'
import VCardMedia from 'vuetify/src/components/VCard/VCardMedia'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
export default {
  props: ['playlist'],
  components: {
    playlistcard,
    VCardMedia,
    VCardTitle
  },
  data () {
    return {
      PlaylistsTitle: '',
      playlistDesc: '',
      playlistImgUrl: '',
      playlistitemscount: '0',
      playlistItems: []
    }
  },
  watch: {
    'playlist': function () {
      this.fetchPlaylist(this.playlist)
      this.fetchPlaylistItems(this.playlist)
    }
  },
  methods: {
    fetchPlaylist (playlistId) {
      console.log(playlistId)
      let t = this
      playlistservice.fetchPlaylistData(playlistId)
        .then(function (response) {
          console.log(response)
          t.PlaylistsTitle = response.data.items[0].snippet.title
          t.playlistDesc = response.data.items[0].snippet.description
          t.playlistImgUrl = response.data.items[0].snippet.thumbnails.default.url
          t.playlistitemscount = response.data.items[0].contentDetails.itemCount
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    fetchPlaylistItems (playlistId) {
      let t = this
      playlistservice.fetchPlaylistItemsData(playlistId)
        .then(function (response) {
          let zabre = []
          console.log(response)
          for (let i = 0; i < 5; i++) {
            zabre.push({url: response.data.items[i].contentDetails.videoId})
          }
          t.playlistItems = zabre
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
