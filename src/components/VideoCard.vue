<template>
    <v-col cols="4">
      <v-card >
        <v-img
          class="white--text align-end"
          height="200px"
          src="../assets/images/video-camera.png"
          >
          <!-- v-card-title>Video title</v-card-title -->
        </v-img>

        <v-card-subtitle class="pb-0">
          Video title
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Tags</div>
          <div>Description</div>
        </v-card-text>

        <!-- v-card-actions>
          <v-btn color="primary" text > Play </v-btn>
        </v-card-actions -->
      </v-card>
    </v-col>
</template>

<script>

import thumb from "../assets/images/video-camera.png";

export default {

  name: 'VideoCard',

  components: {
  },

  data: () => ({
      thumb
  }),
};
</script>

<style scoped>
</style>
