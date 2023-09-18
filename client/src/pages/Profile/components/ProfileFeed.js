import reelsIcon from "../../../assets/icons/reels-icon-white-outline.svg";
import feedIcon from "../../../assets/icons/feed-icon-white.png"

export const ProfileFeed = () => {
    return(
        <div className="flex flex-col w-full bg-black gap-2">
            <div className="flex flex-row justify-around items-center">
                <img className="h-8 w-8" src={feedIcon}></img>
                <img className="h-6 w-6" src={reelsIcon}></img>
                <img className="h-6 w-6" src={reelsIcon}></img>
            </div>
            <div className="flex flex-row w-full justify-start flex-wrap">
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
                <div className="w-1/3 aspect-square bg-white"></div>
      
            </div>

        </div>
    )
}