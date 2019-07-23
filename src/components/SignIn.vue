<template>
  <v-content>
    <v-container>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Error</v-card-title>
            <v-card-text>{{ erroMsg }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.native="dialog = false">close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-flex xs2>
          <v-card color="primary" dark>
            <v-tabs grow color="primary">
              <v-tab v-for="n in tabItems" :key="n.length">
                {{ n.title }}
              </v-tab>
                <v-tab-item>
                  <v-layout row justify-center>
                    <v-container>
                      <v-flex xs12>
                        <!--<v-btn block color="secondary" dark>-->
                          <!--sign in with google-->
                        <!--</v-btn>-->
                        <img @click="signInWithGoogle" src="../assets/btn_google_signin_light_normal_web@2x.png" style="height: 40px; display: block; margin-left: auto;margin-right: auto;cursor: pointer">
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row class="my-2 mb-0">
                          <v-divider class="my-3"></v-divider>
                          <h1 class="subheading ml-2 mr-2 my-1"> or </h1>
                          <v-divider class="my-3"></v-divider>
                        </v-layout>
                      </v-flex>
                      <v-form ref="form" lazy-validation>
                        <v-text-field
                          color="secondary"
                          label="E-mail"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          name="password"
                          label="Password"
                          id="password"
                          v-model="password"
                          type="password"
                          color="secondary"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-form>
                      <v-flex xs12>
                        <v-btn block color="secondary" dark>
                          sign in
                        </v-btn>
                      </v-flex>
                    </v-container>
                  </v-layout>
                </v-tab-item>
                <v-tab-item>
                  <v-layout row justify-center>
                    <v-container>
                      <v-flex xs12>
                        <!--<v-btn block color="secondary" dark>-->
                          <!--sign in with google-->
                        <!--</v-btn>-->
                        <img @click="signUpWithGoogle" src="../assets/btn_google_signin_light_normal_web@2x.png" style="height: 40px;display: block; margin-left: auto;margin-right: auto;cursor: pointer">
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row class="my-2 mb-0">
                          <v-divider class="my-3"></v-divider>
                          <h1 class="subheading ml-2 mr-2 my-1"> or </h1>
                          <v-divider class="my-3"></v-divider>
                        </v-layout>
                      </v-flex>
                      <v-form ref="form" lazy-validation>
                        <v-text-field
                          color="secondary"
                          label="Username"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          color="secondary"
                          label="E-mail"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          name="password"
                          label="Password"
                          id="passwordsignup"
                          v-model="password"
                          type="password"
                          color="secondary"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-form>
                      <v-flex xs12>
                        <v-btn block color="secondary" dark>
                          sign up
                        </v-btn>
                      </v-flex>
                    </v-container>
                  </v-layout>
                </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
//import * as firebase from 'firebase'
export default {
    /* eslint-disable */
    beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setPath(from.fullPath)
    })
  },
  mounted () {
    window.document.title = 'Signin'
  },
  data () {
    return {
      dialog: false,
      errorMsg: '',
      tabItems: [
        {title: 'sign in'},
        {title: 'sign up'}
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      currentItem: 'signup',
      fromPath: '/'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push(this.fromPath)
      }
    }
  },
  methods: {
    setPath (path) {
      this.fromPath = path
    },
    signInWithGoogle () {
      let t = this
      console.log('signin')
//      let provider = new firebase.auth.GoogleAuthProvider()
//      firebase.auth().signInWithPopup(provider).then(function (result) {
//        // This gives you a Google Access Token. You can use it to access the Google API.
//        // let token = result.credential.accessToken
//        // The signed-in user info.
//        let user = result.user
//        console.log(user)
//        t.$store.dispatch('commitUser', user)
//      }).catch(function (error) {
//        // Handle Errors here.
//        //        let errorCode = error.code
//        //        let errorMessage = error.message
//        //        // The email of the user's account used.
//        //        let email = error.email
//        //        // The firebase.auth.AuthCredential type that was used.
//        //        let credential = error.credential
//        t.$store.dispatch('commitUser', null)
//        t.erroMsg = error.message
//        t.dialog = true
//        console.log(error)
//      })
    },
    signUpWithGoogle () {
      console.log('signup')
    }
  }
}
</script>
