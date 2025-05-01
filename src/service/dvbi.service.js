import axios from "../common/axios.intercepter";

export const getServices = () => {
  return axios.get("/service/get-dvbi-services");
};

export const recordProgram = (programInfo) => {
  return axios.post("/service/record-service", programInfo);
};
