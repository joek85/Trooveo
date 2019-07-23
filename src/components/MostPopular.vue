<template>
  <v-content>
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-0">
            <v-card-title primary-title>
              <div>
                <span class="subheading">About {{getPopularData[1].totalResults}} results</span><br>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm4 md4 lg3 xl2
                v-for="card in getPopularData[0].datas"
                :key="card.length"
        >
          <popularcard
            v-bind="card"
          ></popularcard>
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
        <!--<v-btn @click="loadmore" round flat color="primary" dark>{{getPopularData[1].loadText}}</v-btn>-->
        <v-progress-circular v-if="getPopularData[0].datas.length == '0'" indeterminate :size="50" color="primary"></v-progress-circular>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import popularcard from '@/components/PopularCard.vue'
export default {
    /* eslint-disable */
  components: {popularcard},
  data () {
    return {
    }
  },
  computed: {
    getPopularData: function () {
      return this.$store.getters.getMostPopularData
    }
  },
  mounted () {
    //window.document.title = 'MostPopular'
    this.$store.dispatch('commitPopularData', false)
  },
  methods: {
    loadmore () {
      this.$store.dispatch('commitPopularData', true)
    }
  }
}
</script>
