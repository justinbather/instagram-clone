import homeIcon from '../../assets/icons/home-icon-white-outline.svg'
import searchIcon from '../../assets/icons/search-icon-white-inactive.svg'
import newPostIcon from '../../assets/icons/newpost-icon-white.png'
import reelsIcon from '../../assets/icons/reels-icon-white-outline.svg'

import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <div className="flex flex-row w-full h-30 py-3 bg-black justify-around items-center border-t-[.5px] border-slate-500">
            <a href='http://localhost:3000/home'>
                <img className='w-6 h-6' src={homeIcon}></img>
            </a>
            <a href='http://localhost:3000/search'>
                <img className='w-6 h-6' src={searchIcon}></img>
            </a>
            <img className='w-6 h-6' src={newPostIcon}></img>
            
            <img className='w-6 h-6' src={reelsIcon}></img>
            <a href='http://localhost:3000/profile'>
                <div className='w-6 h-6 rounded-full bg-white'></div>
            </a>
        </div>
    )
}