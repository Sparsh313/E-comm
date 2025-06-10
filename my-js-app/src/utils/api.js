// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseURL = "http://<your-ip>:5000/api"; // use your local IP or hosted link

// const api = axios.create({
//   baseURL,
// });

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

export const loginUser = async (email, password) => {
  // Fake login logic
  if (email === "sparsh@gmail.com" && password === "hello") {
    return { success: true };
  } else {
    return { success: false, message: "Invalid " };
  }
};
