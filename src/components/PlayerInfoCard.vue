<template>
    <v-card class="elevation-0">
      <v-card-title >
        <v-flex xs12>
            <h2 class="card-header font-weight-regular">{{ getInfos[0].title }}</h2>
            <h4 class=" font-weight-regular"> {{getHdata[0].playcounts + " views - " + getHdata[0].timeM}} </h4>
            <v-layout row wrap class="px-1 pt-2">
                <v-avatar
                        :size="56"
                        class="accent">
                    <v-img :src="getInfos[0].author.thumbnails[2].url"></v-img>
                </v-avatar>
                <v-layout row wrap class="px-1">
                    <v-flex>
                        <div class="pl-1">
                            <router-link tag="a" class="subheading" :to="{name: 'Channel', params: {id: getInfos[0].author.id } }">{{  getInfos[0].subtitle }}</router-link>
                        </div>
                        <v-card-title class="subheading pt-1 pl-1 grey--text">{{ getSubs(getInfos[0].author.subscriber_count) }}</v-card-title>
                    </v-flex>
                </v-layout>

            </v-layout>

          <!--<span class="subheading" style="color: #35495e">{{getInfos[0].title}}</span><br><br>-->
          <v-divider class="my-1"></v-divider>
          <span v-linkified class="" style="white-space: pre-wrap;" v-html="getInfos[0].descriptions"></span>
        </v-flex>
      </v-card-title>
    </v-card>
</template>
<script>
import playerservice from '@/services/player'
export default {
  computed: {
    getInfos () {
      return this.$store.getters.getInfosData
    },
      getHdata () {
          return this.$store.getters.getheaderdata
      },
  },
    methods: {
        getSubs (sub){
            return playerservice.formatNumbers(sub) + ' Subscribers'
        }
    }
}
</script>
