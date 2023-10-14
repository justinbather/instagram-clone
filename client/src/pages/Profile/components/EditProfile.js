import arrowIcon from '../../../assets/icons/back-arrow-icon-white.png';
import { useState } from 'react';
import { EditProfileForm } from './EditProfileForm';
import axios from 'axios';
import { UploadImageForm } from './UploadImageForm';

export const EditProfile = (props) => {

    const [editView, setEditView] = useState(false)
    const [imageUploadView, setImageUploadView] = useState(false)
    const [valueField, setValueField] = useState({})

    const toggleEdit = (field, value) => {
        setValueField({field: field, value: value})
        setEditView(!editView)
    }

    const toggleImageForm = () => {
        setImageUploadView(!imageUploadView)
    }

    

    if (editView) {
        return (
            <div>
                <EditProfileForm toggleEdit={toggleEdit} formObj={valueField} />
            </div>
        )
    }

    if (imageUploadView) {
        return (
            <div>
                <UploadImageForm toggleImageForm={toggleImageForm} />
            </div>
        )
    }


    return (
        <div className="w-full h-full bg-black flex flex-col">
            <div className="w-full flex flex-row justify-start mt-3 pb-3 gap-x-36 items-center border-b-zinc-600 border-b-[1px]">
                <a onClick={() => props.toggleEditView()}>
                    <img className="h-5 w-5" src={arrowIcon} ></img>
                </a>
                <h2 className="text-white font-bold text-md">Edit profile</h2>
            </div>
            <div className='w-full flex flex-row items-center my-10 justify-center'>
                <a onClick={toggleImageForm}>
                    <img className='h-20 w-20 rounded-full' src={props.user.profilePicture}></img>
                </a>
            </div>
            <div className='w-full flex flex-col'>
                <div className='w-full border-t-[1px] border-t-zinc-600 flex flex-row py-2 pl-2 justify-start gap-5' onClick={() => toggleEdit('username', props.user.username)}>
                    <h2 className="text-white font-inter text-md">Username</h2>
                    <h2 className="text-white font text-md">{props.user.username}</h2>
                </div>
                <div className='w-full border-t-[1px] border-t-zinc-600 flex flex-row py-2 pl-2 justify-start gap-5' onClick={() => toggleEdit('Pronouns')}>
                    <h2 className="text-white font-inter text-md">Pronouns</h2>
                    <h2 className="text-zinc-600 font text-md">Pronouns</h2>
                </div>
                <div className='w-full border-t-[1px] border-t-zinc-600 flex flex-row py-2 pl-2 justify-start gap-5' onClick={() => toggleEdit('bio', props.user.bio)}>
                    <h2 className="text-white font-inter text-md">Bio</h2>
                    <h2 className="text-white font text-md">{props.user.bio}</h2>
                </div>

            </div>
        </div>
    )
}