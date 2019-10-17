// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import vcss from 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import linkify from 'vue-linkify'
import { store } from './store/index'
import VueAnalytics from 'vue-analytics'
import Meta from 'vue-meta'
Vue.use(Vuetify, {
  theme: {
    primary: '#35495e',
    secondary: colors.blueGrey.lighten2,
    accent: '#6b8ba4', // '#6b8ba4', // colors.deepPurple.base,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.blue.base,
    success: colors.green.base
  }
})
Vue.use(vcss)
Vue.use(colors)
Vue.config.productionTip = false
Vue.directive('linkified', linkify)
Vue.prototype.$bus = new Vue({})
/* eslint-disable no-new */
Vue.use(Meta)
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate: function () {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // console.log(user)
    store.dispatch('commitUser', 1)
    //   } else {
    //     console.log('fuck')
    //     store.dispatch('commitUser', null)
    //   }
    // })
  },
  components: { App },
  template: '<App/>',
  render: h => h(App),
  directives: {
      focus: {
          inserted(el) {
              el.focus()
          }
      }
  }
})

