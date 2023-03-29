import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:6004/api" });

export default client;
