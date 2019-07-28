<template>
    <v-card class="elevation-0" height="auto">
        <v-layout row wrap>
          <v-flex xs12>
            <!--<v-card color="accent" :to="{name: 'Playlist', params: {id: url } }">-->
                  <!--<v-card-media id="v-card-media"-->
                                <!--class="white&#45;&#45;text"-->
                                <!--height="180px"-->
                                <!--:src="imgurl"-->
                  <!--&gt;-->
                  <!--</v-card-media>-->
            <!--</v-card>-->
            <router-link  :to="{name: 'Playlist', params: {id: url} }">
              <!--<v-card-media class="v-card-media"-->
              <!--height="180px"-->
              <!--:src="imgurl">-->
              <!--</v-card-media>-->
              <v-img
                      :src="imgurl"
                      class="primary"
                      height="180px"
              ></v-img>
              <v-progress-linear
                      class="my-0"
                      color="info"
                      height="10"
                      v-model="played"
                      v-if="isplayed"
              ></v-progress-linear>
            </router-link>
          </v-flex>
          <v-flex xs12>
            <div>
              <router-link tag="a" class="subheading" :to="{name: 'Playlist', params: {id: url } }"> {{ title }}</router-link>
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
          <!--<v-menu bottom left>-->
            <!--<v-btn icon slot="activator">-->
              <!--<v-icon>more_vert</v-icon>-->
            <!--</v-btn>-->
            <!--<v-list>-->
              <!--<v-list-tile color="primary" v-for="item in items" :key="item.length" @click="item.click">-->
                <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
              <!--</v-list-tile>-->
            <!--</v-list>-->
          <!--</v-menu>-->
        </v-layout>
        <v-divider class="my-1"></v-divider>
    </v-card>
</template>
<script>
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
import playerservice from '@/services/player'
export default {
  components: {
    VCardTitle
  },
  props: ['url', 'dur', 'playCounts', 'title', 'subtitle', 'imgurl', 'timeM'],
  data () {
    return {
      urlchannel: '1',
        isplayed: false,
      items: [
        {title: 'Go to Youtube', click: this.gotoyoutube},
        {title: 'Add to sets', click: this.addtosets},
        {title: 'Add to favorites', click: this.addtofavorites}
      ]
    }
  },
  watch: {
    'url' (to, from) {

    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    gotoyoutube () {
      let win = window.open('https://www.youtube.com/watch?v=' + this.url, '_blank');
      win.focus()
    },
    addtosets () {
    },
    addtofavorites () {
    }
  },
  computed: {
    getDuration () {
      return this.dur
    },
    getPlayCounts () {
      return this.playCounts
    },
    getTimeM () {
      return this.timeM
    }
  }
}
</script>
