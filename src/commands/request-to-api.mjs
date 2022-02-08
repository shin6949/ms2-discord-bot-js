import request from "request";

// 공통 Header Data
const headersData = {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json'
}

export default function (requestData) {
    // 공통 Header 데이터 추가
    requestData = Object.assign(requestData, {headers: headersData});

    return new Promise(function (resolve, reject) {
        request(requestData, function (error, response) {
            if (!error && response.statusCode === 200) {
                resolve(response);
            } else {
                reject(new Error("API SERVER ERROR OCCURRED."))
            }
        });
    });
}