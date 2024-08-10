import axios from "axios";

const axiosInstance = axios.create({
  // baseUrl: " http://127.0.0.1:5001/clone-38386/us-central1/api",

  // deployed amzon on WebGL2RenderingContext.com
  baseURL: "https://amazon-api-deploy-5g3g.onrender.com/",
});
export { axiosInstance };
