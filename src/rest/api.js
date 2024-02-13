import axios from 'axios';


const clientId = '31550986';

const baseURL = "/api";

let token = ''


const api = axios.create({
    baseURL
});

api.interceptors.request.use( (config) => {
    config.headers.Authorization = `Bearer ${token}`
    config.headers["Content-Type"] = 'application/json'
    return config
}, (error) => {
    return Promise.reject(error)
})

export async function getToken() {
    const {data} = await api.get('http://localhost:5173/token', {
        headers: {
            "X-Client-Id": clientId
        }
    })
    token = data.access_token
}

export async function useApi(entityType) {
    try {
        await api.post(`/v4/${entityType}`, {name: [entityType]});
    } catch (e) {
        throw e
    }
}

export async function getData(){
    try {
        const {data} =  await api.get(`/v4/events`)
        return data._embedded.events
    } catch (e) {
        console.log(e)
    }

}


