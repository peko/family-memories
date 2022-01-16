<template>
  <v-container >
    <v-row>
      <v-col class="text-h1 primary-text mt-10">
        My Family Space
      </v-col> 
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" md="4" lg="3">
        <v-btn block disabled color="primary" class="mt-10 mb-10"> Invite family member</v-btn>
        <v-btn to="/create-memory" block color="primary" class="mt-10 mb-10"> Create a memory </v-btn>
        <v-btn to="/all-memories" block color="primary" class="mt-10 mb-10"> All memories </v-btn>
      </v-col>
      <v-col class="family" xs="12" sm="6" md="8" lg="9">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.family {
  background-image: url('../assets/family.jpg') !important;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
  /* 
  background-size: cover;
  */
}
</style>
