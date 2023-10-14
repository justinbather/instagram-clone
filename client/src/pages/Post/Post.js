import { useState } from "react"
import { Navbar } from "../components/Navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Post = () => {
    const [currentImage, setCurrentImage] = useState(undefined)
    const [preview, setPreview] = useState(undefined)
    const [toggleEditPost, setToggleEditPost] = useState(false)
    const [caption, setCaption] = useState("")

    const navigate = useNavigate()


    const handleChange = (e) => {
        console.log(e.target.files[0])
        setCurrentImage(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleNext = () => {
        setToggleEditPost(!toggleEditPost)
        console.log(currentImage)
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value)
    }

    const handlePost = async (e) => {
        e.preventDefault()

        try {
            let formData = new FormData()
            formData.append('image', currentImage)
            formData.append('description', caption)
            const response = await axios.post('http://localhost:8082/user/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            } )
            navigate('/profile')

        } catch (err) {
            throw new Error(`Error uploading post: ${err}`)
        }
    }


    if (toggleEditPost) {
        return (
            <div className="w-full h-screen bg-black flex flex-col pb-10">
            <div className="w-full flex flex-row items-start justify-center border-b-[1px] border-b-zinc-400">
                <img className="h-28" src={preview}></img>
                <form className="w-full" onSubmit={handlePost}>
                    <input onChange={handleCaptionChange} className="text-white bg-black placeholder:text-zinc-400" type="text" placeholder="Write a caption..."></input>
                    <button className='bg-cyan-400' type='submit'>Post</button>
                </form>
            </div>
            <div className="w-full bottom-0 fixed">
                    <Navbar />
                </div>
        </div>
        )
    }

    return(
        <div className="w-full h-screen bg-black flex flex-col">
            <div className="flex flex-row w-full mt-3 pb-3 border-b-zinc-600 border-b-[1px]">
               <h2 className="font-inter text-white font-bold text-md">New post</h2>
                
            </div>
            <div className='w-full flex flex-col mt-4'>
                <form className='flex flex-col w-full justify-center items-center' onSubmit={handleNext}>
                    
                    <input onChange={handleChange} type="file" accept="/image*" className=' w-full bg-black text-white border-b-zinc-600 border-b-[1px] pl-5 focus:outline-none placeholder:text-white'></input>
                    <button className='bg-cyan-400' type='submit'>Next</button>
                </form>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                
            </div>
            <div className="w-full bottom-0 fixed">
                    <Navbar />
                </div>
        </div>
    )
}