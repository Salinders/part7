import { useState, useEffect } from 'react'
import axios from 'axios'



export const useResource = (baseUrl) => {
    const [resources, setResources] = useState(null)

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setResources(res.data)
            console.log(res.data)
        })
            .catch((error) => {
                console.error('Error fetching data', error)
                setResources('')
            })
    }, [])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources(resources.concat(response.data))

    }


    const service = {
        create
    }


    return [
        resources, service
    ]
}
