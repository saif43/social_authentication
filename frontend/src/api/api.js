import axios from "axios";

//ref: https://stackoverflow.com/a/33507729/8666088
export default axios.create({
  baseURL: "http://127.0.0.1:8000/",
});
