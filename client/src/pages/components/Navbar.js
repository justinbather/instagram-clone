import homeIcon from '../../assets/icons/home-icon-white-outline.svg'
import searchIcon from '../../assets/icons/search-icon-white-inactive.svg'
import newPostIcon from '../../assets/icons/newpost-icon-white.png'
import reelsIcon from '../../assets/icons/reels-icon-white-outline.svg'


export const Navbar = () => {
    return(
        <div className="flex flex-row w-full h-30 py-3 bg-black justify-around items-center border-t-[.5px] border-slate-500">
            <img className='w-6 h-6' src={homeIcon}></img>
            <img className='w-6 h-6' src={searchIcon}></img>
            <img className='w-6 h-6' src={newPostIcon}></img>
            <img className='w-6 h-6' src={reelsIcon}></img>
            <div className='w-6 h-6 rounded-full bg-white'></div>
        </div>
    )
}