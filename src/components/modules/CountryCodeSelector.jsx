import React from 'react'

function CountryCodeSelector({ countryCode, setCountryCode }) {

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

    const isManualCountryCode = !countryOptions.some(country => country.code === countryCode);

    const countryCodeChanger = (code) => {
        setCountryCode(code)
        localStorage.setItem("settings", JSON.stringify({ defaultCode: code }));
    }

    return (
        <div className='flex flex-col pt-2 py-4 px-1 relative'>
            {countryOptions.map((country, index) => <button key={index} className='flex justify-between z-10 px-4 py-3' onClick={() => countryCodeChanger(country.code)}>
                <div>
                    {country.country}
                </div>
                <div>
                    {country.code}
                </div>
            </button>)}
            <div className={`bg-green-900 shadow-sm w-full h-12 rounded-3xl absolute left-0 top-2 transition-all duration-300
                    ${isManualCountryCode ? "opacity-0 scale-0" : "opacity-100 scale-100"}
                    ${countryCode === "+98" && "translate-y-0"}
                    ${countryCode === "+90" && "translate-y-[100%]"}
                    ${countryCode === "+971" && "translate-y-[200%]"}
                    ${countryCode === "+86" && "translate-y-[300%]"}
                    ${countryCode === "+81" && "translate-y-[400%]"}
                    ${countryCode === "+1" && "translate-y-[500%]"}
                    ${countryCode === "+44" && "translate-y-[600%]"}
                    ${countryCode === "+49" && "translate-y-[700%]"}
                    ${countryCode === "+33" && "translate-y-[800%]"}
                    ${countryCode === "+61" && "translate-y-[900%]"}
                    `}></div>
            {/* <div className='flex gap-2 items-center bg-green-900 rounded-xl overflow-hidden mt-4'>
                <div className='px-4 py-2 bg-green-950/40'>Manual</div>
                <input type="number" placeholder='Your Custom Code' className='bg-green-900 w-full text-center focus:outline-none' />
            </div> */}
        </div>
    )
}

export default CountryCodeSelector