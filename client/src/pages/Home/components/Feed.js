import { Post } from "./Post"

export const Feed = (props) => {
    const loadingProps = {
        username: '',
        profilePicture: '',
        description: '',
        created: '',
        postMedia: '',
        likes: '0',
    }
    console.log(props.feed)
    return (
        <div className="flex flex-col border-top border-white bg-black ">
            {props.loading ? (<>
                        <Post post={loadingProps}/>
                        <Post post={loadingProps} />
                        <Post post={loadingProps} />
                        <Post post={loadingProps} />
            </>)
            : (props.feed.map((post) => (<Post post={post} />)))}
            
        </div>
    )
}