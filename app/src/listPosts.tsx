const API_URL = 'http://localhost:4000'

export async function listPosts(){
    const response = await fetch(`${API_URL}/api/`)
    return response.json()

}