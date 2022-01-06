<template>
  <v-app class="bg">
    <AppBar />
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar"
export default {
  name: 'App',

  components: {
    AppBar
  },

  data: () => ({
    //
  }),
};
</script>
<style>

.text-h1, .text-h2, .text-h3, .text-h4, .text-h5 {
  color: #ff5722 !important;
}

/*
#app {
  height: 100%;
  background-image: url('assets/background.jpg') !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
*/
</style>
