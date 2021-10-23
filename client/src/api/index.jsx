import axios from 'axios'

function httpRequest(method, url, request) {
    return axios[method](url, request)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error))
}

export default {
    get(url, request) {
        return httpRequest('get', url, request)
    },

    delete(url, request) {
        return httpRequest('delete', url, request)
    },

    post(url, request) {
        return httpRequest('post', url, request)
    },

    put(url, request) {
        return httpRequest('put', url, request)
    },
}

//export default Request