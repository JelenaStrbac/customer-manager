import axios from "axios";

const instance = axios.create({
  baseURL: "https://customer-manager-4fb6c.firebaseio.com/",
});

export default instance;
