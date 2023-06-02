import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:6001/api" });

export default client;
