import { Post } from "./Post"

export const Feed = () => {
    return (
        <div className="flex flex-col border-top border-white bg-black ">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}