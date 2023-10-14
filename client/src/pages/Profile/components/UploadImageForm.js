import { useState } from "react"
import arrowIcon from '../../../assets/icons/back-arrow-icon-white.png';
import axios from "axios";


export const UploadImageForm = (props) => {

    const [currentImage, setCurrentImage] = useState(undefined)

    const handleChange = (e) => {
        console.log(e.target.files[0])
        setCurrentImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let formData = new FormData()
            formData.append('image', currentImage)
            const response = await axios.put('http://localhost:8082/user/edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true, 
            })

            console.log(response)
            
        } catch (err) {
            throw new Error(`Error uploading image: ${err}`)
        }
    }

    return (
        <div className="w-full h-full bg-black flex flex-col">
            <div className="flex flex-row w-full mt-3 pb-3 border-b-zinc-600 border-b-[1px]">
                <a className="h-5 w-5" onClick={props.toggleEdit}>
                    <img src={arrowIcon}></img>
                </a>
                
            </div>
            <div className='w-full flex flex-col mt-4'>
                <form className='flex flex-col w-full justify-start items-start' onSubmit={handleSubmit}>
                    
                    <input onChange={handleChange} type="file" accept="/image*" className=' w-full bg-black text-white border-b-zinc-600 border-b-[1px] pl-5 focus:outline-none placeholder:text-white'></input>
                    <button className='bg-cyan-400' type='submit'>Done</button>
                </form>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>You can only change your name twice within 14 days.</p>
            </div>
        </div>
    )
}