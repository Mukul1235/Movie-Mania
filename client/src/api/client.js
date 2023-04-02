import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:6003/api" });

export default client;
