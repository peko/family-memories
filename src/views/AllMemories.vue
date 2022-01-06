<template>
  <v-container >
    <v-row>
      <v-col class="text-h3 primary-text mt-10">
        My Family Memories
      </v-col> 
    </v-row>
    <v-row>
        <VideoCard v-for="video in videos" :key="video.id" :video="video" />
    </v-row>
  </v-container>
</template>

<script>

import VideoCard from "../components/VideoCard"
import { getVideos } from "../firebase"

export default {
  name: 'AllMemories',

  components: {
      VideoCard
  },

  data: () => ({
    videos:[]
  }),
  mounted() {
     getVideos()
     .then((videos)=>this.videos = videos)
  }
};
</script>

<style scoped>
</style>
