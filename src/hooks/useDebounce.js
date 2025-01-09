import { useEffect, useState } from "react"

export const useDebounce = (cb,delay) => {

    const [debounceValue,setDebounceValue] = useState(cb)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(cb)
        },delay)

        return () => clearTimeout(timer)
    },[cb,delay])

    return debounceValue;
}

