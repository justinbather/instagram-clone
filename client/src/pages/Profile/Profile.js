import { Navbar } from "../components/Navbar";
import { ProfileFeed } from "./components/ProfileFeed";
import { ProfileInfo } from "./components/ProfileInfo";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Feed } from "../Home/components/Feed";


export const Profile = () => {

    const { usernameParam } = useParams()
    const navigate = useNavigate() // For use with back button navigation

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState({})
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [feedView, setFeedView] = useState(false)
    const [selectedPost, setSelectedPost] = useState() //todo: figure out how to scroll to the selected post given the post id maybe, props show the post id so just have to connect it

    const showFeed = (feedValue) => {
        setFeedView(feedValue)
        console.log("toggling feed: ", feedValue, selectedPost)
    }

    useEffect(() => {
        console.log(selectedPost)
    }, [selectedPost])
    
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
   
    if (!feedView) {
        return (
            <div className="flex flex-col w-screen h-screen bg-black gap-2">
                <ProfileInfo user={user} loading={loading} isFollowing={isFollowing} posts={posts} routeBack={() => navigate(-1)} showFeed={showFeed} setSelectedPost={setSelectedPost}/>
                <div className="w-full bottom-0 fixed">
                    <Navbar />
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col w-screen h-screen bg-black gap-2">
                <Feed feed={posts} loading={loading} selectedPost={selectedPost}/>
                <div className="w-full bottom-0 fixed">
                    <Navbar />
                </div>
            </div>
        )
    }
};
