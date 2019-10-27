import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl, token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVkOTc2NWU5NDlmMWEyOTAzMDhmOGRiZCIsImlhdCI6MTU3MDIwMzE4Mn0.a9jtioY8kGSGBAgEBBUturMsdSA7Jm9bwlQo-ExNrYE') => {
    const config = {
        headers: {
            "Authorization": `bearer ${token}`
        }
    }
    const [resources, setResources] = useState([])

    useEffect(() => {
        const loadIn = async () => {
            try {
                const response = await axios.get(baseUrl);
                setResources(response.data)
            } catch(error) {
                console.log(error)
            }
            
        }
        loadIn()
    }, [])

    const create = async (newObject) => {
        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }
    
    const service = {
        create
    }

    return [
        resources, service
    ]
}

export default useResource