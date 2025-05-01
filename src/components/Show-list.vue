<script setup>
import { ref, onMounted, toRef, toRaw } from "vue";
import "../assets/card.css";
import Card from "../components/Card.vue";

const props = defineProps(["programDescription", "schedule", "manifest"]);
let programs = props.programDescription;
let schedule = props.schedule;
for (let i = 0; i < programs.length; i++) {
  programs[i]["schedule"] = schedule[i]?.PublishedStartTime;
  programs[i]["duration"] = schedule[i]?.PublishedDuration;
}
</script>

<template>
  <div class="show-rail">
    <Card v-for="item in programs" :program="item" :manifest="props?.manifest" />
  </div>
</template>
