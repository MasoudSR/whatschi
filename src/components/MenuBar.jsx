"use client"

import React, { useState } from 'react'
import { IoSettingsOutline, IoSettings } from "react-icons/io5";
import Settings from './Settings';
import { IoChevronBack } from "react-icons/io5";


function MenuBar({ page, setPage, countryCode, setCountryCode }) {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isCountriesShowing, setIsCountriesShowing] = useState(false)

    const settingsBtnHandler = () => {
        setIsSettingsOpen(!isSettingsOpen)
        setIsCountriesShowing(false)
    }


    return (
        <div className="flex flex-col w-full text-white select-none max-w-screen-md m-auto md:p-3 fixed top-0 left-[50%] -translate-x-[50%] z-20">
            <div className={`bg-green-700 w-full text-center  drop-shadow-sm p-3 shadow-md md:rounded-[1.7rem] md:px-5 transition-all duration-300 overflow-hidden ${isSettingsOpen ? "h-screen md:h-[calc(100vh-26px)]" : "h-14"}`}>
                <div className='grid grid-cols-3 justify-items-center items-center'>
                    <div className={`justify-self-start flex ${isSettingsOpen ? "cursor-pointer" : ""}`} onClick={() => { isSettingsOpen && settingsBtnHandler() }}>
                        <div className={`transition-all duration-300 overflow-hidden -translate-x-1 ${isSettingsOpen ? "w-4" : "w-0"}`}>
                            <IoChevronBack size={22} />
                        </div>
                        <div>
                            WhatsChi
                        </div>
                    </div>
                    <div className='relative'>
                        <div className={`flex bg-green-800 rounded-3xl relative shadow-inner text-xs px-[3px] transition-all duration-300 ${isSettingsOpen ? "scale-0 opacity-0 -translate-y-5" : "scale-100 opacity-100"}`}>
                            <div className={`flex items-center justify-center transition-all w-[70px] h-[32px] z-20 ${page === "home" ? "text-green-800" : "cursor-pointer"}`} onClick={() => { setPage("home") }}>Home</div>
                            <div className={`flex items-center justify-center transition-all w-[70px] h-[32px] z-20 ${page === "contacts" ? "text-green-800" : "cursor-pointer"}`} onClick={() => { setPage("contacts") }}>Contacts</div>
                            <div className={`transition-all absolute bg-slate-200 h-[26px] w-[72px] top-[3px] rounded-3xl shadow-sm ${page !== "home" && "translate-x-[68px]"}`}></div>
                        </div>
                        <div className={`absolute top-[2px] left-[25%] text-xl transition-all duration-300 ${isSettingsOpen ? "opacity-100" : "opacity-0 translate-y-8"}`}>Settings</div>
                    </div>
                    <div className={`flex justify-self-end cursor-pointer p-1 rounded-full relative`} onClick={settingsBtnHandler}>
                        <IoSettings size={20} color='white' className={`absolute transition-all duration-300 ${isSettingsOpen ? "rotate-[360deg] opacity-100" : "opacity-0"}`} />
                        <IoSettingsOutline size={20} color='white' className={`transition-all duration-300 ${isSettingsOpen ? "rotate-[295deg] opacity-0" : "opacity-100"}`} />
                    </div>
                </div>
                <div className={`h-full py-6 transition-all duration-300 ${isSettingsOpen ? "opacity-100" : "opacity-0 translate-y-8"}`}>
                    <Settings countryCode={countryCode} setCountryCode={setCountryCode} isCountriesShowing={isCountriesShowing} setIsCountriesShowing={setIsCountriesShowing} />
                </div>
            </div>
        </div>
    )
}

export default MenuBar