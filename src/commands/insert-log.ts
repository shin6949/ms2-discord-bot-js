import {default as requestToAPI} from './request-to-api';

export default async function (log) {
    const requestData = {
        uri: `${process.env.API_SERVER_URL}/log/insert`,
        method: "POST",
        body: {
            query: log.query,
            callValue: log.callValue,
            isDm: log.isDm,
            userId: log.userId,
            serverId: log.serverId,
            response: log.response
        },
        json: true
    }

    requestToAPI(requestData).then(function () {
        console.log("LOG INSERT FINISHED");
    }).catch(err => {
        console.log("LOG INSERT FAILED");
        console.error(err);
    });
}

export class Log {
    constructor(query, callValue, isDm, userId, serverId, response) {
        this._query = query;
        this._callValue = callValue;
        this._isDm = isDm;
        this._userId = userId;
        this._serverId = serverId;
        this._response = response;
    }

    get query() {
        return this._query;
    }

    set query(value) {
        this._query = value;
    }

    get callValue() {
        return this._callValue;
    }

    set callValue(value) {
        this._callValue = value;
    }

    get isDm() {
        return this._isDm;
    }

    set isDm(value) {
        this._isDm = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get serverId() {
        return this._serverId;
    }

    set serverId(value) {
        this._serverId = value;
    }

    get response() {
        return this._response;
    }

    set response(value) {
        this._response = value;
    }
}