<template>
    <v-card color="transparent" class="elevation-0 " dark>
        <v-layout row wrap class="">
          <v-flex xs12 >
            <vue-plyr id="player" :key="getHdata[0].Id" :options="options">
              <div class="plyr__video-embed">
                <iframe
                        :src="`https://www.youtube.com/embed/${getHdata[0].Id}`"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay;fullscreen"
                ></iframe>
              </div>
            </vue-plyr>
          </v-flex>
        </v-layout>

    </v-card>
</template>
<script>
import playerservice from '@/services/player'
import playerrelatedcard from '@/components/PlayerrelatedCard.vue'
export default {
    /* eslint-disable */
    components: {
        playerrelatedcard},
  data () {
    return {
      dialog: false,
        options: {
          autoplay: true,
            settings:['captions', 'quality', 'speed', 'loop'],
            ratio:'16:9',
            keyboard:{global:true}
      }
    }
  },
    mounted () {
//        console.log(this.getHdata[0].Id);
        //this.$refs.plyr.src = "https://www.youtube.com/embed/" + this.getHdata[0].Id + "?"
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
    },
      getLive(){
          return !!this.getHdata[0].isLive
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
  :root {
    --plyr-color-main: #1ac266;
  }
</style>
