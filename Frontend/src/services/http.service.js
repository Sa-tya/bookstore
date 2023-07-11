import httpCommon from "./http.common";

class HttpService {
    get(apiName) {
        return httpCommon.get(apiName);
    }
    getById(ApiName, id) {
        return httpCommon.post(`${ApiName}/${id}`);
    }

    post(ApiName, data) {
        return httpCommon.post(ApiName, data);
    }

    update(ApiName, id, data) {
        return httpCommon.put(`${ApiName}/${id}`, data);
    }

    delete(ApiName){
        return httpCommon.delete(ApiName);
    }
}

export default new HttpService()