import arrowIcon from '../../../assets/icons/back-arrow-icon-white.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'



export const EditProfileForm = (props) => {

    const [data, setData] = useState("")
    const [dataType, setDataType] = useState("")
    const [formData, setFormData] = useState("")

    const navigate = useNavigate();

    const handleChange = (value) => {

        setFormData(value)
    }

    const handleSubmit = async (e) => {

        console.log(dataType, formData)
        e.preventDefault()
        let updateData = {}
        updateData[dataType] = formData
        console.log(updateData)
        try {
            console.log('trying')
            const response = await axios.put('http://localhost:8082/user/edit', updateData, {
                headers: { "Content-Type": "application/json" }, 
                withCredentials: true,
                })
            if (response.status === 200) {
                console.log('Edited successfully', response.data.update)
                props.toggleEdit()
            }
        } catch (err) {
            throw new Error(err)
        }
    }


    useEffect(() => {
        setData(props.formObj.value)
        setDataType(props.formObj.field)
        setFormData(props.formObj.value)
    }, [])
    
    return (
        <div className="w-full h-full bg-black flex flex-col">
            <div className="flex flex-row w-full mt-3 pb-3 border-b-zinc-600 border-b-[1px]">
                <a className="h-5 w-5" onClick={props.toggleEdit}>
                    <img src={arrowIcon}></img>
                </a>
                <h2 className='font-inter pl-32 text-white font-bold'>{props.formObj.field}</h2>
            </div>
            <div className='w-full flex flex-col mt-4'>
                <form className='flex flex-col w-full justify-start items-start' onSubmit={handleSubmit}>
                    <label className='text-zinc-400 text-xs ml-5 '>{props.formObj.field}</label>
                    <input onChange={(e) => handleChange(e.target.value)} placeholder={props.formObj.value} className=' w-full bg-black text-white border-b-zinc-600 border-b-[1px] pl-5 focus:outline-none placeholder:text-white'></input>
                    <button className='bg-cyan-400' type='submit'>Done</button>
                </form>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>You can only change your name twice within 14 days.</p>
            </div>
        </div>
    )
}