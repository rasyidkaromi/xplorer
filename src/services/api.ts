import axios from 'axios';
import { AUTH_TOKEN } from '../constant'

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
            // Authorization: "Bearer "+AUTH_TOKEN,
        }
    })
}

const detailRepo = (uName: string) => {
    return axios.create({
        baseURL: `https://api.github.com/users/${uName}/repos`,
        headers: {
            // Authorization: "Bearer "+AUTH_TOKEN,
        }
    })
}

const detailRepoMultiple = async (uName: string, page: number) => {
    let pagesUrl = createPages(uName, page)
    const requests = pagesUrl.map((url) => axios.get(url));
    return axios.all(requests)
}

const createPages = (uName: string, page: number)=> {
    let a = [];
    for (var i = 0; i < page; i++) {
        a.push(`https://api.github.com/users/${uName}/repos?per_page=100&page=${i+1}`);
    }
    return a;
}

export {
    api, apiSearch, detailUser, detailRepo, detailRepoMultiple
}
