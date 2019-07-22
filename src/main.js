import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyBgXJGp7pDRE9zUyt_uPWi9nTMfd-JoPk8",
  authDomain: "todo-fca8f.firebaseapp.com",
  databaseURL: "https://todo-fca8f.firebaseio.com",
  projectId: "todo-fca8f",
  storageBucket: "todo-fca8f.appspot.com",
  messagingSenderId: "798829921071",
  appId: "1:798829921071:web:f71ba2e85f0431b6"
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
