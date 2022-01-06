<template>
  <v-container >
    <v-row align="center" justify="center">
      <v-col align="center">
        <video ref="video" controls :poster="poster"/>
      </v-col>
      <v-col v-show="false" align="center">
        <canvas ref="canvas"/>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center">
      <v-col align="center">
          <v-btn v-if="!recording" @click="startRecording"><v-icon left color="primary">mdi-record</v-icon>start record</v-btn>
          <v-btn v-if="recording" color="primary" @click="stopRecording" :loading="uploading"><v-icon left>mdi-stop</v-icon>stop recording</v-btn>
          <template v-if="recorded">
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

    data: () => ({
        poster,
        recorded: false,
        recording: false,
        uploading: false,
    }),

    methods: {
    
        successCallback(stream) {

            let video = this.$refs.video;
            video.srcObject = stream;
            video.volume = 0;
            video.muted = true;
            video.autoplay = true;
            video.playsinline = true;

            var options = {
                mimeType: 'video/webm;codecs=vp9,opus',
                bitsPerSecond: 128000,
                timeSlice:1000,
            };
            
            this.stream = stream;
            recorder = Recorder(stream, options);
            recorder.startRecording();
            //this.toggleControls();
        },

        errorCallback() {
            //handle error here
        },
        
        processVideo(videoURL) {
            console.log(videoURL);

            let video = this.$refs.video;
            video.src = video.srcObject = null;
            video.muted = false;
            video.volume = 1;
            video.src = videoURL;
            
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

        startRecording() {
            this.recording = true;
            this.poster="";
            let mediaConstraints = {
                video: {
                    mandatory: {
                        minWidth: 640,
                        minHeight: 480
                    }
                }, audio: true
            };
            const uid = userUid();
            this.filename = `${uid}/${+new Date}`;
            setTimeout(this.makeScreenshot, 5000);
            navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
        },

        stopRecording() {
        
            this.poster = "";
            
            recorder.stopRecording(this.processVideo.bind(this));
            this.stream.getAudioTracks().forEach(track => track.stop());
            this.stream.getVideoTracks().forEach(track => track.stop());
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
                this.uploading = false;
                this.recording = false;
                this.recorded = true;
                console.log('Uploaded a blob or file!', snapshot);
                return getDownloadURL(snapshot.ref)
            }).then((videoUrl)=>{
                console.log("Video URL", videoUrl);
                return addVideo({
                    id: this.filename.split('/')[1],
                    thumbnailUrl: this.thumbnailUrl,
                    videoUrl: videoUrl
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
        }
        
    },
        
    mounted: function () {
       let video = this.$refs.video;
       video.muted = false;
       video.controls = true;
       video.autoplay = false;
    }};

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
