import axios from 'axios';
const baseUrl = '/api/blogs'

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
    const blogs = response.data;
    console.log(blogs)
    return blogs.sort((first, second) => {
        return first.likes > second.likes ? -1 : 1;
    })
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

const update = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject);
    return request.data;
}

export default { getAll, create, update, remove };