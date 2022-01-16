<template>
  <v-container >
    <v-row>
      <v-col class="text-h3 primary-text mt-10">
        {{uname}}: Create a memory
      </v-col> 
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="1">
            <v-btn icon color="primary" @click="prevQuestion">
              <v-icon> mdi-arrow-left </v-icon>
            </v-btn>
        </v-col>

        <v-col cols="8" class="text-center" >
            <span class="text-h4" style="color:black !important;">{{question}}</span>
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

    <!--
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
    -->

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
`Describe yourself in 6 words.
How did you choose what to do in life?
What’s your hobby?
What is your favourite book?
What’s your favourite movie?
Who is your favourite singer?
What is your favourite music style?
What’s your favorite food?
What does your ideal day look like?
How do you like to spend your vacation?
What was your Mom like?
What was your Dad like?
What was your Grandma like?
What was your Grandpa like?
Who is your best friend and why?
Who was your best boss and why?
Who was your best mentor and why?
Who is the family member the closest to you?
Describe your family in 6 words.
How would you describe your relationship with your kids?
What was the happiest time of your life and why?
What were the events that were pivotal in your life?
What was the best (one of the best) day of your life?
What was the toughest period of your life?
When you think about your childhood, what are the first things that come to your mind?
Who was the first person you fell in love with?
How did you decide to get married?
Tell me about your wedding day?
What was your best workplace and why?
How did you feel when your baby was born?`.split('\n');
let qid=0, ql = questions.length;

export default {
  name: 'CreateMemory',

  components: {
      VideoRecorder
  },

  data: () => ({
     items1: [
         "Birth",
         "School",
         "University",
         "Wedding"
     ],
     stage: "Birth",
     question: questions[qid],
     items2: [
         "Me",
         "Family Member 1",
         "Family Member 2",
         "Label"
     ],
     focuson: "Me",
     
     items3: [
         "Happy",
         "Neutral",
         "Excited",
         "Sad",
     ],
     mood: "Happy",
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
