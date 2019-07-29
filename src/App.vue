<template>
  <v-app id="app" light class="application--toolbar application--footer application--footer-fixed">
    <v-navigation-drawer
      clipped
      fixed
      dark
      class="primary"
      v-model="drawer"
      :mini-variant="mini"
      :stateless=true
      :hide-overlay="true"
      :app="true"
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <!--<v-list-tile v-if="userIsAuthenticated" avatar tag="div">-->
          <!--<v-list-tile-avatar>-->
            <!--<img :src="userData.photoURL">-->
          <!--</v-list-tile-avatar>-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title>{{ userData.displayName }}</v-list-tile-title>-->
          <!--</v-list-tile-content>-->
          <!--<v-list-tile-action>-->
            <!--<v-btn icon @click.stop="mini = !mini">-->
              <!--<v-icon>chevron_left</v-icon>-->
            <!--</v-btn>-->
          <!--</v-list-tile-action>-->
        <!--</v-list-tile>-->
      </v-list>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!--<v-list-tile-->
          <!--v-if="userIsAuthenticated"-->
          <!--@click="onLogout">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>exit_to_app</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>Logout</v-list-tile-content>-->
        <!--</v-list-tile>-->
        <v-divider class="my-1"></v-divider>
        <v-subheader class="mt-3">&copy;2019 — <strong>Trooveo</strong></v-subheader>
        <!--<v-subheader class="mt-3"><strong>peakwavesmusic@gmail.com</strong></v-subheader>-->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      solo
      :app="true"
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      scroll-off-screen
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="width: 300px" class="pl-1">
        <router-link to="/" tag="span" style="cursor: pointer">TROOVEO</router-link>
      </v-toolbar-title>
      <v-form style="width: 600px" :class="{'xs12': $vuetify.breakpoint.smAndDown}" class="align-center justify-center align-content-center text-center"
      @submit="dosearch">
        <v-text-field
          flat
          solo-inverted
          hide-details single-line
          append-icon="search"
          placeholder="Search..."
          v-model="searchquery"
          @input="onChange"
        ></v-text-field>
        <v-card class="autocomplete-results" light v-show="isOpen">
            <v-layout row wrap fill-height>
              <v-flex xs12>
                <v-card-title v-for="list in getSuggestionList"
                              :key="list.length" class="autocomplete-result subheading pa-2 ma-1" @click="setResult(list.text)">
                  {{ list.text }}
                </v-card-title>
              </v-flex>
            </v-layout>
        </v-card>
      </v-form>
    </v-toolbar>
    <main>
      <v-fade-transition mode="out-in">
        <!--<keep-alive>-->
          <router-view></router-view>
        <!--</keep-alive>-->
      </v-fade-transition>
      <v-snackbar color="primary"
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar"
      >
        {{ snackbarText }}
        <v-btn flat color="white" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </main>
      <v-footer height="auto" app fixed color="primary" v-bind:style=footerhider>
        <v-container class="py-0">
          <audioplayer>
          </audioplayer>
        </v-container>
      </v-footer>
  </v-app>
</template>

<script>
import mediacard1 from '@/components/MediaCard-1.vue'
import playerheader from '@/components/PlayerHeader.vue'
import audioplayer from '@/components/AudioPlayer.vue'
import VCardTitle from 'vuetify/src/components/VCard/VCardTitle'
import search from '@/services/search'
export default {
    /* eslint-disable */
    components: {
    VCardTitle,
    mediacard1,
    playerheader,
    audioplayer},
    metaInfo () {
        return {
            title: 'trooveo',
            meta: [
                { charset: 'utf-8' },
                { vmid: 'description', name: 'description', content: 'Listen to YouTube Music Videos (Audio only)' }
            ]
        }
    },
  data () {
    return {
      drawer: null,
      e3: 1,
      e31: true,
      mini: false,
      isOpen: false,
      searchquery: '',
      snackbar: false,
      y: 'bottom',
      x: 'left',
      mode: '',
      timeout: 8000,
      snackbarText: 'Message',
      listS: []
    }
  },
  created () {
//      this.$bus.$on('openSnackBar', function () {
//          this.snackbar = true
//      })
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside);
    this.$root.$on('SnackBar', (param) => {
        this.snackbarText = param;
        this.snackbar = true
    })
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  },
  computed: {
    footerhider () {
      return this.$store.getters.getfootervisibility
    },
    menuItems () {
      let items = [
        // {icon: 'face', title: 'Sign up', path: '/signup'},
        // {icon: 'lock_open', title: 'Sign in', path: '/signin'}
        {icon: 'trending_up', title: 'Most Popular', path: '/mostpopular'},
          {icon: 'history', title: 'History', path: '/history'}
      ]
      //      if (this.userIsAuthenticated) {
      //        items = [
      //          {icon: 'trending_up', title: 'Most Popular', path: '/mostpopular'},
      //          //          {icon: 'subscriptions', title: 'Followers', path: '/mostpopular'},
      //          {icon: 'history', title: 'History', path: '/history'},
      //          {icon: 'featured_play_list', title: 'Sets', path: '/Sets'}
      //        ]
      //      }
      return items
    },
    userIsAuthenticated () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    },
    userData () {
      return this.$store.getters.getUser
    },
    getSuggestionList () {
      return this.listS
    }
  },
  methods: {
    handleClickOutside (evt) {
      // if (!this.$el.contains(evt.target)) {
      this.isOpen = false
      // }
    },
    async dosearch (event) {
      event.preventDefault()
      this.isOpen = false
      if (this.searchquery.length > 0) {
        this.$router.push({path: '/search', query: { q: this.searchquery }})
      }
    },
    onLogout () {
      this.$store.dispatch('commitLogout')
    },
    onChange () {
      if (this.searchquery.length > 0) {
        this.isOpen = true
        let t = this
        let arr = []
        search.searchsuggestion(this.searchquery)
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              arr.unshift({text: response.data[i].title})
            }
            t.listS = arr
          })
          .catch(function (err) {
            console.log(err)
          })
      } else {
        this.isOpen = false
      }
    },
    setResult (text) {
      this.searchquery = text
      this.$router.push({path: '/search', query: { q: this.searchquery }})
    }
  }
}
</script>
<style scoped>
  .autocomplete-result{
    cursor: pointer;
  }
  .autocomplete-result:hover {
    background-color: rgba(107, 139, 164, 0.15);
    color: black;
    cursor: pointer;
  }
  .autocomplete-results {
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow: scroll;
    width: 600px;
    position: absolute;
  }
</style>
