import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const instance = axios.create({
  baseURL: "https://d9d5-46-216-228-51.ngrok-free.app/api",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
