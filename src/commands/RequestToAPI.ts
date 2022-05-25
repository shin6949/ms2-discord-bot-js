import request from "request";
import {apiRequestForm} from "../constants";

type header = {
  Accept: string,
  "Accept-Encoding": string,
  "Content-Type": string,
}

// 공통 Header Data
const headersData: header = {
  Accept: "application/json",
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Type": "application/json",
};

const combinedData = (requestBody: apiRequestForm, requestHeaders: header) => {
  return Object.assign(requestBody, { headers: requestHeaders });
}

export default function (body: apiRequestForm) {
  return new Promise(function (resolve, reject) {
    request(combinedData(body, headersData), function (error: Error, response) {
      if (!error && response.statusCode === 200) {
        resolve(response);
      } else {
        reject(new Error("API SERVER ERROR OCCURRED."));
      }
    });
  });
}
