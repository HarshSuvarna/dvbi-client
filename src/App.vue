<script setup>
import { ref, onMounted, toRaw } from "vue";
import { getServices, getEpgData } from "./service/dvbi.service";
// import dashjs from "dashjs";
import { MediaPlayer } from "https://cdn.dashjs.org/v5.0.0/modern/esm/dash.all.min.js";
import ShowRail from "./components/Show-list.vue";
import { ssrLooseEqual } from "vue/server-renderer";
// const channels = ref([]);
// const schedule = ref([]);
// const seletedStreamUrl = ref("");
const videoPlayer = ref(null);
let channels = ref([]);
const serviceJson = ref(null);
let playVideo = ref(false);

const fetchData = async () => {
  const res = await getServices();
  serviceJson.value = res;
  channels.value = res.ServiceList.Service;
};

const toggleVideoPlayer = () => {
  playVideo.value = !playVideo.value;
};

const getSchedule = (channel) => {
  channel = toRaw(channel);
  const cgs = toRaw(serviceJson.value)[channel?.ContentGuideServiceRef];
  return cgs
    ? cgs.TVAMain?.ProgramDescription?.ProgramLocationTable?.Schedule
        ?.ScheduleEvent
    : cgs;
};

const getProgramInfo = (channel) => {
  channel = toRaw(channel);
  const cgs = toRaw(serviceJson.value)[channel?.ContentGuideServiceRef];
  return cgs
    ? cgs.TVAMain?.ProgramDescription?.ProgramInformationTable
        ?.ProgramInformation
    : cgs;
};

const displayChannelName = (channel) =>
  Array.isArray(channel.ServiceName)
    ? channel.ServiceName.find((n) => n["@xml:lang"] === "en")?.["#text"] ||
      channel.ServiceName[0]["#text"]
    : channel.ServiceName;

const playChannel = (channel) => {
  toggleVideoPlayer();
  const instance = Array.isArray(channel.ServiceInstance)
    ? channel.ServiceInstance[0]
    : channel.ServiceInstance;

  const streamUrl =
    instance?.DASHDeliveryParameters.UriBasedLocation["dvbi-types:URI"];

  if (streamUrl) {
    // const player = dashjs.MediaPlayer().create();
    const player = MediaPlayer().create();
    player.initialize(videoPlayer.value, streamUrl, true);
  } else {
    alert("No Dash Stream found for this channel");
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div>
    <h1>DVB-I Channel List</h1>
    <div
      v-for="channel in channels"
      :key="channel.UniqueIdentifier"
      class="channel"
    >
      <div class="channel-name-button-container">
        <h2>{{ displayChannelName(channel) }}</h2>
        <button @click="playChannel(channel)">Tune to channel</button>
      </div>
      <ShowRail
        v-if="getProgramInfo(channel) && getSchedule(channel)"
        :programDescription="getProgramInfo(channel)"
        :schedule="getSchedule(channel)"
      />
      <div v-else class="no-epg-message center">
        <h4>This is a test stream. No EPG available for this service.</h4>
      </div>
    </div>
    <div v-if="playVideo">
    </div>
      <video
        v-show="playVideo"
        ref="videoPlayer"
        controls
        style="margin-top: 20px; width: 640px; height: 360px"
        class="video-player"
      ></video>
    <div
      v-if="playVideo"
      @click="toggleVideoPlayer()"
      class="dark-background"
    ></div>
  </div>
</template>
