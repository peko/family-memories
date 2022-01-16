<template>
  <v-container >
    <v-row>
      <v-col class="text-h3 primary-text mt-10">
        My Family Memories
      </v-col> 
    </v-row>
    <v-row>
        <VideoCard v-for="video in videos" :key="video.id" :video="video" @delete="deleteVideo(video)"/>
    </v-row>
  </v-container>
</template>

<script>

import VideoCard from "../components/VideoCard"
import { getVideos, deleteVideo} from "../firebase"

export default {
  name: 'AllMemories',

  components: {
      VideoCard
  },

  data: () => ({
    videos:[]
  }),
  methods: {
      deleteVideo(video) {
          let v = this.videos.indexOf(video);
          console.log(v);
          this.$delete(this.videos, v);
          deleteVideo(video);
      }
  },
  
  activated() {
     getVideos()
     .then((videos)=>this.videos = videos)
  }
};
</script>

<style scoped>
</style>
