import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/components/Player.vue'
import Home from '@/components/Home.vue'
import Search from '@/components/Search.vue'
import Channel from '@/components/Channel.vue'
import MostPopular from '@/components/MostPopular.vue'
import SignIn from '@/components/SignIn.vue'
import History from '@/components/History.vue'
import Sets from '@/components/Sets.vue'
import Playlist from '@/components/Playlist.vue'
Vue.use(Router);

export default new Router({
    /* eslint-disable */
    routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/mostpopular'
    },
    {
      path: '/player/:id',
      name: 'Player',
      component: Player,
      meta: {title: 'player'}
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {title: 'Search'}
    },
    {
      path: '/channel/:id',
      name: 'Channel',
      component: Channel,
      meta: {title: 'Channel'}
    },
    {
        path: '/playlist/:id',
        name: 'Playlist',
        component: Playlist,
        meta: {title: 'Playlist'}
    },
    {
      path: '/mostpopular',
      name: 'MostPopular',
      component: MostPopular,
      meta: {title: 'MostPopular'}
    },
    {
      path: '/history',
      name: 'History',
      component: History,
      meta: {title: 'History'}
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      meta: {title: 'SignIn'}
    },
    {
      path: '/Sets',
      name: 'Sets',
      component: Sets,
      meta: {title: 'Sets'}
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
})
