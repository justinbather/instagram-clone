import likeIcon from '../../../assets/icons/heart-icon-white.png';
import commentIcon from '../../../assets/icons/comment-icon-white.svg';
import shareIcon from '../../../assets/icons/share-icon-white.png';
import saveIcon from '../../../assets/icons/save-icon-white.svg';



export const Post = () => {
    return( 
        <div className="flex flex-col w-full bg-black pb-5">
            
            <div className="flex flex-row items-center justify-around gap-60 py-3">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-6 h-6 rounded-full ring-2 ring-red-400"></div>
                    <p className="font-inter text-xs font-bold text-white">justin</p>
                </div>
                <div>
                    <p className="font-inter text-white font-bold text-sm text-center">...</p>
                </div>
            </div>

            <div className="w-full h-96 bg-green-100">

            </div>

            <div className="flex flex-row w-full h-10 items-center justify-around gap-60">
                <div className="flex flex-row items-center justify-evenly gap-3">
                    <img className='h-6 w-6' src={likeIcon}></img>
                    <img className='h-6 w-6' src={commentIcon}></img>
                    <img className='h-6 w-6' src={shareIcon}></img>
                </div>
                <div className='flex items-center justify-center'>
                    <img className='h-6 w-6' src={saveIcon}></img>
                </div>
            </div>

            <div className='flex w-full bg-black justify-start items-center'>
                <p className='font-inter text-white text-sm font-bold ml-2'>32 likes</p>

            </div>

            <div className='flex flex-col justify-start text-left'>
                <div className='flex flex-row justify-start items-center'>
                    <p className='font-inter text-white text-sm ml-2'><a className='font-bold'>justin</a> Lorem ipsum </p>

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
                <p className='font-inter text-zinc-400 text-sm ml-2'>Aug 3</p>
            </div>

        </div>
    )
}