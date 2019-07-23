<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Welcome.</h3>
          </div>
        </v-card-title>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import mediacard1 from '@/components/MediaCard-1.vue'

export default {
  components: {mediacard1},
  data () {
    return {
      cards: [
      ]
    }
  },
  methods: {
  },
  created () {
    // this.$store.dispatch('commitFooterVisibility', 'hidden')
  }
}
</script>
