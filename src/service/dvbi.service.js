import axios from "../common/axios.intercepter";

export const getServices = () => {
  return axios.get("/user/get-dvbi-services");
};

export const getEpgData = () => {
  return axios.get("/user/get-epg-data");
};

export const recordProgram = (programInfo) => {
  return axios.post("/record-dash", programInfo);
};
