import {default as requestToAPI} from './request-to-api.mjs';

export default async function (message, callValue, isDm, userId, serverId, response) {
    const requestData = {
        uri: `${process.env.API_SERVER_URL}/log/insert`,
        method: "POST",
        body: {
            query: message,
            callValue: callValue,
            isDm: isDm,
            userId: userId,
            serverId: serverId,
            response: response
        },
        json: true
    }

    requestToAPI(requestData).catch(function(err) {
        console.log("ERROR OCCURRED.");
        console.log("LOG INSERT FAILED");
        console.error(err);
    });
}