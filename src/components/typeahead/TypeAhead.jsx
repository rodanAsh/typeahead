import React, { useEffect } from 'react'
import { useState } from 'react'
import './TypeAhead.css'
import { useDebounce } from '../../hooks/useDebounce'

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

    const abortController = new AbortController();
    const { signal } = abortController;
    
    let debounceValue = useDebounce(query,2000)

    useEffect(() => {

        const fetchProducts = async() => {
            try{
                setStatus(STATE.LOADING)
                const response = await fetch(`https://dummyjson.com/products/search?q=${debounceValue}&limit=10`,{ signal }) // returns response as a readable stream
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

        fetchProducts()

        return () => {
            abortController.abort();
        }
        
    },[debounceValue])

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
                <div className='product-list'>
                    {
                        suggestions.map((item) => (
                            <div key={item.id} className='product-card'>
                                <img src={item.thumbnail} alt="" />
                                <div>
                                    <p>{item.title}</p>
                                    <p>{item.category}</p>
                                    <p>$ {item.price}</p>
                                </div>  
                            </div>
                        ))
                    }
                </div>
            )}
            
        </section>
    )
}

export default TypeAhead;