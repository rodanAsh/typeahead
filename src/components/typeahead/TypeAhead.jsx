import React, { useEffect } from 'react'
import { useState } from 'react'
import './TypeAhead.css'

const STATE = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
}

const TypeAhead = () => {
    {/* state variable to maintain query state */}
    const [query,setQuery] = useState("")
    const [suggestions,setSuggestions] = useState([])
    const [status,setStatus] = useState(STATE.LOADING)
    console.log(suggestions);

    const abortController = new AbortController();
    const { signal } = abortController;
    

    const fetchProducts = async() => {
        try{
            setStatus(STATE.LOADING)
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=10`,{ signal }) // returns response as a readable stream
            const data = await response.json() // converts readble stream to json object
            setStatus(STATE.SUCCESS)
            setSuggestions(data.products)
        }catch(error){
            console.log(error);
            if(error.name !== "AbortError"){
                setStatus(STATE.ERROR)
            } 
        }
    }
    
    useEffect(() => {

        let timerId = setTimeout(fetchProducts,1000)

        return () => {
            clearTimeout(timerId)
            abortController.abort();
        }
        
    },[query])

    return (
        <section className='type-ahead'>
            <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {status === STATE.LOADING && <div>...Loading</div>}

            {status === STATE.ERROR && <div>Something went wrong</div>}

            {status === STATE.SUCCESS && (
                <ul>
                {
                    suggestions.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))
                }
            </ul>
            )}
            
        </section>
    )
}

export default TypeAhead;