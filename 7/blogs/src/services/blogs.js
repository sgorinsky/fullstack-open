import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs'

const create = async (newObject, token) => {
    const config = {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data.sort((first, second) => first.likes > second.likes ? -1 : 1);
    
}

const remove = async (id, token) => {
    const config = {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
}

const update = async (id, token, newObject) => {
    const config = {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.data;
}

export default { getAll, create, update, remove };