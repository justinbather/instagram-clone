import { Navbar } from "../components/Navbar";
import { ProfileFeed } from "./components/ProfileFeed";
import { ProfileInfo } from "./components/ProfileInfo";
import { useParams } from "react-router-dom";


export const Profile = () => {

    const { username } = useParams()
    

   

    return (
        <div className="flex flex-col w-screen h-screen bg-black gap-2">
            <ProfileInfo userParam={username} />
            <div className="w-full bottom-0 fixed">
                <Navbar />
            </div>
        </div>
    )
};
