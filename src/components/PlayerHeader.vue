<template>
  <v-container>
    <v-card color="primary" class="elevation-0 pa-3" dark>
      <!--<v-container fluid grid-list-md>-->
        <v-layout row wrap>
          <v-flex xs12 sm12 md4 lg3 xl3>
            <v-card color="accent" class="pa-1">
              <!--<v-container fluid grid-list-xs class="cardpizza">-->
                <!--<v-card-media class="v-card-media"-->
                              <!--height="300px"-->
                              <!--:src='getHdata[0].imgurl'>-->
                <v-img
                  :src="getHdata[0].imgurl" class="cardpizza"
                  aspect-ratio="1"
                  height="300px"
                >
                  <v-container fill-height fluid class="cont">
                    <v-layout fill-height row wrap class="lay">
                      <v-flex xs12>
                        <v-btn @click="gotoyoutube" round small color="primary">
                          go to youtube
                        </v-btn>
                        <v-btn @click="download" round small color="primary">
                          download
                        </v-btn>
                      </v-flex>
                      <v-flex xs12 class="text-xs-right">
                        <div class="text-xs-right">
                          <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" scrollable>
                            <v-btn slot="activator" color="primary" fab>
                              <v-icon>fullscreen</v-icon>
                            </v-btn>
                            <v-card style="background-color: #212121" dark>
                              <v-toolbar card dark color="transparent">
                                <v-btn icon dark @click="dialog = false">
                                  <v-icon>close</v-icon>
                                </v-btn>
                              </v-toolbar>
                              <v-container fluid grid-list-sm>
                                <v-layout row wrap>
                                  <v-flex xs12>
                                    <v-card color="black" class="elevation-0" height="480px">
                                      <!--<v-card-media class="v-card-media"-->
                                                    <!--height="480px"-->
                                                    <!--:src='getHdata[0].imgurl' contain>-->
                                      <!--</v-card-media>-->
                                      <v-img
                                        :src="getHdata[0].imgurl"
                                        contain
                                        height="480px"
                                      ></v-img>
                                    </v-card>
                                    <div class="text-xs-center">
                                      <h6 class="display-1">{{ getHdata[0].title }}</h6>
                                      <h5 class="subheading">{{ getHdata[0].subtitle }}</h5>
                                      <v-chip v-if="getHdata[0].duration" small disabled outline color="white">{{getHdata[0].duration}}</v-chip>
                                      <v-chip v-if="getHdata[0].playcounts" small disabled outline color="white">
                                        <v-icon>play_arrow</v-icon>
                                        <span>{{getHdata[0].playcounts}}</span>
                                      </v-chip>
                                      <v-chip v-if="getHdata[0].timeM" small disabled outline color="white">{{getHdata[0].timeM}}</v-chip>
                                    </div>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card>
                          </v-dialog>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                <!--</v-card-media>-->
              <!--</v-container>-->
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md7 lg9 xl9 fill-height class="pl-2">
            <h6 class="display-1">{{ getHdata[0].title }}</h6>
            <span class="subheading">{{ getHdata[0].subtitle }}</span>
            <v-chip v-if="getHdata[0].duration" small disabled outline color="accent">{{getHdata[0].duration}}</v-chip>
            <v-chip v-if="getHdata[0].playcounts" small disabled outline color="accent">
              <v-icon>play_arrow</v-icon>
              <span>{{getHdata[0].playcounts}}</span>
            </v-chip>
            <v-chip v-if="getHdata[0].timeM" small disabled outline color="accent">{{getHdata[0].timeM}}</v-chip>
            <v-divider class="my-2"></v-divider>
            <v-chip v-for="chip in getHdata[1].chips"
                    :key="chip.length"
                    small outline color="accent">{{chip.title}}</v-chip>
            </v-flex>
        </v-layout>
      <!--</v-container>-->
    </v-card>
  </v-container>
</template>
<script>
import playerservice from '@/services/player'
export default {
    /* eslint-disable */
  data () {
    return {
      dialog: false
    }
  },
    metaInfo () {
        return {
            title: this.getHdata[0].title,
            meta: [
                {vmid: 'description', name: 'description', content: this.getHdata[0].title },
                {name: 'keywords', content: this.getHdata[1].chips},
                {name: 'robots', content: 'index, follow'}
            ]
        }
    },
  methods: {
    play () {
      // console.log('play')
    },
    gotoyoutube () {
      this.$root.$emit('clickedSomething', this.getHdata[0].Id)
    },
    download () {
      playerservice.downloadfile(this.getHdata[0].Id)
    }
  },
  computed: {
    getHdata () {
      return this.$store.getters.getheaderdata
    }
  }
}
</script>
<style scoped>
  .v-card-media{
    opacity: 1;
    transition: .5s ease;
  }
  .cardpizza:hover .cont{
    opacity: 1;
  }
  .cardpizza:hover .v-card-media{
    opacity: 1;
  }
  .cont{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: .5s ease;
    background-color: transparent;
    opacity: 0;
  }
</style>
