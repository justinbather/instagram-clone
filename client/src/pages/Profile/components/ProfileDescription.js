import { ProfileActions } from "./ProfileActions";

export const ProfileDescription = () => {
    return(
        <div className="flex flex-col w-full bg-black gap-2 px-5">
            <div>
                <p className="font-inter font-bold text-white text-xs text-left">Justin Bather</p>
            </div>
            <div>
                <p className="font-inter text-white text-xs text-left">Lorem ipsum</p>
            </div>
            <div className="flex flex-row gap-2 items-center py-2">
                <div className="h-5 w-5 rounded-full bg-white"></div>
                <p className="font-inter font-bold text-white text-xs text-left">Followed by michael</p>
            </div>
            <ProfileActions />
        </div>
    )
};