import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const instance = axios.create({
  baseURL: "https://5656-93-84-12-81.ngrok-free.app/api",
});

const storeData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    instance.defaults.headers.common["Authorization"] = token;
  } catch (e) {
    console.log(e);
  }
};

storeData();
export default instance;
