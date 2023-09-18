import { ProfileActions } from "./ProfileActions";
import { ProfileDescription } from "./ProfileDescription";
import { ProfileFeed } from "./ProfileFeed";
import notificationBell from "../../../assets/icons/notificationbell-icon-white.png";
import arrowIcon from "../../../assets/icons/back-arrow-icon-white.png";

export const ProfileInfo = () => {
    return(
        <div className="flex flex-col w-screen h-32 bg-black">
            <div className="flex flex-row w-full justify-between items-center py-5 px-2 text-center">
                <img className="h-5 w-5" src={arrowIcon}></img>
                <h2 className="text-white font-bold text-md">justinbather_</h2>
                <div className="flex flex-row justify-center items-center gap-4">
                    <img className="h-5 w-5" src={notificationBell}></img>
                    <p className="font-inter text-sm font-bold text-white">...</p>

                </div>
            </div>
            <div className="flex flex-row justify-around w-full gap-20 items-center px-5">
                <div className="h-20 w-20 rounded-full bg-white"></div>
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col justify-center text-center">
                        <p className="font-inter text-xs font-bold text-white">6</p>
                        <p className="font-inter text-xs text-white">Post</p>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        <p className="font-inter text-xs font-bold text-white">760</p>
                        <p className="font-inter text-xs text-white">Followers</p>
                    </div>
                    <div className="flex flex-col justify-center text-center">
                        <p className="font-inter text-xs font-bold text-white">134</p>
                        <p className="font-inter text-xs text-white">Following</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <ProfileDescription />
                
                <ProfileFeed />
            </div>
        </div>
    )
}