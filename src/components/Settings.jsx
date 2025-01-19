import CountryCodeSelector from './modules/CountryCodeSelector';
import { TbWorldPin } from "react-icons/tb";
import { IoChevronBack } from "react-icons/io5";

function Settings({ countryCode, setCountryCode, isCountriesShowing, setIsCountriesShowing, defaultCountryCode, setDefaultCountryCode, manualCountryCode, setManualCountryCode, countryOptions, isManualCountryCode, setIsManualCountryCode, isCodeChanged, setIsCodeChanged }) {

    const defaultCountryShowHandler = () => {

        const isFromList = countryOptions.some(country => country.code === defaultCountryCode);

        if (isFromList && manualCountryCode) {
            setManualCountryCode("")
            setIsCodeChanged(false)
            setIsManualCountryCode(false)
        }
        if (!isFromList && manualCountryCode !== defaultCountryCode) {
            setManualCountryCode(defaultCountryCode)
            setIsCodeChanged(false)
        }

        setIsCountriesShowing(!isCountriesShowing)
    }

    return (
        <div className='flex flex-col h-full justify-between'>
            <div className={`bg-green-800 rounded-2xl shadow-inner transition-all duration-300 overflow-hidden  ${isCountriesShowing ? "max-h-full" : "max-h-14"}`}>
                <div className='flex justify-between cursor-pointer py-4 px-5' onClick={defaultCountryShowHandler}>
                    <div className='flex gap-1 items-start'>
                        <TbWorldPin size={20} />
                        <div>
                            Default Country Code
                        </div>
                    </div>
                    <div className='text-gray-300 flex gap-2 items-center'>
                        <div className={`transition-all duration-300 ${isCountriesShowing ? "opacity-0 translate-y-6" : "opacity-100"}`}>
                            +{defaultCountryCode}
                        </div>
                        <div className={`transition-all duration-300 ${isCountriesShowing ? "rotate-90" : "rotate-180"}`}><IoChevronBack size={20} /></div>
                    </div>
                </div>
                <div className={`px-4 transition-all duration-300 h-[calc(100%-56px)] overflow-y-auto no-scrollbar ${isCountriesShowing ? "opacity-100" : "opacity-100 -translate-y-0"}`}>
                    <CountryCodeSelector setCountryCode={setCountryCode} setDefaultCountryCode={setDefaultCountryCode} defaultCountryCode={defaultCountryCode} manualCountryCode={manualCountryCode} setManualCountryCode={setManualCountryCode} countryOptions={countryOptions} isManualCountryCode={isManualCountryCode} setIsManualCountryCode={setIsManualCountryCode} isCodeChanged={isCodeChanged} setIsCodeChanged={setIsCodeChanged} />
                </div>
            </div>
            <div className='text-[10px] pt-2 text-emerald-200'>
                <div>WhatsChi v1.2.0</div>
                <div>Made by Masoud S.Rad</div>
            </div>
        </div>
    )
}

export default Settings