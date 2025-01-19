import { FaCheck } from 'react-icons/fa';

function CountryCodeSelector({ setCountryCode, setDefaultCountryCode, defaultCountryCode, manualCountryCode, setManualCountryCode, countryOptions, isManualCountryCode, setIsManualCountryCode, isCodeChanged, setIsCodeChanged }) {

    const countryCodeChanger = (code) => {
        setManualCountryCode("")
        setIsManualCountryCode(false)
        setIsCodeChanged(false)
        setCountryCode(code)
        setDefaultCountryCode(code)
        localStorage.setItem("settings", JSON.stringify({ defaultCode: code }));
    }

    const manualCodeHandler = (e) => {
        setManualCountryCode(e.target.value)
        if (e.target.value) {
            setIsCodeChanged(true)
            setIsManualCountryCode(true)
        } else {
            setIsCodeChanged(false)
        }
    }

    const saveManualCodeHandle = () => {
        let formattedCountryCode = manualCountryCode;
        if (manualCountryCode.startsWith("00")) {
            formattedCountryCode = `${manualCountryCode.slice(2)}`;
        } else if (manualCountryCode.startsWith("+")) {
            formattedCountryCode = `${manualCountryCode.slice(1)}`;
        }

        const countryCodeRegex = /^([1-9]\d{0,2})$/;

        console.log(formattedCountryCode);
        if (!countryCodeRegex.test(formattedCountryCode)) {
            alert("Country Code Invalid");
            return;
        }

        setIsCodeChanged(false)
        setCountryCode(formattedCountryCode)
        setDefaultCountryCode(formattedCountryCode)
        localStorage.setItem("settings", JSON.stringify({ defaultCode: formattedCountryCode }));
    }


    return (
        <div className='flex flex-col pt-2 py-4 px-1 relative'>
            {countryOptions.map((country, index) => <button key={index} className='flex justify-between z-10 px-4 py-3' onClick={() => countryCodeChanger(country.code)}>
                <div>
                    {country.country}
                </div>
                <div>
                    +{country.code}
                </div>
            </button>)}
            <div className={`bg-green-900 shadow-sm w-full h-12 rounded-3xl absolute left-0 top-2 transition-all duration-300
                    ${isManualCountryCode ? "opacity-0 scale-0" : "opacity-100 scale-100"}
                    ${defaultCountryCode === "98" && "translate-y-0"}
                    ${defaultCountryCode === "90" && "translate-y-[100%]"}
                    ${defaultCountryCode === "971" && "translate-y-[200%]"}
                    ${defaultCountryCode === "86" && "translate-y-[300%]"}
                    ${defaultCountryCode === "81" && "translate-y-[400%]"}
                    ${defaultCountryCode === "1" && "translate-y-[500%]"}
                    ${defaultCountryCode === "44" && "translate-y-[600%]"}
                    ${defaultCountryCode === "49" && "translate-y-[700%]"}
                    ${defaultCountryCode === "33" && "translate-y-[800%]"}
                    ${defaultCountryCode === "61" && "translate-y-[900%]"}
                    `}></div>
            <div className='flex h-12 items-center bg-green-900 rounded-xl overflow-hidden mt-4'>
                <div className={`h-12 w-[40%] bg-green-950/30 transition-all duration-300 flex items-center justify-center`}>Manual</div>
                <input type="tel" placeholder='Country Code' className='bg-green-900 w-[60%] text-center focus:outline-none' value={manualCountryCode} onChange={manualCodeHandler} />
                <button className={`mr-2 p-2 rounded-full transition-all duration-300 ${isCodeChanged && isManualCountryCode ? "scale-100" : "scale-0"}`} onClick={saveManualCodeHandle}>
                    <FaCheck className="m-auto" />
                </button>
            </div>
        </div>
    )
}

export default CountryCodeSelector