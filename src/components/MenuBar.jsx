import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

function MenuBar({ page, setPage }) {
    return (
        <div className="flex w-full text-white select-none max-w-screen-md m-auto md:p-3">
            <div className="grid grid-cols-3 bg-green-700 w-full text-center justify-items-center drop-shadow-sm items-center p-3 shadow-md md:rounded-full md:px-5">
                <div className='justify-self-start'>Whatschi</div>
                <div className='flex bg-green-800 rounded-3xl shadow-inner text-xs px-[3px]'>
                    <div className={`flex items-center justify-center transition-all w-[70px] h-[32px] z-20 ${page === "home" ? "text-green-800" : "cursor-pointer"}`} onClick={() => { setPage("home") }}>Home</div>
                    <div className={`flex items-center justify-center transition-all w-[70px] h-[32px] z-20 ${page === "contacts" ? "text-green-800" : "cursor-pointer"}`} onClick={() => { setPage("contacts") }}>Contacts</div>
                </div>
                <div className={`transition-all absolute bg-slate-200 h-[26px] w-[72px] rounded-3xl shadow-sm ${page === "home" ? " -translate-x-[34px]" : "translate-x-[34px]"}`}></div>
                <div className='justify-self-end'>
                    <IoSettingsOutline size={20} color='white' />
                </div>
            </div>
        </div>
    )
}

export default MenuBar