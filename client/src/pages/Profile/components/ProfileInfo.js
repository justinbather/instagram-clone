import { ProfileActions } from "./ProfileActions";
import { ProfileDescription } from "./ProfileDescription";
import { ProfileFeed } from "./ProfileFeed";
import notificationBell from "../../../assets/icons/notificationbell-icon-white.png";
import arrowIcon from "../../../assets/icons/back-arrow-icon-white.png";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";




export const ProfileInfo = () => {

    const { usernameParam } = useParams();
    console.log(usernameParam)


    const [user, setUser] = useState({})
    const [posts, setPosts] = useState({})
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(true)
    
    

    useEffect(() => {
        const fetchProfileObject = async () => {
            try {
                let response = ''
                if (usernameParam) {
                    response = await axios.get(`http://localhost:8082/user/profile/${usernameParam}`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    })
                } else {
                    response = await axios.get(`http://localhost:8082/user/profile`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    }) 
                }

                if (response.status === 200) {
                    setUser(response.data.user)
                    setPosts(response.data.posts)
                    setIsFollowing(response.data.followingThisUser)
                    console.log(isFollowing)
                    setLoading(false)
                    console.log(response)
                } else {
                    console.log('Failed to fetch user profile, did not receive http 200')
                }
                } catch (error) {
                    console.error(error)
                }
             
        }
        fetchProfileObject()
    }, [])




    return(
        <div className="flex flex-col w-screen h-32 bg-black">
            <div className="flex flex-row w-full justify-between items-center py-5 px-2 text-center">
                <img className="h-5 w-5" src={arrowIcon}></img>
                { loading ? (<h2 className="text-white font-bold text-md"></h2>)
                 : (<h2 className="text-white font-bold text-md">{user.username}</h2>)}

                <div className="flex flex-row justify-center items-center gap-4">
                    <img className="h-5 w-5" src={notificationBell}></img>
                    <p className="font-inter text-sm font-bold text-white">...</p>

                </div>
            </div>
            <div className="flex flex-row justify-around w-full gap-20 items-center px-5">
                <div className="h-20 w-20 rounded-full bg-white overflow-hidden">
                    { loading ? <img className="w-full h-full object-cover bg-black"></img>
                    : (<img src={user.profilePicture} className="w-full h-full object-cover"></img>)}
                </div>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col justify-center text-center">
                        { loading ? <p className="font-inter text-xs font-bold text-white">0</p>
                        : (<p className="font-inter text-xs font-bold text-white">{user.posts.length}</p>)}
                        <p className="font-inter text-xs text-white">Post</p>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        {loading ? <p className="font-inter text-xs font-bold text-white">0</p>
                        : (<p className="font-inter text-xs font-bold text-white">{user.followers.length}</p>)}
                        <p className="font-inter text-xs text-white">Followers</p>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        {loading ? <p className="font-inter text-xs font-bold text-white">0</p>
                        : (<p className="font-inter text-xs font-bold text-white">{user.following.length}</p>)}
                        <p className="font-inter text-xs text-white">Following</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <ProfileDescription bio={user.bio} username={user.username} name={user.username} loading={loading} userIsFollowing={isFollowing} />
                
                <ProfileFeed posts={posts} loading={loading} />
            </div>
        </div>
    )
}