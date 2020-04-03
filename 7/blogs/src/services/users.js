import axios from 'axios';
const baseUrl = '/api/users'


const getAll = async () => {
    const request = await axios.get(baseUrl)
    console.log(request)
    return request.data
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
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.data;
}

export default { getAll, create, update };