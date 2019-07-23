<template>
  <v-container grid-list-sm>
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
          <v-flex xs12>
              <!--<v-list subheader>-->
                <!--<v-list-tile>-->
                  <!--<v-list-tile-action>-->
                    <!--<v-checkbox v-model="check"></v-checkbox>-->
                  <!--</v-list-tile-action>-->
                  <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>Add to queue</v-list-tile-title>-->
                  <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
              <!--</v-list>-->
              <!--<v-spacer></v-spacer>-->
              <!--<v-flex class="text-xs-right" shrink>-->
                <!--<v-switch class="text-xs-right" :label="`Switch 1: ${switch1.toString()}`" v-model="switch1"></v-switch>-->
              <!--</v-flex>-->

            <!--<v-divider class="my-1"></v-divider>-->
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 xl2
                  v-for="related in getRelatedDatas"
                  :key="related.length"
          >
            <mediacard1
              :imgurl="related.imgurl"
              :url="related.id"
              :title="related.title"
              :subtitle="related.subtitle"
              :dur="related.duration"
              :playCounts="related.playcounts"
            ></mediacard1>
          </v-flex>
        </v-layout>
        <div class="text-xs-center">
          <v-progress-circular v-if="getRelatedDatas.length == '0'" indeterminate :size="50" color="primary"></v-progress-circular>
          <!--<v-btn v-if="getRelatedDatas.length != '0'" @click="loadmore" round flat color="primary" dark>{{loadtext}}</v-btn>-->
        </div>
    </v-card>
  </v-container>
</template>

<script>
import mediacard1 from '@/components/MediaCard-1.vue'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
export default {
    /* eslint-disable */
  components: {
    VCardTitle,
    mediacard1
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
