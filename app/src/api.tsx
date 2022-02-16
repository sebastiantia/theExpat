
const API_URL = 'http://localhost:4000'

import axios from 'axios'
import { Popup } from 'react-map-gl'
import { createContext } from 'vm'

import { Post} from './types/Post'
import { User} from './types/User'


export async function listPosts(){
    const response = await fetch(`${API_URL}/api/post/`)
    return response.json()

}

export async function createPost(entry :Post){
    const response = await fetch(`${API_URL}/api/post/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
    return response.json()
}

export const login = async ({username, password} : User) => {
    const data = await axios.post(`${API_URL}/api/user/login`, {
        username: username,
        password: password
    }, {
        withCredentials: true
    })
    return data
}

export const me = async () => {
    const {data} = await axios.get(`${API_URL}/api/user/me`, {
        withCredentials: true
    })
    return data;
}

export const register = async ({username, password} : User) => {
    const {data} = await axios.post(`${API_URL}/api/user/register`, {
        username: username,
        password: password
    }, {
        withCredentials: true
    })
    return data
}

export const logout = async () => {
    const {data} = await axios.post(`${API_URL}/api/user/logout`, null , {
        withCredentials: true,
    } )

    return data
}