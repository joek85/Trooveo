<template>
  <v-content>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs8>
            <v-card class="elevation-0" v-for="m in getHistorydatas"
            :key="m.length">
              <v-card-title>
                <span class="subheading" style="color: #35495e">{{m.medias.length}} ITEMS</span>
                <v-chip class="text-xs-end" small disabled outline color="secondary">{{getTime(m.date)}}</v-chip>
              </v-card-title>
                  <v-layout row wrap>
                    <v-flex d-flex xs12 sm4 md4 lg3 xl4
                            v-for="n in m.medias"
                            :key="n.length">
                      <historycard
                        :url="n.id"
                      ></historycard>
                    </v-flex>
                  </v-layout>
                  <!--<td class="layout px-0">-->
                    <!--<v-btn icon class="mx-0" @click="editItem(props.item)">-->
                      <!--<v-icon color="teal">edit</v-icon>-->
                    <!--</v-btn>-->
                    <!--<v-btn icon class="mx-0" @click="deleteItem(props.item)">-->
                      <!--<v-icon color="pink">delete</v-icon>-->
                    <!--</v-btn>-->
                  <!--</td>-->
                <!--</template>-->
                <template slot="no-data">
                  <v-btn color="primary" @click="clearHistory">Reset</v-btn>
                </template>
              <!--</v-data-table>-->
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="elevation-0">
              <div class="text-xs-center">
                <v-btn outline round color="primary" dark>clear history</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-content>
</template>

<script>
import searchcard1 from '@/components/SearchCard-1.vue'
import historycard from '@/components/HistoryCard.vue'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
import playerservice from '@/services/player'
export default {
  components: {
    VCardTitle,
    searchcard1,
    historycard},
  mounted () {
    window.document.title = 'History'
    // if (this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined) {
    this.$store.dispatch('commitHistoryData')
    // console.log('his')
    // } else {
    // this.$router.push('/')
    // }
  },
  watch: {
    '$store.getters.getUser': function (user) {
    //      if (user) {
    //        this.$store.dispatch('commitHistoryData')
    //        console.log('watch')
    //      } else {
    //        this.$router.push('/')
    //      }
    }
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
      getTime: function (t) {
        return playerservice.formatTime(t)
      }
    }
  },
  computed: {
    getHistorydatas: function () {
      return this.$store.getters.getHistoryData
    }
  },
  methods: {
    clearHistory () {}
  }
}
</script>
