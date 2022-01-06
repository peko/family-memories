<template>

    <v-app-bar app color="transparent" class="elevation-0">
      <!--
      <div class="d-flex align-center">
        <v-icon left large>mdi-message-video</v-icon>
        <h2 class="d-none d-sm-inline">Family Memories</h2>
      </div>
      -->
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mr-4">about us</v-btn>
      <v-btn v-if="user" @click="logout" color="primary mr-4">logout</v-btn>
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
