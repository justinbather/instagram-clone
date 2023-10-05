import React, { useState } from "react"
import axios from "axios"
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"



export const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('posting to node')
        axios.post('http://localhost:8082/auth/login', {
            username: username,
            password: password,
        },
        {
            headers: { "Content-Type": "application/json"},
            withCredentials: true,
        })
        .then((res) => {
            console.log(res)
            if (res.status === 201) {
                console.log(res.cookies)
                navigate('/home')
            }
        })
        .catch((err) => {
            alert(`Failed to login user, error:${err}`)
        })
    }

    return (
        <div className="flex flex-col w-screen h-screen bg-white text-center justify-center items-center gap-10 pb-20">
            <h1 className="text-slate-950 text-2xl">Instagram</h1>
            <div className="flex flex-col w-64 justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full items-center gap-2">

                <input placeholder="Phone number, username, or email" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-zinc-100/50 w-full h-8 border rounded-sm placeholder:text-xs placeholder:font-bold placeholder:font-inter placeholder:pl-2 placeholder:text-slate-500/80"></input>

                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-zinc-100/50 w-full h-8 border rounded-sm placeholder:text-xs placeholder:font-bold placeholder:font-inter placeholder:pl-2 placeholder:text-slate-500/80"></input>
                <a className="font-inter text-[.9rem] text-[#4cb4f9] font-bold mb-5 mt-2">Forgot password?</a>
                <button type="submit" className="w-full h-9 border rounded-xl bg-[#4cb4f9] text-white font-bold font-inter">Log in</button>
                <a className="font-inter text-[.9rem] text-slate-700 my-5">Don't have an account? <span className="font-inter text-[#4cb4f9] font-bold text-[.9rem]">Sign up</span></a>
                </form>
            </div>
        </div>
    )
}