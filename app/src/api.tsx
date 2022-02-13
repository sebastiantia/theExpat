const API_URL = 'http://localhost:4000'

export async function listPosts(){
    const response = await fetch(`${API_URL}/api/`)
    return response.json()

}

export async function createPost(entry){
    const response = await fetch(`${API_URL}/api/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(entry)
    })
    return response.json()
}