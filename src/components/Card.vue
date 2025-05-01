<script setup>
import "../assets/card.css";
import { recordProgram } from "../service/dvbi.service";

const props = defineProps(["program", "manifest"]);
const programId = props.program["@programId"];
const imageURL =
  props.program.BasicDescription.RelatedMaterial.MediaLocator.MediaUri["#text"];
const programInfo = props?.program?.BasicDescription;
const loadTitle = (t) => (Array.isArray(t) ? getEnglishTitle(t) : t["#text"]);
const startTime = props?.program?.schedule;
const duration = props?.program?.duration?.slice(2);

const getEnglishTitle = (t) =>
  t.find((l) => l["@xml:lang"] == undefined || l["@xml:lang"] === "en")[
    "#text"
  ];

const getStartTime = (time) => {
  const hour = time?.slice(14, 16);
  const min = time?.slice(17, 19);
  return `${hour}:${min}`;
};

const downloadProgram = async () => {
  if (props.manifest.length) {
    const reponse = await recordProgram({
      programId,
      programTitle: loadTitle(programInfo?.Title),
      schedule: props.program.schedule,
      duration: props.program.duration,
      manifest: props.manifest,
    });
    console.log("reponse: ", reponse);
  } else {
    alert("This service doesn't have a manifest");
    console.log("This service doesn't have a manifest");
  }
};
</script>

<template>
  <div class="card center">
    <img class="program-image" :src="imageURL" alt="ProgramThumbnail" />
    <div>
      <p>{{ getStartTime(startTime) }}</p>
      <p>{{ duration }}</p>
    </div>
    <button @click="downloadProgram()">Record show</button>
    <p>{{ loadTitle(programInfo?.Title) }}</p>
  </div>
</template>
