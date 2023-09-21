import { ProfileActions } from "./ProfileActions";

export const ProfileDescription = (props) => {
    return(
        <div className="flex flex-col w-full bg-black gap-2 px-5">
            <div>
                { props.loading ? (<p className="font-inter font-bold text-white text-xs text-left"></p>) 
                : (<p className="font-inter font-bold text-white text-xs text-left">{props.name}</p>)}
            </div>
            <div>
                { props.loading ? <p className="font-inter text-white text-xs text-left"></p>
                : (<p className="font-inter text-white text-xs text-left">{props.bio}</p>)}
            </div>
            <div className="flex flex-row gap-2 items-center py-2">
                <div className="h-5 w-5 rounded-full bg-white"></div>
                <p className="font-inter font-bold text-white text-xs text-left">Followed by michael</p>
            </div>
            <ProfileActions />
        </div>
    )
};