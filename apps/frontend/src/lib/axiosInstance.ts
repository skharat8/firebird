import axios from "axios";

const { VITE_SERVER_ENDPOINT: BASE_URL } = import.meta.env;

function createAxiosInstance() {
  const instance = axios.create({ baseURL: `${BASE_URL}` });
  instance.defaults.withCredentials = true;

  return instance;
}

export default createAxiosInstance;
