import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

function MenuBar({page , setPage}) {
    return (
        <div className="flex w-full text-white shadow-md select-none">
            <div className="grid grid-cols-3 bg-green-700 w-full text-center justify-items-center drop-shadow-sm items-center p-3">
                <div className='justify-self-start'>Whatschi</div>
                <div className='flex bg-green-800 px-6 py-2 gap-10 rounded-3xl shadow-inner'>
                    <div className={`transition-all z-20 ${page === "home" ? "text-green-800" : "cursor-pointer"}`} onClick={()=>{setPage("home")}}>Home</div>
                    <div className={`transition-all z-20 ${page === "contacts" ? "text-green-800" : "cursor-pointer"}`} onClick={()=>{setPage("contacts")}}>Contacts</div>
                </div>
                <div className={`transition-all absolute bg-slate-200 h-[34px] rounded-3xl shadow-sm ${page === "home" ? " -translate-x-[51px] w-[86px]" : "translate-x-[41px] w-[105px]"}`}></div>
                <div className='justify-self-end'>
                    <IoSettingsOutline size={20} color='white' />
                </div>
            </div>
        </div>
    )
}

export default MenuBar