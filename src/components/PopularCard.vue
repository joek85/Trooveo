<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="elevation-0" :to="{name: 'Player', params: {id: url }}">
        <!--<v-card-media-->
          <!--:src="imgUrl"-->
          <!--height="200px"-->
        <!--&gt;-->
        <!--</v-card-media>-->
        <v-img
          :src="imgUrl"
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
          <v-chip small disabled outline color="secondary">{{dur}}</v-chip>
          <v-chip small disabled outline color="secondary">
            <v-icon>play_arrow</v-icon>
            <span>{{playCounts}}</span>
          </v-chip>
          <v-chip small disabled outline color="secondary">{{timeM}}</v-chip>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
export default {
  components: {VCardTitle},
  //  props: ['imgUrl', 'title', 'subtitle', 'url', 'dur', 'playCounts', 'timeM'],
  props: {
    imgUrl: '',
    title: '',
    subtitle: '',
    url: '',
    dur: {
      type: String,
      default: '00:00'
    },
    playCounts: {
      type: String,
      default: '0'
    },
    timeM: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
    }
  },
  watch: {
    'url' (to, from) {
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
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
