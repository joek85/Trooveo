<template>
  <v-content>
    <v-progress-linear v-if="!getdataReady" :indeterminate="true"></v-progress-linear>
    <v-container v-if="getdataReady">
      <v-flex xs12>
        <v-card flat>
          <v-img
                  :src="authorBanners"
                  max-height="256"
                  class="grey darken-4"
          ></v-img>
        </v-card>
      </v-flex>
        <v-card flat color="white" light height="auto">
            <v-layout row wrap align-center class="justify-center align-content-xl-center"> <!--align-center class="justify-center"-->
              <v-avatar
                      :size="96"
                      class="pr-4">
                <v-img :src="channelImgUrl"></v-img>
              </v-avatar>
              <v-flex xs12 sm9 md10 lg10 xl11>
                <h3 class="display-1">{{channelTitle}}</h3>
                <h6 class="subheading">{{subscriberText}}</h6>
                <v-divider class="my-1"></v-divider>

                <h6 class="subheading">{{channelDesc}}</h6>
              </v-flex>
            </v-layout>
        </v-card>
      <v-tabs fixed-tabs v-model="model" slider-color="primary" class="pt-2">
        <v-tab :key="1"
                :href="`#tab-${1}`">
          {{ tabText[0] + ' (' + videos.length + ')'}}
        </v-tab>
        <v-tab :key="2"
               :href="`#tab-${2}`">
          {{ tabText[1] + ' (' + playlists.length + ')'}}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item :key="1" :value="`tab-${1}`">
          <v-card flat>
            <v-container fluid grid-list-md>
              <v-data-iterator
                      :search="search"
                      :items="videos"
                      :rows-per-page-items="rowsPerPageItems"
                      :pagination.sync="pagination"
                      content-tag="v-layout"
                      row
                      wrap>
                <template v-slot:item="props">
                  <v-flex xs12 sm6 md4 lg3 xl2>
                    <mediacard1
                            :imgurl="props.item.thumbnail"
                            :url="props.item.id"
                            :title="props.item.title"
                            :timeM="props.item.dateCreated"
                            :playCounts="props.item.viewCount"
                            :dur="props.item.duration"
                    ></mediacard1>
                  </v-flex>
                </template>
              </v-data-iterator>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2" :value="`tab-${2}`">
          <v-card flat>
            <v-container fluid grid-list-md>
              <v-data-iterator
                      :search="search"
                      :items="playlists"
                      :rows-per-page-items="rowsPerPageItems"
                      :pagination.sync="pagination"
                      content-tag="v-layout"
                      row
                      wrap>
                <template v-slot:item="props">
                  <v-flex xs12 sm6 md4 lg3 xl2>
                    <playlistcard
                            :imgurl="props.item.thumbnail"
                            :url="props.item.id"
                            :title="props.item.title"
                            :dur="props.item.videosCount + ' Tracks'"
                    ></playlistcard>
                  </v-flex>
                </template>
              </v-data-iterator>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-content>
</template>
<script>
import mediacard1 from '@/components/MediaCard-1.vue'
import channelservice from '@/services/channel'
import playlistcard from '@/components/PlaylistCard.vue'
import VCardTitle from 'vuetify/lib/components/VCard/VCardTitle'
import playerservice from '@/services/player'
export default {
  components: {
    VCardTitle,mediacard1,
      playlistcard
  },
  data () {
    return {
        search: '',
        tabText: ['Videos', 'Playlists'],
        model: 'tab-1',
        rowsPerPageItems: [4, 8, 12, 24],
        pagination: {
            rowsPerPage: 24
        },
        dataready:false,
      channelImgUrl: '',
      channelTitle: '',
      channelDesc: '',
        subscriberText: '',
      PlaylistsTitle: '',
      playlistDesc: '',
      playlistImgUrl: '',
      playlistitemscount: '',
        authorBanners:'',
      playlists: [],
        videos: []
    }
  },
  mounted () {
    this.getChannelInfo(this.$route.params.id);
    this.getChannelVideos(this.$route.params.id);
      this.getChannelPlaylists(this.$route.params.id)
  },
  watch: {
    '$route': function (pizza) {
      this.getChannelInfo(pizza.params.id);
      this.getChannelVideos(pizza.params.id);
        this.getChannelPlaylists(this.$route.params.id)
    }
  },
  methods: {
      getChannelInfo (channel) {
      let t = this;
      channelservice.fetchChannelInfo(channel)
        .then(function (response) {
          console.log(response);
          t.dataready = true;
          t.channelImgUrl = response.data.authorThumbnails[2].url;
          t.channelTitle = response.data.author;
          t.channelDesc = response.data.description;
          t.subscriberText = response.data.subscriberText;
          t.authorBanners = response.data.authorBanners[5].url;
          t.setWindowTitle(t.channelTitle)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getChannelVideos (channel) {
      let t = this;
      channelservice.fetchChannelVideos(channel, 'newest')
        .then(function (response) {
//          console.log(response);
            for (let x = 0; x < response.data.items.length; x++) {
                t.videos.push({
                    id: response.data.items[x].videoId,
                    title: response.data.items[x].title,
                    thumbnail: response.data.items[x].videoThumbnails[3].url,
                    dateCreated: response.data.items[x].publishedText,
                    viewCount: response.data.items[x].viewCount,
                    duration: response.data.items[x].durationText
                })
            }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
      getChannelPlaylists (channel) {
          let t = this;
          channelservice.fetchChannelPlaylists(channel, 'newest')
              .then(function (response) {
                  console.log(response);
                  for (let x = 0; x < response.data.items.length; x++) {
                      t.playlists.push({
                          id: response.data.items[x].playlistId,
                          title: response.data.items[x].title,
                          thumbnail: response.data.items[x].playlistThumbnail,
                          videosCount: response.data.items[x].videoCount,
                      })
                  }
              })
              .catch(function (error) {
                  console.log(error)
              })
      },
      getTime (t) {
          return playerservice.formatTime(t)
      },
      setWindowTitle (title) {
          window.document.title = title;
      }
  },
    computed: {
      getdataReady () {
          return this.dataready;
      }
    }
}
</script>
