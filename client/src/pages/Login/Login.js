import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";



export const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/auth/login', {
            username: username,
            password: password,
        },
        {
            headers: { "Content-Type": "application/json"},
            withCredentials: true,
        })
        .then((res) => {
            navigate('/home');
        })
        .catch((err) => {
            alert(`Failed to login user, error:${err}`)
        })
    }

    return (
        <div className="flex w-screen h-screen bg-black">
            <h1 className="text-white">Hello</h1>

            <form onSubmit={handleSubmit}>
                <p>Enter your user name</p>
            <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <p>Enter your password</p>
            <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit">Log in</button>
            </form>

        </div>
    )
}