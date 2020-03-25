import axios from 'axios';

const baseUrl = 'https://localhost:3001/api/login';

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}

export default login