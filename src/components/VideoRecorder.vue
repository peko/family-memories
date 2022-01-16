<template>
  <v-container >
    <v-row align="center" justify="center">
      <v-col align="center">
        <video ref="video" controls :poster="poster">
        </video>
      </v-col>
      <v-col v-show="false" align="center">
        <canvas ref="canvas"/>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center">
      <v-col align="center">
          <v-btn v-if="prerecord" x-large>{{timer? timer : 'Go!'}}</v-btn>
          <v-btn v-if="!recording && !prerecord" x-large @click="prepareRecord"><v-icon left color="primary">mdi-record</v-icon>start record</v-btn>
          <v-btn v-if="recording" color="primary" x-large @click="stopRecording" :loading="uploading"><v-icon left>mdi-stop</v-icon>stop recording {{Math.floor(stop_timer/60)}}:{{('0'+stop_timer%60).substr(-2)}}</v-btn>
          <template v-if="false">
              <v-btn class="ml-4" @click="download"><v-icon left>mdi-download</v-icon>download</v-btn>
          </template>
          <v-btn v-if="false" color="primary" class="ml-4" disabled><v-icon left>mdi-upload</v-icon>upload file</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { userUid, addVideo } from "../firebase"
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import Recorder from "recordrtc";
import poster from "../assets/images/video-camera.png";

let recorder = null;

export default {

    name: 'VideoRecorder',

    components: {
    },

    props: [
        "question",
        "stage",
        "focuson",
        "mood",
        "yearfrom",
        "yearto",
    ],
    
    data: () => ({
        poster,
        recorded: false,
        recording: false,
        prerecord: false,
        timer: 3,
        stop_timer: 60*3,
        uploading: false,
    }),

    methods: {
    

        errorCallback() {
            //handle error here
        },
        
        processVideo(videoURL) {
            console.log(videoURL);

            // let video = this.$refs.video;
            // video.src = video.srcObject = null;
            // video.muted = false;
            // video.volume = 1;
            // video.src = videoURL;
            
            this.uploadVideo(recorder.getBlob());
            this.destroyRecorder();
            
            // console.log('BLOB', recorder.getBlob())
            // var recordedBlob = recorder.getBlob();
            // recorder.getDataURL(function (dataURL) { });
        },
        
        destroyRecorder() {
            // recorder.destroy();
            // recorder = null;
        },
        
        startCamera() {
            let mediaConstraints = {
                video: {
                    mandatory: {
                        // minWidth: 640,
                        // minHeight: 480,
                        maxWidth: 1280,
                        maxHeight: 720,
                    }
                }, audio: true
            };
            
            navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
        },

        stopCamera() {
            // Stop stream
            this.stream.getAudioTracks().forEach(track => track.stop());
            this.stream.getVideoTracks().forEach(track => track.stop());
        },

        successCallback(stream) {

            let video = this.$refs.video;
            video.srcObject = stream;
            video.volume = 0;
            video.muted = true;
            video.autoplay = true;
            video.playsinline = true;
            
            this.stream = stream;
        },

        prepareRecord() {
            this.prerecord = true;
            this.timer = 3;
            let int = setInterval(()=>{
                this.timer -= 1;
                if(this.timer<0) {
                    clearInterval(int);
                    this.prerecord = false;
                    this.startRecording();
                }
            }, 1200)
        },
        
        startRecording() {
            const uid = userUid();
            this.filename = `${uid}/${+new Date}`;
            this.recording = true;
            this.prerecord = false;
            this.poster="";
            var options = {
                mimeType: 'video/webm;codecs=vp9,opus',
                //videoBitsPerSecond: 51200000,
                videoBitsPerSecond: 5120000,
                audioBitsPerSecond: 128000,
                timeSlice:1000,
            };

            recorder = Recorder(this.stream, options);
            recorder.startRecording();
            //this.toggleControls();

            setTimeout(this.makeScreenshot, 3000);
            this.stop_timer = 60*3;
            let countdown = ()=> {
                if (!this.recording) return;
                if(--this.stop_timer>0) {
                    setTimeout(countdown, 1000)
                } else {
                    this.stopRecording();
                }
            }
            countdown();
        },
        
        stopRecording() {
            // this.poster = "";
            recorder.stopRecording(this.processVideo.bind(this));
            // Stop stream
            // this.stream.getAudioTracks().forEach(track => track.stop());
            // this.stream.getVideoTracks().forEach(track => track.stop());
        },

        download() {
            recorder.save(`${this.filename}.webm`);
        },

        uploadVideo(blob) {
        
            console.log("Upload Video");
            this.uploading = true;

            const storage = getStorage();
            const storageRef = ref(storage, `${this.filename}.webm`);

            uploadBytes(storageRef, blob)
            .then((snapshot) => {
                console.log("Video uploaded")
                this.uploading = false;
                this.recording = false;
                this.recorded  = true;
                return getDownloadURL(snapshot.ref)
            }).then((videoUrl)=>{
                console.log(videoUrl);
                return addVideo({
                    id: this.filename.split('/')[1],
                    thumbnailUrl: this.thumbnailUrl,
                    videoUrl: videoUrl,
                    question: this.question,
                    stage:    this.stage,
                    focuson:  this.focuson,
                    mood:     this.mood,
                    yearfrom: this.yearfrom,
                    yearto:   this.yearto,
                })
            });

        },

        makeScreenshot() {
            let video = this.$refs.video;
            let cvs = this.$refs.canvas;
            cvs.width = video.videoWidth;
            cvs.height = video.videoHeight;
            let ctx = cvs.getContext("2d");
            ctx.drawImage(video, 0, 0, cvs.width, cvs.height);
            this.uploadScreenshot(cvs);
        },

        uploadScreenshot(cvs) {
            console.log("Upload thumbnail");
            cvs.toBlob((blob)=>{
                let storage = getStorage();
                let storageRef = ref(storage, `${this.filename}.png`);
                uploadBytes(storageRef, blob).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url)=>this.thumbnailUrl=url);
                }, "image/png");
            });
        },
        
    },
        
    activated() {
       console.log("activated")
       let video = this.$refs.video;
       video.muted = false;
       video.controls = true;
       video.autoplay = false;
       this.startCamera();
    },
    
    deactivated() {
        console.log("deactivated")
        if(this.recording) this.stopRecording();
        this.stopCamera();
    },
    /* 
    watch: {
       '$route'(before, after) {
           console.log(before,after);
       }
    }
    */
};

</script>

<style scoped>
    video {
        width:100%;
        max-width:640px;
    }
    canvas {
        width:100%;
    }
</style>
