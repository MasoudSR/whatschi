import React, { useEffect, useState } from 'react'
import CountryCodeSelector from './modules/CountryCodeSelector';
import { TbWorldPin } from "react-icons/tb";
import { IoChevronBack } from "react-icons/io5";

function Settings({ countryCode, setCountryCode, isCountriesShowing, setIsCountriesShowing }) {

    const [defaultCountryCode , setDefaultCountryCode] = useState("+98")

    useEffect(() => {
        const settings = JSON.parse(localStorage.getItem("settings"));
		if (settings) {
			setDefaultCountryCode(settings.defaultCode);
		}
    }, [])
    

    const countryOptions = [
        { code: "+98", country: "Iran" },
        { code: "+90", country: "Turkey" },
        { code: "+971", country: "UAE" },
        { code: "+86", country: "China" },
        { code: "+81", country: "Japan" },
        { code: "+1", country: "USA" },
        { code: "+44", country: "UK" },
        { code: "+49", country: "Germany" },
        { code: "+33", country: "France" },
        { code: "+61", country: "Australia" },
    ];

    // const getSelectValue = () => {
    //     let formattedCountryCode = countryCode;
    //     if (countryCode.startsWith("00")) {
    //         formattedCountryCode = `+${countryCode.slice(2)}`;
    //     } else if (!countryCode.startsWith("+")) {
    //         formattedCountryCode = `+${countryCode}`;
    //     }
    //     const matchedCountry = countryOptions.find((option) => option.code === formattedCountryCode);
    //     return matchedCountry ? formattedCountryCode : "";
    // };

    return (
        <div className='flex flex-col h-full justify-between'>
            <div className={`bg-green-800 rounded-2xl shadow-inner transition-all duration-300 overflow-hidden  ${isCountriesShowing ? "max-h-full" : "max-h-14"}`}>
                <div className='flex justify-between cursor-pointer py-4 px-5' onClick={() => setIsCountriesShowing(!isCountriesShowing)}>
                    <div className='flex gap-1 items-start'>
                        <TbWorldPin size={20} />
                        <div>
                            Default Country Code
                        </div>
                    </div>
                    <div className='text-gray-300 flex gap-2 items-center'>
                        <div className={`transition-all duration-300 ${isCountriesShowing ? "opacity-0 translate-y-6" : "opacity-100"}`}>
                            {defaultCountryCode}
                        </div>
                        <div className={`transition-all duration-300 ${isCountriesShowing ? "rotate-90" : "rotate-180"}`}><IoChevronBack size={20} /></div>
                    </div>
                </div>
                <div className={`px-4 transition-all duration-300 h-[calc(100%-56px)] overflow-y-auto no-scrollbar ${isCountriesShowing ? "opacity-100" : "opacity-100 -translate-y-0"}`}>
                    <CountryCodeSelector countryCode={countryCode} setCountryCode={setCountryCode} setDefaultCountryCode={setDefaultCountryCode} />
                </div>

                {/* <div>
                    <select
                        value={getSelectValue()}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="">
                        {countryOptions.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.country}
                            </option>
                        ))}
                        <option value="">Manual</option>
                    </select>
                </div> */}

            </div>
            <div className='text-[10px] pt-2 text-emerald-200'>
                <div>WhatsChi v1.2.0</div>
                <div>Made by Masoud S.Rad</div>
            </div>
        </div>
    )
}

export default Settings