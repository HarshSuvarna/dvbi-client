<!-- <template>
  <div class="dark-background"></div>
  <video
    ref="videoPlayer"
    controls
    autoplay
    style="margin-top: 20px; width: 640px; height: 360px"
    class="video-player"
  ></video>
</template>

<script setup>
import "../assets/card.css";
const props = defineProps(["videoPlayer"]);
</script> -->

<!-- src/components/VideoPlayer.vue -->
<template>
  <div>
    <video
      ref="video_player"
      class="video-js vjs-default-skin"
      controls
      autoplay
      muted
      playsinline
      preload="auto"
      width="640"
      height="360"
    ></video>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const props = defineProps({
  src: { type: String, required: true },
})

const video_player = ref(null)
let player = null

onMounted(() => {
  player = videojs(video_player.value, {
    sources: [{
      src: props.src,
      type: 'application/x-mpegURL'
    }],
    liveui: true
  })
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
})
</script>

<style scoped>
.video-js {
  width: 100%;
  height: auto;
}
</style>
