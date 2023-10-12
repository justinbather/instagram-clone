import arrowIcon from '../../../assets/icons/back-arrow-icon-white.png';



export const EditProfileForm = (props) => {

    
    return (
        <div className="w-full h-full bg-black flex flex-col">
            <div className="flex flex-row w-full mt-3 pb-3 border-b-zinc-600 border-b-[1px]">
                <a className="h-5 w-5" onClick={props.toggleEdit}>
                    <img src={arrowIcon}></img>
                </a>
                <h2 className='font-inter pl-32 text-white font-bold'>{props.formObj.field}</h2>
            </div>
            <div className='w-full flex flex-col mt-4'>
                <form className='flex flex-col w-full justify-start items-start'>
                    <label className='text-zinc-400 text-xs ml-5 '>{props.formObj.field}</label>
                    <input placeholder={props.formObj.value} className=' w-full bg-black text-white border-b-zinc-600 border-b-[1px] pl-5 focus:outline-none placeholder:text-white'></input>
                </form>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                <p className='px-5 font-inter text-xs text-zinc-400 mt-2'>You can only change your name twice within 14 days.</p>
            </div>
        </div>
    )
}