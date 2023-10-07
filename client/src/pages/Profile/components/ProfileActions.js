
import { useState, useEffect } from "react"
import axios from "axios"

export const ProfileActions = (props) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const handleUnfollow = () => {

    }

    console.log(props.isFollowing)

    const handleFollow = async () => {
        try {
            await axios.post(`http://localhost:8082/user/follow/${props.username}`,{username: props.username}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,

                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsFollowing(true)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            } catch (error) {
            console.log(error)
            }
        }

    useEffect(() => {
        setIsFollowing(props.isFollowing) //Update following state here so we can change it upon unfollow or follow
    }, [props])


    return(
        <div className="flex flex-row w-full justify-center items-center gap-1">
            {props.isFollowing ? <button onClick={handleUnfollow} className="h-6 w-1/2 bg-zinc-800 rounded-md text-center font-bold text-white font-inter text-sm">Following</button>
            : <button onClick={handleFollow} className="h-6 w-1/2 bg-blue-400 rounded-md text-center font-bold text-white font-inter text-sm">Follow</button>

}
            <button className="h-6 w-1/2 bg-zinc-800 rounded-md text-center font-bold text-white font-inter text-sm">Message</button>
        </div>
    )
}