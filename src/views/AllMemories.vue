<template>
  <v-container >
    <v-row>
      <v-col class="text-h3 primary-text mt-10">
        My Family Memories
      </v-col> 
    </v-row>
    <v-row>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
    </v-row>
  </v-container>
</template>

<script>

import VideoCard from "../components/VideoCard"

export default {
  name: 'AllMemories',

  components: {
      VideoCard
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
</style>
