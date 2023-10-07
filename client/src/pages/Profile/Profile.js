import { Navbar } from "../components/Navbar";
import { ProfileFeed } from "./components/ProfileFeed";
import { ProfileInfo } from "./components/ProfileInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export const Profile = () => {

    const { username } = useParams()
    console.log({username})

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState({})
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchProfileObject = async () => {
            try {
                let response = ''
                if (username) {
                    response = await axios.get(`http://localhost:8082/user/profile/${username}`, {
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
   

    return (
        <div className="flex flex-col w-screen h-screen bg-black gap-2">
            <ProfileInfo user={user} loading={loading} isFollowing={isFollowing} posts={posts}/>
            <div className="w-full bottom-0 fixed">
                <Navbar />
            </div>
        </div>
    )
};
