import axios from 'axios';
import {AUTH_TOKEN} from '../constant'

 const api = axios.create({
    baseURL: 'https://api.github.com',
});

 const apiSearch = (limit: string, username: string) => {
    return axios.create({
        baseURL: `https://api.github.com/search/users?per_page=${limit}&q=${username}`,
        headers: {
            Authorization: AUTH_TOKEN
        }
    })
};

 const detailUser = (uName: string) => {
    return axios.create({
        baseURL: `https://api.github.com/users/${uName}`,
        headers: {
            Authorization: AUTH_TOKEN
        }
    })
}

const detailRepo = (uName: string) => {
    return axios.create({
        baseURL: `https://api.github.com/users/${uName}/repos`,
        headers: {
            Authorization: AUTH_TOKEN
        }
    })
}

export {
    api, apiSearch, detailUser, detailRepo
}
