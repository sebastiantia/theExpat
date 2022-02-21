
const API_URL = 'http://localhost:4000'

import axios from 'axios'
import { Popup } from 'react-map-gl'
import { createContext } from 'vm'

import { Post} from './types/Post'
import { User} from './types/User'

export async function getUserPosts(){
    const data = await axios.get(`${API_URL}/api/post/get_user_posts`, {
        withCredentials: true
    })
    return data.data
}


export async function listPosts(){
    const response = await axios.get(`${API_URL}/api/post/`)
    return response.data

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

export const updatePost = async ({id, title, description, visitDate, image}) => {
    const data = await axios.post(`${API_URL}/api/post/update`, {
        id: id,
        title: title,
        description: description,
        visitDate: visitDate,
        image: image
    })
    return data
}

export const singlePost = async ({ id }) => {
    
    const data = await axios.post(`${API_URL}/api/post/singlepost`,{
        id: id
    })
    console.log("DAATA ", data)
    return data.data
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

export const postDelete = async ({id}) => {

    const data = await axios.post(`${API_URL}/api/post/delete`, {
        id: id
    })
    
    return data
    }
