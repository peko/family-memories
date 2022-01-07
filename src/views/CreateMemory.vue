<template>
  <v-container >
    <v-row>
      <v-col class="text-h3 primary-text mt-10">
        {{uname}}: Create memory
      </v-col> 
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="1">
            <v-btn icon color="primary" @click="prevQuestion">
              <v-icon> mdi-arrow-left </v-icon>
            </v-btn>
        </v-col>

        <v-col cols="8" class="text-center" >
            {{question}}
        </v-col>
        <v-col cols="1">
            <v-btn icon color="primary" @click="nextQuestion">
              <v-icon> mdi-arrow-right </v-icon>
            </v-btn>
        </v-col>
        <v-col cols="2">
           <v-btn color="primary">Pick up a question</v-btn>
        </v-col>
    </v-row>
    <v-row>
        
        <v-col>
            <v-combobox
                v-model="stage"
                :items="items1"
                label="Stage"
                outlined
                dense
            />
        </v-col>

        <v-col>
            <v-combobox
                v-model="focuson"
                :items="items2"
                label="Focus on"
                outlined
                dense
            />
        </v-col>

        <v-col>
            <v-combobox
                v-model="mood"
                :items="items3"
                label="Mood"
                outlined
                dense
            />
        </v-col>

        <v-col cols="2">
          <v-text-field
              v-model="yearfrom"
              hide-details
              dense
              outlined
              label="year from"/>
        </v-col>
        <v-col cols="2">
          <v-text-field
              v-model="yearto"
              hide-details
              dense
              outlined
              label="to"/>
        </v-col>
    </v-row>
     <v-tabs
        fixed-tabs
      >
        <v-tab>
          Video
        </v-tab>
        <v-tab disabled>
            Audio
        </v-tab>
        <v-tab disabled>
            Text
        </v-tab>
      </v-tabs>
      <v-row>
          <v-col>
              <VideoRecorder
                  :question="question"
                  :stage="stage"
                  :focuson="focuson"
                  :mood="mood"
                  :yearfrom="yearfrom"
                  :yearto="yearto"/>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>

import {userName} from "../firebase"
import VideoRecorder from "../components/VideoRecorder"

let questions = 
`What is one of the strangest things that has ever happened to you?
Another question #2?
Another question #3?`.split('\n');
let qid=0, ql = questions.length;

export default {
  name: 'CreateMemory',

  components: {
      VideoRecorder
  },

  data: () => ({
     items1: [
         "Stage",
         "Birth",
         "School",
         "Univercity",
         "Wedding"
     ],
     stage: "Stage",
     question: questions[qid],
     items2: [
         "Focus on",
         "Me",
         "Family Member 1",
         "Family Member 2",
         "Label"
     ],
     focuson: "Focus on",
     
     items3: [
         "Mood",
         "Happy",
         "Neutral",
         "Excited",
         "Sad",
     ],
     mood: "Mood",
     yearfrom:"",
     yearto:""
  }),
  methods: {
     nextQuestion() {
         qid = (qid+1) % ql;
         this.question = questions[qid];
     },
     prevQuestion() {
         qid = (qid+ql-1) % ql;
         this.question = questions[qid]; 
     }
  },
  computed: {
     uname: ()=>userName()
  }
  
};
</script>

<style scoped>
</style>
