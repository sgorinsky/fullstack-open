import axios from 'axios';
const baseUrl = '/api/users'

const create = async (newObject, token) => {
    const config = {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject);
    return request.data;
}

export default { create, update };