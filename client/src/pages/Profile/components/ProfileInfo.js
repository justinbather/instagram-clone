import { ProfileActions } from "./ProfileActions";
import { ProfileDescription } from "./ProfileDescription";
import { ProfileFeed } from "./ProfileFeed";
import notificationBell from "../../../assets/icons/notificationbell-icon-white.png";
import arrowIcon from "../../../assets/icons/back-arrow-icon-white.png";

import React from 'react';





export const ProfileInfo = (props) => {





    return(
        <div className="flex flex-col w-screen h-32 bg-black">
            <div className="flex flex-row w-full justify-between items-center py-5 px-2 text-center">
                <img className="h-5 w-5" src={arrowIcon}></img>
                { props.loading ? (<h2 className="text-white font-bold text-md"></h2>)
                 : (<h2 className="text-white font-bold text-md">{props.user.username}</h2>)}

                <div className="flex flex-row justify-center items-center gap-4">
                    <img className="h-5 w-5" src={notificationBell}></img>
                    <p className="font-inter text-sm font-bold text-white">...</p>

                </div>
            </div>
            <div className="flex flex-row justify-around w-full gap-20 items-center px-5">
                <div className="h-20 w-20 rounded-full bg-white overflow-hidden">
                    { props.loading ? <img className="w-full h-full object-cover bg-black"></img>
                    : (<img src={props.user.profilePicture} className="w-full h-full object-cover"></img>)}
                </div>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col justify-center text-center">
                        { props.loading ? <p className="font-inter text-xs font-bold text-white">0</p>
                        : (<p className="font-inter text-xs font-bold text-white">{props.user.posts.length}</p>)}
                        <p className="font-inter text-xs text-white">Post</p>
                    </div>
                <div className="flex flex-col justify-center text-center">
                        {props.loading ? <p className="font-inter text-xs font-bold text-white">0</p>
                        : (<p className="font-inter text-xs font-bold text-white">{props.user.followers.length}</p>)}
                        <p className="font-inter text-xs text-white">Followers</p>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        {props.loading ? <p className="font-inter text-xs font-bold text-white">0</p>
                        : (<p className="font-inter text-xs font-bold text-white">{props.user.following.length}</p>)}
                        <p className="font-inter text-xs text-white">Following</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <ProfileDescription bio={props.user.bio} username={props.user.username} name={props.user.username} loading={props.loading} isFollowing={props.isFollowing} />
                
                <ProfileFeed posts={props.posts} loading={props.loading} />
            </div>
        </div>
    )
}