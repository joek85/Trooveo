<template>
    <v-card class="elevation-0">
            <div class="text-xs-right">
                <!--<v-flex xs12 >-->
                <!--<v-layout row wrap>-->
                <v-switch :input-value="getswitchvalue" :label="'AutoPlay'" @change="switchvalue"></v-switch>
                <!--</v-layout>-->
                <!--</v-flex>-->
                <!--<v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>-->
            </div>

        <v-layout row wrap>
          <v-flex xs12
                  v-for="related in getRelatedDatas"
                  :key="related.length">
            <mediacard2
              :imgurl="related.imgurl"
              :url="related.id"
              :title="related.title"
              :subtitle="related.subtitle"
              :dur="related.duration"
              :playCounts="related.playcounts"
            ></mediacard2>
          </v-flex>
        </v-layout>
        <v-flex class="text-xs-center" xs12>
          <v-progress-circular v-if="getRelatedDatas.length == '0'" indeterminate :size="50" color="primary"></v-progress-circular>
          <!--<v-btn v-if="getRelatedDatas.length != '0'" @click="loadmore" round flat color="primary" dark>{{loadtext}}</v-btn>-->
        </v-flex>
    </v-card>
</template>

<script>
import mediacard2 from '@/components/MediaCard-2.vue'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
export default {
    /* eslint-disable */
  components: {
    VCardTitle,
    mediacard2
  },
  data () {
    return {
      autoplay: false,
      loadtext: 'load more',
      check: false
    }
  },
    mounted () {
        this.$root.$on('autoplay', (param) => {
            //console.log(this.getRelatedDatas[0].id),
            this.$router.push({name: 'Player', params: { id: this.getRelatedDatas[0].id }})
        })
    },
  computed: {
    getRelatedDatas: function () {
      return this.$store.getters.getRelatedData
    },
      getswitchvalue :function () {
          return this.$store.getters.getAutoPlay
      }
  },
  methods: {
    loadmore () {
      this.loadtext = 'loading...';
      this.$store.dispatch('commitRelatedData')
    },
      switchvalue: function (val) {
          //console.log(val);
          this.$store.dispatch('commitAutoPlay',val)
      }
  }
}
</script>
