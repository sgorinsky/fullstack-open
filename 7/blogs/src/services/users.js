import axios from 'axios';
const baseUrl = '/api/users'

// Making requests to api and receiving responses
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: {
            "Authorization": `bearer ${process.env.TOKEN}`
        }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, token, newObject) => {
    const config = {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
}

export default { getAll, create, update };