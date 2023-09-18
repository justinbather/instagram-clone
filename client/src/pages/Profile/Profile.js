import { Navbar } from "../components/Navbar";
import { ProfileFeed } from "./components/ProfileFeed";
import { ProfileInfo } from "./components/ProfileInfo";

export const Profile = () => {
    return (
        <div className="flex flex-col w-screen h-screen bg-black gap-2">
            <ProfileInfo />
            <div className="w-full bottom-0 fixed">
                <Navbar />
            </div>
        </div>
    )
};
