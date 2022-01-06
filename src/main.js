import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import router from "./router";
import "./firebase";

Vue.config.productionTip = false

let app;
let auth = getAuth();
onAuthStateChanged(auth, () => {
  // console.log("AUTH user app", user, app);
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
    // app.$vuetify.theme.dark=true;    
  }
});