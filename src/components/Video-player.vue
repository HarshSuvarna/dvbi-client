<template>
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
</script>
