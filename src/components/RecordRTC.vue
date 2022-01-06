<template>
<v-panel>

<v-dialog v-model="display">
    <v-card>
        <v-card-title>Video record</v-card-title>
        <v-card-text>
            <div class="videoRec text-xs-center">
                <input type="hidden" ref="video_h" name="video" v-model="videoModel" />
                <video ref="video" class="video" :poster="poster" controls></video>
                <div class="video-controllers"></div>

                <v-btn @click="startRecording"><v-icon>play_arrow</v-icon></v-btn>
                <v-btn @click="stopRecording"><v-icon>pause</v-icon></v-btn>
                <v-btn @click="download"><v-icon>get_app</v-icon></v-btn>
            </div>
        </v-card-text>
    </v-card>
</v-dialog>
    
</v-panel>
</template>

<script>

let RecordRTC = require('recordrtc');
// import {Api} from '@/utilities/api';

export default {

    name: 'RecordRTC',

    props: [''],

    data: function(){
        return {
            poster: "/static/video-camera.png",
            videoModel: "",
            display: true
        }
    },
    
    methods: {
    
        successCallback(stream) {
            var options = {
                mimeType: 'video/webm;codecs=vp9,opus',
                bitsPerSecond: 8000000,
                timeSlice:1000,
            };
            this.stream = stream;
            this.recordRTC = RecordRTC(stream, options);
            this.recordRTC.startRecording();
            let video = this.$refs.video;
            video.src = window.URL.createObjectURL(stream);
            //this.toggleControls();
        },

        errorCallback() {
            //handle error here
        },
        
        processVideo(audioVideoWebMURL) {
            console.log(audioVideoWebMURL);
            // let video = this.$refs.video;
            // let recordRTC = this.recordRTC;
            // video.src = audioVideoWebMURL;
            // this.toggleControls();
            // var recordedBlob = recordRTC.getBlob();
            // recordRTC.getDataURL(function (dataURL) { });
        },

        startRecording() {
            this.poster="";
            let mediaConstraints = {
                video: {
                    mandatory: {
                        minWidth: 700,
                        minHeight: 720
                    }
                }, audio: true
            };
            
            navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
        },

        stopRecording() {
            this.poster="";
            let recordRTC = this.recordRTC;
            recordRTC.stopRecording(this.processVideo.bind(this));
            let stream = this.stream;
            stream.getAudioTracks().forEach(track => track.stop());
            stream.getVideoTracks().forEach(track => track.stop());
            
        },

        download(video="video") {
            console.log(video);
            this.recordRTC.save('video.webm');
        }
    },
        
    mounted: function () {
       let video = this.$refs.video;
       video.muted = false;
       video.controls = true;
       video.autoplay = false;
    }
    
}
</script>

<style scoped>

    .video {
      box-shadow: 1px 6px 10px 2px rgba(35, 35, 35, 0.62);
      height: 400px;
      max-height: 800px;
      object-fit: none;
    }
    
</style>
