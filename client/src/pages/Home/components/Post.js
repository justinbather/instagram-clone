import likeIcon from '../../../assets/icons/heart-icon-white.png';
import commentIcon from '../../../assets/icons/comment-icon-white.svg';
import shareIcon from '../../../assets/icons/share-icon-white.png';
import saveIcon from '../../../assets/icons/save-icon-white.svg';
import axios from 'axios';



export const Post = (props) => {


    const handleLike = async () => {
        try {
            await axios.post('http://localhost:8082/feed/like',
            {postId: props.postId}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }).then((res) => {
                if (res.status === 200) {
                //need to display new likes amount
                console.log('Post liked successfully')
                }
            }).catch((err) => {
                console.log(err)
            })
            
        } catch (error) {
            console.log('error liking post', error)
        }
    }

    const handleDelete = async () => {
        if (!props.hasPerms) {
            return
        }
        
        try {
            const response = await axios.delete(`http://localhost:8082/user/post/${props.post._id}`, {
                headers: {'Content-Type': 'applicaton/json'},
                withCredentials: true,
                
            })
            console.log(response)
        } catch (err) {
            console.log('Error deleting post', err)
        }
    }

    
    return( 
        <div className="flex flex-col w-full bg-black pb-5">
            
            <div className="flex flex-row items-center justify-around gap-60 py-3">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-6 h-6 rounded-full ring-2 ring-red-400">
                        <img src={props.post.profilePicture} className='w-full h-full object-cover'></img>
                    </div>
                    <p className="font-inter text-xs font-bold text-white">{props.post.username}</p>
                </div>
                <div>
                    <a onClick={handleDelete} className="font-inter text-white font-bold text-sm text-center">...</a>
                </div>
            </div>

            <div className="w-full h-96 bg-zinc-600" id={props.post._id}>
                <img src={props.post.media} className='w-full h-full object-cover'></img>
            </div>

            <div className="flex flex-row w-full h-10 items-center justify-around gap-60">
                <div className="flex flex-row items-center justify-evenly gap-3">
                    <a onClick={handleLike} >
                        <img className='h-6 w-6' src={likeIcon}></img>
                    </a>
                    <a onClick={props.backFn}>
                        <img className='h-6 w-6' src={commentIcon}></img>
                    </a>
                    <img className='h-6 w-6' src={shareIcon}></img>
                </div>
                <div className='flex items-center justify-center'>
                    <img className='h-6 w-6' src={saveIcon}></img>
                </div>
            </div>

            <div className='flex w-full bg-black justify-start items-center'>
                {props.post.likes > 0 ? <p className='font-inter text-white text-sm font-bold ml-2'>{props.post.likes} likes</p> 
                : <p className='font-inter text-white text-sm font-bold ml-2'></p>}
                

            </div>

            <div className='flex flex-col justify-start text-left'>
                <div className='flex flex-row justify-start items-center'>
                    <p className='font-inter text-white text-sm ml-2'><a className='font-bold'>{props.post.username} </a>{props.post.description}</p>

                </div>

            </div>

            <div className='flex flex-col justify-start text-left gap-1'>
                <p className='font-inter text-zinc-400 text-sm ml-2'>View all 74 comments</p>
                <p className='font-inter text-white text-sm ml-2'><a className='font-bold'>justin</a> Lorem ipsum </p>
                <p className='font-inter text-white text-sm ml-2'><a className='font-bold'>justin</a> Lorem ipsum </p>

            </div>

            <div className='flex flex-row justify-start items-center mt-3 mb-1 ml-2'>
                <div className='w-5 h-5 bg-white rounded-full'></div>
                <p className='font-inter text-zinc-400 text-sm ml-2'>Add a comment...</p>
            </div>

            <div className='flex flex-row justify-start items-center'>
                <p className='font-inter text-zinc-400 text-sm ml-2'>{props.post.posted}</p>
            </div>

        </div>
    )
}