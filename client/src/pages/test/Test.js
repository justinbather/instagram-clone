import axios from 'axios';
import React, {useState, useEffect} from 'react';


const Test = () => {

    const [data, setData] = useState([])
    const [formData, setFormData] = useState("")

    const fetchData = () => {
        axios.get('http://localhost:8082/api/test')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.error(`Error fetching data: ${err}`)
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData))
        axios.post('http://localhost:8082/api/test', { 'name': formData},)
        .then((res) =>{
            setFormData("")
            alert("Name submitted!")
        })
        .catch((err) => {
            alert(err)
        })
    }



    useEffect(() => {
        fetchData();
    }, [])

    return(
        <div>
            <ul>
                {data.map((name) => (<li>{name.name}</li>))}
            </ul>
            <form action='http://localhost:8082/api/test' method='POST' onSubmit={handleSubmit}>
                <input type='text' id='name-input' value={formData} onChange={handleChange}></input>
                <button type='submit' value='submit'>Submit Name</button>
            </form>
            
        </div>
    );
};

export default Test;