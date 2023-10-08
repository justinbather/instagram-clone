import reelsIcon from "../../../assets/icons/reels-icon-white-outline.svg";
import feedIcon from "../../../assets/icons/feed-icon-white.png"
import { useState } from "react";
import { Post } from "../../Home/components/Post";

export const ProfileFeed = (props) => {
 
    const [ showPost, setShowPost ] = useState(false)
    const [ postData, setPostData ] = useState({})

    const toggleView = (post) => {
        setPostData(post)
        setShowPost(!showPost)

    }
    //? can use feed component and add ids to each section with the post id so we can scroll to it on click?
    //? this way the user can scroll other posts as well we would just need to ensure that the feed is populated in a sorted order
    if (showPost) {
        return (
            <div className="z-10 w-full h-screen bg-black flex flex-col">
                <Post post={postData} backFn={() => toggleView()}/> 
            </div>
        )
    }

    return(
            <div className="flex flex-col w-full bg-black gap-2">
                <div className="flex flex-row justify-around items-center">
                    <img className="h-8 w-8" src={feedIcon}></img>
                    <img className="h-6 w-6" src={reelsIcon}></img>
                    <img className="h-6 w-6" src={reelsIcon}></img>
                </div>
                <div className="flex flex-row w-full justify-start flex-wrap">
                    {props.loading ? (<>
                    <div className="w-1/3 aspect-square bg-zinc-700"></div>
                    <div className="w-1/3 aspect-square bg-zinc-700"></div>
                    <div className="w-1/3 aspect-square bg-zinc-700"></div>
                    <div className="w-1/3 aspect-square bg-zinc-700"></div>
                    </>)
                : (props.posts.map((post) => (
                    <div className="w-1/3 aspect-square bg-zinc-700">
                        <a onClick={() => (props.showFeed(true), props.setSelectedPost(post._id))}>
                        <img src={post.media} className="w-full h-full object-cover"></img>
                        </a>
                    </div>
                )))}
                    
        
                </div>

            </div>

        )
}