<template>

    <v-app-bar app class="elevation-0">
      <!--
      <div class="d-flex align-center">
        <v-icon left large>mdi-message-video</v-icon>
        <h2 class="d-none d-sm-inline">Family Memories</h2>
      </div>
      -->
      <v-btn to="/create-memory" color="primary" text class="mr-2">create memory</v-btn>
      <v-btn to="/all-memories" color="primary" text class="mr-2">all memories</v-btn>
      <v-btn disabled color="primary" text class="mr-2">about us</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="user" text @click="logout">logout</v-btn>
      <v-chip v-if="user" class="d-none d-sm-inline mr-4"><v-icon left>mdi-account</v-icon>{{user.email}}</v-chip>
    </v-app-bar>

</template>

<script>
import { logout } from "../firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  name: 'AppBar',
  data: ()=>({
    user: null
  }),
  mounted() {
    // this.user = auth.currentUser;
    
    onAuthStateChanged(getAuth(), (user) => this.user=user);
  },
  methods: { 
   logout
  }
};
</script>
