<template>
    <v-col cols="4">
      <v-card >
        <v-responsive :aspect-ratio="4/3">

            <video
                controls
                :src="video.videoUrl"
                :poster="video.thumbnailUrl"
                preload="none"
                autostart="false" />
            <!-- v-img
              class="white--text align-end"
              :src="video.thumbnailUrl"
              >
              <v-card-title>Video title</v-card-title>
            </v-img -->
        </v-responsive>

        <v-card-subtitle class="pb-0">
          {{video.question}}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <!-- div>{{video}}</div-->
          <div>Stage: {{video.stage}}</div>
          <div>Focus on: {{video.focuson}}</div>
          <div>Mood: {{video.mood}}</div>
          <div>Years: {{video.yearfrom}}-{{video.yearto}}</div>
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

  props: {
      video: {
          type: Object,
          default: ()=>({})
      }
  },
  data: () => ({
      thumb
  }),
};
</script>

<style scoped>
    video {
        width:100%;
        height:100%;
    }
</style>
