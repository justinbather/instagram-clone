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
        <div className="bg-black w-full flex flex-col pt-5 px-5">
            <div>
            <form>
            <input className="bg-zinc-800 w-full h-6 rounded-md pl-5 placeholder:text-sm placeholder:text-zinc-400" type="text" onChange={handleChange} placeholder="Search"/>
            </form>
            </div>
            {displayResults && results && results.length > 0 ? results.map((item) => (
                
                <h1>{item.username}</h1>
            )) : (<h1>Please search</h1>)}
            
            <div className="bg-black w-full flex flex-col justify-start items-start gap-3">
                <div className="w-full flex flex-row justify-start gap-3 items-center">
                    <div className="bg-zinc-400 rounded-full h-10 w-10"></div>
                    <div className="flex-col justify-center items-start">
                        <h3 className="font-inter text-white text-sm font-bold">justinbather</h3>
                        <p className="font-inter text-zinc-700 text-xs">Justin Bather</p>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-start gap-3 items-center">
                    <div className="bg-zinc-400 rounded-full h-10 w-10"></div>
                    <div className="flex-col justify-center items-start">
                        <h3 className="font-inter text-white text-sm font-bold ">justinbather</h3>
                        <p className="font-inter text-zinc-700 text-xs ">Justin Bather</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
