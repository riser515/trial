// import Axios from 'axios';
const Axios = require('axios');
// import { CONFIG } from './../config/config.env';

class ApiRequestService {
  constructor(baseURL) {
    // this.baseURL = baseURL || CONFIG.PUBLIC_URL;
    this.baseURL = "https://waba-sandbox.360dialog.io/";

    this.axiosService = Axios.create({
      baseURL: this.baseURL,
      // timeout: 60000,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });
  }

  getApi(path, headers = {}, params = {}) {
    return new Promise((resolve) => {
      this.axiosService
        .get(path, {
          headers,
          params,
        })
        .then((req, res) => {
          resolve({
            // user_input: req.message,
            message: res.message,
            status: !!res.status,
            statusText: 'Success',
            data: res.data,
          });
        })
        .catch((error) => {
          console.table(error.response);
          resolve({
            message: error?.response?.data?.message,
            status: false,            
            statusText: 'Error',
          });
        })
        .then(() => {
          // here the code which should be excuted always
        });
    });
  }

  // postApi(path, headers = {}, apiData) {
  postApi(path, headers = {}, apiData) {
    return new Promise((resolve, reject) => {
      this.axiosService
        .post(path, apiData, {
          headers,
        })
        .then((res) => {
          // console.log("POST API Response: ", res);
          resolve({
            message: res.data.message,
            // status: true,
            status: res.status,
            data: res.data,
          });
        })
        .catch((error) => {
          console.log("POST API Error: ", error.response.data);
          reject({
            message: error?.response?.data?.message
              ? error?.response?.data?.message
              : error?.response?.data,
            status: false,
          });
        })
        .then(() => {
          // here the code which should be excuted always
        });
    });
  }

  deleteApi(path, apiData) {
    return new Promise((resolve) => {
      this.axiosService
        .delete(path, apiData)
        .then((res) => {
          resolve({
            message: res.data.message,
            status: res.data.status,
            statusText: 'Success',
            data: res.data.data,
          });
        })
        .catch((error) => {
          resolve({
            message: error?.response?.data?.message,
            status: false,
            statusText: 'Error',
          });
        })
        .then(() => {
          // here the code which should be excuted always
        });
    });
  }

  putApi(path, apiData, headers = {}) {
    return new Promise((resolve) => {
      this.axiosService
        .put(path, apiData, {
          headers,
        })
        .then((res) => {
          resolve({
            message: res.data.message,
            status: res.data.status,
            statusText: 'Success',
            data: res.data.data,
          });
        })
        .catch((error) => {
          resolve({
            message: error?.response?.data?.message,
            status: false,
            statusText: 'Error',
          });
        })
        .then(() => {
          // here the code which should be excuted always
        });
    });
  }
}

// export default ApiRequestService;
module.exports = ApiRequestService