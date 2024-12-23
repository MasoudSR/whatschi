import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

function MenuBar() {
    return (
        <div className="flex w-full text-white">
            <div className="flex bg-green-700 w-full text-center drop-shadow-sm justify-between items-center p-3">
                <div>Whatschi</div>
                <div className='flex bg-green-800 px-6 py-2 gap-7 rounded-3xl'>
                    <div>Home</div>
                    <div>Saved</div>
                </div>
                <div>
                    <IoSettingsOutline size={20} color='white' />
                </div>
            </div>
        </div>
    )
}

export default MenuBar