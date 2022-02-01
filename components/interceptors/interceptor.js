import axios from "axios";
import baseURL from "./baseurl";

// const baseURL = process.env.NODE_ENV
// ? ''
// : 'http://localhost:4000/';

// const baseURL = 'http://localhost:5000/'
const token = JSON.parse(localStorage.getItem("auth"));

const authAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authentication:
      "eyJhbGciOiJIUzI1NiJ9.MQ.euO4e3XdX64mEzZNtAy7fScBI3g2-Pw7k0he3M0dz_g",
  },
});

export default authAxios;
