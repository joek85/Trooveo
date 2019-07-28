<template>
  <v-content>
    <v-progress-linear v-if="!getdataReady" :indeterminate="true"></v-progress-linear>
    <v-container v-if="getdataReady">
        <v-card flat color="white" light height="auto">
            <v-layout row wrap align-center class=""> <!--align-center class="justify-center"-->
              <v-flex xs1 sm3 md2 lg2 xl1 class="pa-2">
                  <v-avatar
                    :size="128"
                    class="accent">
                    <v-img :src="channelImgUrl"></v-img>
                  </v-avatar>
                <!--</v-container>-->
              </v-flex>
              <v-flex xs12 sm9 md10 lg10 xl11>
                <h6 class="display-1">{{channelTitle}}</h6>
                <span class="subheading">{{channelDesc}}</span>
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
                            :timeM="getTime(props.item.dateCreated)"
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
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
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
            rowsPerPage: 12
        },
        dataready:false,
      channelImgUrl: '',
      channelTitle: '',
      channelDesc: '',
      PlaylistsTitle: '',
      playlistDesc: '',
      playlistImgUrl: '',
      playlistitemscount: '',
      playlists: [],
        videos: []
    }
  },
  mounted () {
    this.getChannelDatas(this.$route.params.id)
    // this.getChannelsectionDatas(this.$route.params.id)
  },
  watch: {
    '$route': function (pizza) {
      this.getChannelDatas(pizza.params.id)
      //this.getChannelsectionDatas(pizza.params.id)
    }
  },
  methods: {
    getChannelDatas (channel) {
      let t = this
      channelservice.fetchChannelData(channel)
        .then(function (response) {
          console.log(response);
          t.dataready = true;
          t.channelImgUrl = response.data.info.avatarURL;
          t.channelTitle = response.data.info.title;
          t.channelDesc = response.data.info.description;
          t.videos = response.data.info.videos;
          t.playlists = response.data.info.playlists;
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
    },
      getTime (t) {
          return playerservice.formatTime(t)
      }
  },
    computed: {
      getdataReady () {
          return this.dataready;
      }
    }
}
</script>
