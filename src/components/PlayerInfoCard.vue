<template>
  <v-container>
    <v-card class="elevation-0">
      <v-card-title >
        <v-flex xs12>
          <v-card-title class="subheading px-0">{{getInfos[0].title}}</v-card-title>
          <!--<span class="subheading" style="color: #35495e">{{getInfos[0].title}}</span><br><br>-->
          <v-divider class="my-1"></v-divider>
          <span v-linkified class="" style="white-space: pre-wrap;" v-html="getInfos[0].descriptions"></span>
        </v-flex>
      </v-card-title>
    </v-card>
  </v-container>
</template>
<script>

export default {
  computed: {
    getInfos () {
      return this.$store.getters.getInfosData
    }
  }
}
</script>
