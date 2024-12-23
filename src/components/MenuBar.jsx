import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

function MenuBar() {
    return (
        <div className="flex w-full text-white shadow-md">
            <div className="grid grid-cols-3 bg-green-700 w-full text-center justify-items-center drop-shadow-sm items-center p-3">
                <div className='justify-self-start'>Whatschi</div>
                <div className='flex bg-green-800 px-6 py-2 gap-10 rounded-3xl shadow-inner'>
                    <div className='z-20 text-green-800'>Home</div>
                    <div>Contacts</div>
                </div>
                <div className='absolute bg-slate-200 w-[86px] h-[34px] -translate-x-[51px] rounded-3xl shadow-sm'></div>
                <div className='justify-self-end'>
                    <IoSettingsOutline size={20} color='white' />
                </div>
            </div>
        </div>
    )
}

export default MenuBar