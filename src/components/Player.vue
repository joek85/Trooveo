<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12>
        <!--<form submit.prevent="onSubmit" action="https://www.youtube.com/get_video_info?video_id=yInADtnhY84" method="post" ref="myid">-->
        <!--</form>-->
        <!--<iframe src="https://www.youtube.com/get_video_info?video_id=yInADtnhY84" onload="receiveMessage" height="200" width="300"></iframe>-->
        <playerheader></playerheader>
      </v-flex>
        <v-layout row wrap>
          <v-flex xs12>
            <playerrelatedcard></playerrelatedcard>
          </v-flex>
          <v-flex xs12>
            <playerinfocard></playerinfocard>
          </v-flex>
        </v-layout>
      <v-dialog v-model="setsDialog" maxWidth="400">
        <v-card>
          <v-card-title class="headline">Add to...</v-card-title>
          <v-divider></v-divider>
          <v-list two-line subheader>
            <v-list-tile avatar v-for="item in getSets" :key="item.length">
              <v-list-tile-action>
                <v-checkbox v-model="item.check"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
                <v-list-tile-sub-title>{{ getTimeFormat(item.subtitle) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.native="setsDialog = false">cancel</v-btn>
            <v-btn color="primary" flat @click.native="newDialog = true">new</v-btn>
            <v-btn color="primary" :disabled="disabledAdd" flat @click.native="setsDialog = false">add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="newDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Create new set</v-card-title>
          <v-flex xs12>
            <v-container>
              <v-text-field v-model="Text" label="Name" required></v-text-field>
            </v-container>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.stop="newDialog=false">cancel</v-btn>
            <v-btn color="primary" flat @click.stop="newDialog=false" @click="createSet">create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-content>
</template>
<script>

import VCardMedia from 'vuetify/src/components/VCard/VCardMedia'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
import playerheader from '@/components/PlayerHeader.vue'
import playerinfocard from '@/components/PlayerInfoCard.vue'
import playerrelatedcard from '@/components/PlayerrelatedCard.vue'
import playerservice from '@/services/player'
// import axios from 'axios'
// import request from 'request'
export default {
    /* eslint-disable */
  components: {
    VCardTitle,
    VCardMedia,
    playerheader,
    playerinfocard,
    playerrelatedcard},
  data () {
    return {
      e3: 1,
      e31: true,
      id: '',
      setsDialog: false,
      newDialog: false,
      Text: '',
      disabledAdd: true
    }
  },
  metaInfo () {
      return {
          title: 'trooveo',
          meta: [
              { charset: 'utf-8' },
              { vmid: 'description', name: 'description', content: 'Listen to YouTube Music Videos (Audio only)' }
          ]
      }
  },
  created () {
    // console.log('created')
    let t = this
    this.$bus.$on('openSetsDialogs', function () {
      t.setsDialog = true
    })
  },
  mounted () {
    // window.addEventListener('message', this.receiveMessage, false)
    this.id = this.$route.params.id
    if (this.$store.getters.getAudioPlayerId !== this.id) {
      // this.fetchmediadata(this.id, this.$store.getters.getUser)
      this.track()
      this.$store.dispatch('commitPlayerData', this.id)
        //playerservice.getinfos(this.id)
    }
    // console.log('mounted')
  },
  watch: {
    '$route' (to, from) {
      // console.log(to)
      //      console.log(from.params.id)
      //      console.log(to.params.id)
      this.id = to.params.id
      if (this.$store.getters.getAudioPlayerId !== this.id) {
        // this.fetchmediadata(this.id, this.$store.getters.getUser)
        this.track()
        this.$store.dispatch('commitPlayerData', this.id)
      }
    },
    '$store.getters.getheaderdata': function () {
     // window.document.title = this.$store.getters.getheaderdata[0].title
    },
    '$store.getters.getUser': function (user) {
      this.$store.dispatch('commitSetsData')
    }
  },
  methods: {
    track () {
      this.$ga.page('player')
    },
    fetchmediadata (id, user) {
      let t = this
      // console.log(playerservice.formatTime2(1))
      playerservice.fetchMediadata(id, user, playerservice.formatTime2())
        .then(function (response) {
          t.$store.dispatch('commitAudioPlayerUrl', response.data.mp3)
          t.$store.dispatch('commitFooterVisibility', 'visible')
          t.$store.dispatch('commitAudioPlayerId', t.id)
        })
        .catch(function (error) {
          console.log(error)
        });

      //      let config = {
      //        headers: {
      //          'content-type': 'text/plain',
      //          'connection': 'keep-alive',
      //          'accept': '*/*' }
      //      }
      //      axios.get('https://www.youtube.com/get_video_info?video_id=' + t.id, config)
      //        .then(function (response) {
      //          let pizza = playerservice.parse_str(response.data)
      //          let streams = (pizza.url_encoded_fmt_stream_map + ',' + pizza.adaptive_fmts).split(',')
      //          // for (let i = 0; i < streams.length; i++) {
      //          console.log(playerservice.parse_str(streams[streams.length - 1]))
      //          // }
      //          let ind = playerservice.parse_str(streams[streams.length - 1]).url.indexOf('.')
      //          let str = playerservice.parse_str(streams[streams.length - 1]).url
      //          console.log('https://redirector.' + str.substring(ind + 1))
      //          t.$store.dispatch('commitAudioPlayerUrl', str)
      //          t.$store.dispatch('commitFooterVisibility', 'visible')
      //          t.$store.dispatch('commitAudioPlayerId', t.id)
      //        })
      //        .catch(function (err) {
      //          console.log(err)
      //        })
      //      fetch('https://www.youtube.com/get_video_info?video_id=' + t.id).then(function (response) {
      //        console.log(response.json())
      //      }).then(function (data) {
      //        console.log(data)
      //      }).catch(function (err) {
      //        console.log(err)
      //      })
      //      t.$refs['myid'].submit(function (event) {
      //        event.preventDefault()
      //      })
      // window.parent.postMessage('get_video_info?video_id=' + t.id, 'https://www.youtube.com/')
      //      let p = t.$http.post('https://www.youtube.com/get_video_info?video_id=' + t.id)
      //      p.done(function (data) {
      //        console.log(data)
      //      })
      //      let xhr = new XMLHttpRequest()
      //      xhr.open('POST', 'https://www.youtube.com/get_video_info?video_id=' + t.id)
      //      xhr.onload = function (event) {
      //        console.log(event.target.response)
      //      }
      // let formData = new FormData(t.$refs['myid'])
      // xhr.send(formData)
      //      playerservice.getc('https://www.youtube.com/get_video_info?video_id=' + t.id, function (request) {
      //        let response = request.currentTarget.response || request.target.responseText
      //        console.log(response)
      //      })
      //      playerservice.updateplayed(id, 10)
      //        .then(function (response) {
      //          // console.log(response)
      //        })
      //        .catch(function (error) {
      //          console.log(error)
      //        })
    },
    getTimeFormat (t) {
      return playerservice.formatTime(t)
    },
    createSet () {
      this.$store.dispatch('commitAddSet', this.Text, playerservice.formatTime2())
    }
  },
  computed: {
    getSets () {
      return this.$store.getters.getSets
    }
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
