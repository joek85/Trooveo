<template>
  <v-content>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs8>
            <v-card class="elevation-0">
              <!--<v-card-title>-->
                <!--<span class="subheading pa-1" style="color: #35495e">{{getHistorydata.length}} ITEMS</span>-->
                <!--&lt;!&ndash;<v-chip class="text-right" small disabled outline color="secondary">{{getTime(m.date)}}</v-chip>&ndash;&gt;-->
              <!--</v-card-title>-->
              <v-toolbar
                      class="mb-1"
                      color="primary"
                      dark
                      flat>
                <v-toolbar-title>{{getHistorydata.length}} ITEMS</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-chip v-if="editedItem.name" small disabled outline color="white">{{getTime(editedItem.name) }}</v-chip>
              </v-toolbar>
                  <!--<v-layout row wrap>-->
                    <!--<v-flex d-flex xs12 sm4 md4 lg3 xl4-->
                            <!--v-for="n in getHistorydata"-->
                            <!--:key="n.length">-->
                      <!--<historycard-->
                        <!--:url="n.media_id"-->
                        <!--:imgurl="n.thumbnail.split('?')[0]"-->
                        <!--:title="n.title"-->
                        <!--:timeM="getTime(0)"-->
                        <!--:playcounts="getPlayCounts(n.play_counts)"-->
                        <!--:duration="getTimeFormat(n.duration_hms)"-->
                        <!--:subtitle="n.channel_name"-->
                        <!--:urlchannel="n.channel_id"-->
                      <!--&gt;</historycard>-->
                    <!--</v-flex>-->
                  <!--</v-layout>-->
              <v-container fluid grid-list-md>
                <v-data-iterator
                        :items="getHistorydata"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        content-tag="v-layout"
                        row
                        wrap
                >
                  <template v-slot:item="props">
                    <v-flex xs6 >
                      <!--<historycard-->
                      <!--:url="props.item.media_id"-->
                      <!--:imgurl="props.item.thumbnail.split('?')[0]"-->
                      <!--:title="props.item.title"-->
                      <!--:timeM="getTime(0)"-->
                      <!--:playcounts="getPlayCounts(props.item.play_counts)"-->
                      <!--:duration="getTimeFormat(props.item.duration_hms)"-->
                      <!--:subtitle="props.item.channel_name"-->
                      <!--:urlchannel="props.item.channel_id"-->
                      <!--&gt;</historycard>-->
                      <mediacard2
                              :imgurl="props.item.thumbnail.split('?')[0]"
                              :url="props.item.media_id"
                              :title="props.item.title"
                              :subtitle="props.item.channel_name"
                              :dur="getTimeFormat(props.item.duration_hms)"
                              :playCounts="getPlayCounts(props.item.play_counts)"
                      ></mediacard2>
                    </v-flex>
                  </template>
                </v-data-iterator>
              </v-container>
                <!--<template slot="no-data">-->
                  <!--<v-btn color="primary" @click="clearHistory">Reset</v-btn>-->
                <!--</template>-->
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="elevation-0">
              <!--<div class="text-xs-center">-->
                <!--<v-btn outline round color="primary" dark>clear history</v-btn>-->
              <!--</div>-->
              <v-toolbar
                      class="mb-1"
                      color="primary"
                      dark
                      flat>
                <v-toolbar-title>dates</v-toolbar-title>
              </v-toolbar>
              <v-list two-line>
                <template v-for="(item, index) in getHistorydates.data">
                  <v-list-tile
                          :key="item.length"
                          ripple
                          @click="getHistory(item.date)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.date }}</v-list-tile-title>

                      <v-list-tile-sub-title>{{ getTime(item.date)}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider class="my-1"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-content>
</template>

<script>
//import searchcard1 from '@/components/SearchCard-1.vue'
import mediacard2 from '@/components/MediaCard-2.vue'
import historycard from '@/components/HistoryCard.vue'
//import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
import playerservice from '@/services/player'
export default {
  components: {
    historycard,mediacard2},
  mounted () {
    window.document.title = 'History';
    this.$store.dispatch('commitHistoryDates')
  },
  watch: {
    //'$store.getters.getUser': function (user) {
    //      if (user) {
    //        this.$store.dispatch('commitHistoryData')
    //        console.log('watch')
    //      } else {
    //        this.$router.push('/')
    //      }
    //}
  },
  data () {
    return {
      results: [],
      ids: [],
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
        rowsPerPageItems: [4, 8, 12],
        pagination: {
            rowsPerPage: 12
        },
      getTime (t) {
        return playerservice.formatTime(t)
      },
        getPlayCounts (p) {
          return playerservice.formatNumbers(p)
        },
        getTimeFormat (t) {
          return playerservice.convertTime(t)
        }
    }
  },
  computed: {
    getHistorydates: function () {
      return this.$store.getters.getHistoryDates
    },
      getHistorydata: function () {
          return this.$store.getters.getHistoryData
      }
  },
  methods: {
    clearHistory () {},
      getHistory (d) {
        this.editedItem.name = d;
          this.$store.dispatch('commitHistoryData',d)
      }
  }
}
</script>
