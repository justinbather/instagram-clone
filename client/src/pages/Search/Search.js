import axios from "axios";
import React, {useEffect, useState} from "react";

export const Search = () => {

    const [searchInput, setSearchInput] = useState("")
    const [results, setResults] = useState([])
    const [displayResults, setDisplayResults] = useState(false)

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }


    const handleSearch = async () => {
        try {
        const response = await axios.post('http://localhost:8082/search', {
            search: searchInput
            
        },
        {
            headers: { "Content-Type": "application/json"},
            withCredentials: true,
        })
        if (response.status === 200) {
            console.log(response.data)
            setResults(response.data.searchResult)
            setDisplayResults(true)
        } else {
            console.log('didnt get 200 status')
        }
    } catch(error) {
        console.log('error searching for users', error)
    }
    
    }
    useEffect(() => {
        handleSearch()
    }, [searchInput])
    
    return(
        <div>
            <div>
            <form>
            <input type="text" onChange={handleChange}/>
            </form>
            </div>
            {displayResults && results && results.length > 0 ? results.map((item) => (
                
                <h1>{item.username}</h1>
            )) : (<h1>Please search</h1>)}
            
        </div>
    )
};
