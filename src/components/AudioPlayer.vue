<template>
      <v-card color="primary" class="elevation-0" dark style="width: 100%" >
        <v-layout row wrap style="height: 100%">
          <v-card hover color="secondary" style="width: 5%;height: 100%" class="elevation-4 ma-1">
            <!--<v-container grid-list-xs>-->
              <!--<v-card-media id="v-card-media" @click="cardClick"-->
                            <!--style="width: 100%"-->
                            <!--height="48px"-->
                            <!--:src='getTrackInfos[0].imgurl'-->
              <!--&gt;-->
              <!--</v-card-media>-->
            <!--</v-container>-->
            <v-img
              :src="getTrackInfos[0].imgurl" @click="cardClick"
              aspect-ratio="1"
              height="48px"
            ></v-img>
          </v-card>
          <v-flex xs2 sm2 md2 lg2 xl2>
            <v-layout row wrap>
              <v-flex xs12>
                <h4 class="subheading list__tile__title text-truncate mx-1 mb-0">{{ getTrackInfos[0].title }}</h4>
              </v-flex>
              <v-flex xs12>
                <h4 class="subheading list__tile__title text-truncate mx-1 mb-0">{{ getTrackInfos[0].subtitle }}</h4>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-layout align-center>
            <v-btn icon small flat dark @click="togglePlaying">
              <v-icon>{{onbtnPlayChange}}</v-icon>
            </v-btn>
            <h5 class="subheading mr-1">{{ getAudioDuration }}</h5>
            <v-flex xs2 sm5 md6 lg6 xl6>
              <vue-slider v-bind="hSliderOptions" @callback="hSlider" @drag-start="dragStart" @drag-end="dragEnd"></vue-slider>
            </v-flex>
            <h5 class="subheading ml-1">{{ getTrackInfos[0].duration }}</h5>
            <v-btn class="mr-0" icon small flat dark @click="toggleRepeat">
              <v-icon>{{onbtnRepeat}}</v-icon>
            </v-btn>
            <!--<v-menu offset-y top-->
                    <!--:close-on-content-click="false"-->
                    <!--:nudge-width="200">-->
              <!--<v-btn icon small flat dark  slot="activator">-->
                <!--<v-icon>equalizer</v-icon>-->
              <!--</v-btn>-->
              <!--<v-list-tile-content>-->
                <!--<v-card color="primary" style="height: 100px;width: 100%">-->
                  <!--<v-list-tile>-->
                    <!--<vue-slider v-bind="vSliderOptions"></vue-slider>-->
                  <!--</v-list-tile>-->
                <!--</v-card>-->
              <!--</v-list-tile-content>-->
            <!--</v-menu>-->
            <!--<v-speed-dial-->
              <!--:top="top"-->
              <!--:bottom="bottom"-->
              <!--:right="right"-->
              <!--:left="left"-->
              <!--:direction="direction"-->
              <!--:transition="transition"-->
            <!--&gt;-->
              <v-btn icon small flat dark @click="toggleMute">
                <v-icon>{{onbtnMute}}</v-icon>
              </v-btn>
              <!--<v-card color="primary" style="height: 100px;width: 35%">-->
                <vue-slider v-bind="vSliderOptions" @callback="vSlider" v-model="vSliderOptions.value"></vue-slider>
              <!--</v-card>-->
            <!--</v-speed-dial>-->
            <!--<v-card color="primary" class="elevation-10" width="180px" height="48px">-->
              <!--<div ref="mypeakmeter" style="width: 100%; height: 100%"></div>-->
            <!--</v-card>-->
          </v-layout>
        </v-layout>
      </v-card>
</template>
<script>
import vueSlider from 'vue-slider-component'
// import VList from 'vuetify/src/components/VList/VList'
import webAudioPeakMeter from '@/services/AudioPeakMeter/index'
import audioengine from '@/services/AudioEngine'
export default {
    /* eslint-disable */
    components: {
    vueSlider
  },
    created() {
        window.addEventListener('keydown', (e) => {
//            if (e.key === ' ') {
////                e.preventDefault();
////                this.togglePlaying()
//            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (!isNaN(this.audios.audioB[this.audios.activeAudio].duration)) {
                    this.audios.audioB[this.audios.activeAudio].currentTime = this.audios.audioB[this.audios.activeAudio].currentTime + 5
                }
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (!isNaN(this.audios.audioB[this.audios.activeAudio].duration)) {
                    this.audios.audioB[this.audios.activeAudio].currentTime = this.audios.audioB[this.audios.activeAudio].currentTime - 5
                }
            }
//            if (e.key === 'ArrowUp') {
//                e.preventDefault();
//                this.audios.audioB[this.audios.activeAudio].volume += 0.1;
//            }
//            if (e.key === 'ArrowDown') {
//                e.preventDefault();
//                this.audios.audioB[this.audios.activeAudio].volume -= 0.1;
//            }
        });
    },
  data () {
    return {
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: false,
      left: false,
      transition: 'slide-y-reverse-transition',
      hSliderOptions: {
        value: 0,
        eventType: 'auto',
        width: '100%',
        height: 4,
        dotSize: 12,
        dotHeight: null,
        dotWidth: null,
        direction: 'horizontal',
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        speed: null,
        stopPropagation: true,
        disabled: false,
        piecewise: false,
        piecewiseStyle: null,
        piecewiseLabel: false,
        tooltip: 'hover',
        tooltipDir: 'top',
        useKeyboard: false,
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: true,
        formatter: (v) => `${this.audios.Audioduration}`,
        bgStyle: {backgroundColor: '#4a647d'},
        sliderStyle: {backgroundColor: '#90A4AE'},
        processStyle: {backgroundColor: '#90A4AE'},
        piecewiseActiveStyle: null,
        tooltipStyle: {backgroundColor: '#4a647d', borderColor: '#4a647d'},
        labelStyle: null,
        labelActiveStyle: null
      },
      vSliderOptions: {
        value: 100,
        eventType: 'auto',
        width: '7%',
        height: 4,
        dotSize: 10,
        dotHeight: null,
        dotWidth: null,
        direction: 'horizontal',
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        speed: null,
        stopPropagation: true,
        disabled: false,
        piecewise: false,
        piecewiseStyle: null,
        piecewiseLabel: false,
        tooltip: 'hover',
        tooltipDir: 'top',
        useKeyboard: true,
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: true,
        formatter: '',
        bgStyle: {backgroundColor: '#4a647d'},
        sliderStyle: {backgroundColor: '#90A4AE'},
        processStyle: {backgroundColor: '#90A4AE'},
        piecewiseActiveStyle: null,
        tooltipStyle: {backgroundColor: '#4a647d', borderColor: '#4a647d'},
        labelStyle: null,
        labelActiveStyle: null
      },
      audios: {
        audioA: '',
        audioB: [],
        activeAudio: 0,
        repeat: false,
        crossfadespeed: 0.05,
        x: 0.0,
        Audioduration: this.convertTimeHHMMSS(0)
      },
      btns: [{
        btnPlay: 'play_arrow',
        btnRepeat: 'repeat',
        btnMute: 'volume_up'
      }],
      updateHSlider: true,
      volume: 1
    }
  },
  methods: {
      keyhandler(event) {
          alert(`you didn't type '+', did you?`);
      },
    initAudioEngine () {
      // console.log('init audio')
      this.setupAudios()
      audioengine.init()
    },
    setAudioSource (src) {
      this.audios.audioB[this.audios.activeAudio].src = src // '../static/file.mp3' 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='
      this.setupAudioEventListinners(this.audios.activeAudio)
      // this.audios.activeAudio++
    },
    setupAudios () {
      this.audios.audioB[0] = new Audio()
      this.audios.audioB[0].autoplay = true
      this.audios.audioB[0].preload = true
      this.audios.audioB[0].crossDomain = true
//       this.audios.audioB[0].crossOrigin = 'anonymous'
      this.audios.audioB[1] = new Audio()
      this.audios.audioB[1].autoplay = true
      this.audios.audioB[1].preload = true
      this.audios.audioB[1].crossDomain = true
//       this.audios.audioB[1].crossOrigin = 'anonymous'
      // this.audios.audioA.crossOrigin = '*'
//            this.audios.audioA.crossDomain = true
            window.AudioContext = window.AudioContext || window.webkitAudioContext
//            const context = new AudioContext()
//            const gainNode = context.createGain()
//            gainNode.connect(context.destination)
//            gainNode.gain.value = 1.0
//            const source = context.createMediaElementSource(this.audios.audioB[this.audios.activeAudio])
//            source.connect(gainNode)

//            let myMeterElement = this.$refs.mypeakmeter
//            let myAudio = this.audios.audioB[this.audios.activeAudio]
//            let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
//            //      audioCtx.sampleSize = 44100
//            let sourceNode = audioCtx.createMediaElementSource(myAudio)
//            sourceNode.connect(audioCtx.destination)
//            let meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx)
//            webAudioPeakMeter.createMeter(myMeterElement, meterNode, {})
    },
    setupAudioEventListinners (index) {
      this.audios.audioB[index].addEventListener('error', this.onAudioError)
      this.audios.audioB[index].addEventListener('play', this.onAudioPlay)
      this.audios.audioB[index].addEventListener('pause', this.onAudioPause)
      this.audios.audioB[index].addEventListener('abort', this.onAudioPause)
      this.audios.audioB[index].addEventListener('progress', this.onAudioProgress)
      this.audios.audioB[index].addEventListener('durationchange', this.onAudioDurationChange)
      this.audios.audioB[index].addEventListener('timeupdate', this.onAudioTimeUpdate)
      this.audios.audioB[index].addEventListener('volumechange', this.onAudioVolumeChange)
      this.audios.audioB[index].addEventListener('ended', this.onAudioEnded)
      this.audios.audioB[index].addEventListener('loadstart', this.onloadstart)
      this.audios.audioB[index].addEventListener('loadeddata', this.onloadeddata)
    },
    removeAudioEventListinners (index) {
      this.audios.audioB[index].addEventListener('onerror', this.onAudioError)
      this.audios.audioB[index].removeEventListener('play', this.onAudioPlay)
      this.audios.audioB[index].removeEventListener('pause', this.onAudioPause)
      this.audios.audioB[index].removeEventListener('abort', this.onAudioPause)
      this.audios.audioB[index].removeEventListener('progress', this.onAudioProgress)
      this.audios.audioB[index].removeEventListener('durationchange', this.onAudioDurationChange)
      this.audios.audioB[index].removeEventListener('timeupdate', this.onAudioTimeUpdate)
      this.audios.audioB[index].removeEventListener('volumechange', this.onAudioVolumeChange)
      this.audios.audioB[index].removeEventListener('ended', this.onAudioEnded)
      this.audios.audioB[index].removeEventListener('loadstart', this.onloadstart)
      this.audios.audioB[index].removeEventListener('loadeddata', this.onloadeddata)
    },
    togglePlaying () {
      if (!this.audios.audioB[this.audios.activeAudio].paused) {
        this.pause()
      } else {
        this.play()
      }
    },
    toggleRepeat () {
      if (this.audios.repeat) {
        this.audios.repeat = false
        this.btns[0].btnRepeat = 'repeat'
      } else {
        this.audios.repeat = true
        this.btns[0].btnRepeat = 'repeat_one'
      }
    },
    toggleMute () {
      // this.volume = this.audios.audioB[this.audios.activeAudio].volume
      if (this.btns[0].btnMute === 'volume_up') {
        this.vSliderOptions.value = 0
        this.audios.audioB[this.audios.activeAudio].volume = 0
        this.btns[0].btnMute = 'volume_off'
      } else {
        this.vSliderOptions.value = 100
        this.audios.audioB[this.audios.activeAudio].volume = 1
        this.btns[0].btnMute = 'volume_up'
      }
    },
    play () {
      this.audios.audioB[this.audios.activeAudio].play()
      // this.audios.audioB[this.audios.activeAudio].removeEventListener('play', this.onAudioPlay)
    },
    pause () {
      this.audios.audioB[this.audios.activeAudio].pause()
    },
    setProgress (val) {
      if (isNaN(this.audios.audioB[this.audios.activeAudio].duration)) {
        // this.playStat.playedTime = 0
      } else {
        this.audios.audioB[this.audios.activeAudio].currentTime = val
      }
    },
    onAudioPlay () {
      // this.isPlaying = true
      // console.log('playing')
      this.btns[0].btnPlay = 'pause'
      this.crossFadeIn()
//       webAudioPeakMeter.Start()
      //      this.audios.activeAudio++
      //      console.log(this.audios.activeAudio)
      //      this.removeAudioEventListinners(this.audios.activeAudio)
      //      // this.audios.activeAudio = (this.audios.activeAudio ? 0 : 1)
      //      console.log(this.audios.activeAudio)
      //      this.crossFadeOut()
    },
      onAudioError (err) {
//        console.log(err);
          this.$root.$emit('SnackBar', 'Error, cannot play the stream!')
      },
    onAudioPause () {
      // this.isPlaying = false
      this.btns[0].btnPlay = 'play_arrow'
      // webAudioPeakMeter.Stop()
    },
    onloadstart () {
      // this.isPlaying = false
      // console.log('onloadstart')
      // webAudioPeakMeter.Stop()
    },
    onloadeddata () {
      // this.isPlaying = false
      this.audios.x = 0
      // console.log('onloadeddata')
      // this.audios.activeAudio--
      // webAudioPeakMeter.Stop()
    },
    onAudioDurationChange () {
      // console.log(this.audios.audioB[this.audios.activeAudio].duration)
      if (!isNaN(this.audios.audioB[this.audios.activeAudio].duration)) {
        this.hSliderOptions.max = this.audios.audioB[this.audios.activeAudio].duration
      }
    },
    onAudioProgress () {
    //      if (this.audio.buffered.length) {
    //        this.playStat.loadedTime = this.audio.buffered.end(this.audio.buffered.length - 1)
    //      } else {
    //        this.playStat.loadedTime = 0
    //      }
    },
    onAudioTimeUpdate () {
      this.audios.Audioduration = this.convertTimeHHMMSS(this.audios.audioB[this.audios.activeAudio].currentTime)
      if (this.updateHSlider) {
        this.hSliderOptions.value = this.audios.audioB[this.audios.activeAudio].currentTime
      }
    },
    onAudioVolumeChange () {
    //      this.volume = this.audioB[this.audios.activeAudio].volume
    },
    onAudioEnded () {
      this.hSliderOptions.value = 0
      // console.log('end')
      if (this.audios.repeat) {
        this.setupAudioEventListinners(this.audios.activeAudio)
        this.play()
      }else{
          if (this.getAutoPlay){
//              console.log("hi")
              this.$root.$emit('autoplay', '')
          }
      }
      // webAudioPeakMeter.Stop()
    },
    convertTimeHHMMSS (val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
      return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
    },
    hSlider: function (val) {
      this.audios.Audioduration = this.convertTimeHHMMSS(val)
      if (this.updateHSlider) {
        this.setProgress(val)
      }
    },
    vSlider: function (val) {
      this.audios.audioB[this.audios.activeAudio].volume = val / 100
    },
    dragStart: function () {
      this.updateHSlider = false
    },
    dragEnd: function () {
      this.updateHSlider = true
    },
    cardClick () {
      this.$router.push({name: 'Player', params: { id: this.getId }})
    },
    crossFadeIn: function () {
      if (this.audios.x < 1.0) {
        this.audios.x += this.audios.crossfadespeed
        setTimeout(this.crossFadeIn, 200)
      } else {
        this.audios.x = 1.0
      }
      // console.log(this.audios[0].x)
      this.audios.audioB[this.audios.activeAudio].volume = this.audios.x.toFixed(2)
    },
    crossFadeOut: function () {
      if (this.audios.x > 1.0) {
        this.audios.x -= this.audios.crossfadespeed
        setTimeout(this.crossFadeOut, 200)
      } else {
        this.audios.x = 0.0
      }
      // console.log(this.audios[0].x.toFixed(2))
      this.audios.audioB[this.audios.activeAudio].volume = this.audios.x.toFixed(2)
    }
  },
  watch: {
    '$store.getters.getAudioPlayerUrl': function () {
      this.setAudioSource(this.$store.getters.getAudioPlayerUrl)
    }
  },
  mounted () {
    this.initAudioEngine()
    this.$root.$on('clickedSomething', (param) => {
      let win = window.open('https://www.youtube.com/watch?v=' + param + '&t=' + Math.floor(this.audios.audioB[this.audios.activeAudio].currentTime) + 's', '_blank')
      win.focus()
    })
  },
  computed: {
    getTrackInfos () {
      return this.$store.getters.getheaderdata
    },
    onbtnPlayChange () {
      return this.btns[0].btnPlay
    },
    onbtnRepeat () {
      return this.btns[0].btnRepeat
    },
    onbtnMute () {
      return this.btns[0].btnMute
    },
    getId () {
      return this.$store.getters.getAudioPlayerId
    },
    getAudioDuration () {
      return this.audios.Audioduration
    },
    getAutoPlay () {
        return this.$store.getters.getAutoPlay
    }
  }
}
</script>
