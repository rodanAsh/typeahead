import React, { useEffect, useState } from 'react'

const usefetchPromise = (query) => {
    const [data,setData] = useState([])
    const fetchData = async() => {
        try{
            const response = await fetch(`https://swapi.dev/api/people/?search=${query}`)
            if(!response.ok) throw new error(response.statusText)
            const data = await response.json()
            setData(data.results)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData(query)
    },[query])

  return []
}

export default usefetchPromise