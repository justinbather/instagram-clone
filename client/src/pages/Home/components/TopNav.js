import notificationIcon from "../../../assets/icons/heart-icon-white.png";
import messagesIcon from "../../../assets/icons/messenger-icon-white.svg";

export const TopNav = () => {
    return (
        <div className="flex flex-row w-full h-16 bg-black justify-around gap-x-20 items-center">
            <div className="flex bg-black">
                <h1 className="font-inter text-white text-xl font-bold">Instagram</h1>
            </div>
            <div className="flex gap-3 bg-black ml-20">
                <img className="h-7 w-7" src={notificationIcon}></img>
                <img className="h-7 w-7" src={messagesIcon}></img>
            </div>
        </div>
    )
};