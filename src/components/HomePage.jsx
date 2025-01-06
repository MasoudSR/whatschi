import React, { useEffect, useState } from 'react'
import { BiSolidUserCheck, BiSolidUserPlus, BiSolidUserX } from 'react-icons/bi';
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { FaWhatsapp } from "react-icons/fa";
import Image from 'next/image';
import { IoChevronBack } from 'react-icons/io5';
import { RxCross2 } from "react-icons/rx";

function HomePage({ contacts, setContacts }) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+98");
    const [contactDetails, setContactDetails] = useState({});
    const [saveStatus, setSaveStatus] = useState("add");


    useEffect(() => {
        if (contactDetails) {
            const isExist = contacts.findIndex(contact => contact.number === contactDetails.number)
            console.log(isExist);
            if (isExist === -1) {
                setSaveStatus("add");
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts])


    const numberHandler = (e) => {
        e.preventDefault()
        if (!countryCode) {
            alert("Country Code Missing");
            return;
        }
        if (!phoneNumber) {
            alert("Phone Number Missing");
            return;
        }

        let formattedCountryCode = countryCode;
        if (countryCode.startsWith("00")) {
            formattedCountryCode = `+${countryCode.slice(2)}`;
        } else if (!countryCode.startsWith("+")) {
            formattedCountryCode = `+${countryCode}`;
        }

        const countryCodeRegex = /^\+([1-9]\d{0,2})$/;

        if (!countryCodeRegex.test(formattedCountryCode)) {
            alert("Country Code Invalid");
            return;
        }

        let formattedPhoneNumber = phoneNumber;
        if (phoneNumber.startsWith("0")) {
            formattedPhoneNumber = phone.slice(1);
        }

        const phoneNumberRegex = /^\d{9,15}$/;

        if (!phoneNumberRegex.test(formattedPhoneNumber)) {
            alert("Phone Number Invalid");
            return;
        }

        const formattedNumber = formattedCountryCode + formattedPhoneNumber;

        const link = `https://wa.me/${formattedNumber}`;

        const existContact = contacts.find(item => item.number === formattedNumber)
        if (existContact) {
            setContactDetails(existContact);
            setSaveStatus("remove");
        } else {
            setContactDetails({ name: formattedNumber, number: formattedNumber, link: link });
            setSaveStatus("add");
        }
    };

    const handleContactAction = () => {
        if (saveStatus === "add") {
            saveHandler();
        } else if (saveStatus === "remove") {
            removeHandler();
        }
    };

    const saveHandler = () => {
        const contactsData = loadStorage();
        contactsData.contacts.push(contactDetails);
        saveStorage(contactsData);
        setContacts(contactsData.contacts)
        setSaveStatus("added");
        setTimeout(() => {
            setSaveStatus("remove");
        }, 1500);
    };

    const removeHandler = () => {
        const contactsData = loadStorage();
        const newContacts = contactsData.contacts.filter((contact) => contact.number !== contactDetails.number);
        contactsData.contacts = newContacts;
        saveStorage(contactsData);
        setContacts(contactsData.contacts)
        setSaveStatus("add");
    };

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

    const getSelectValue = () => {
        let formattedCountryCode = countryCode;
        if (countryCode.startsWith("00")) {
            formattedCountryCode = `+${countryCode.slice(2)}`;
        } else if (!countryCode.startsWith("+")) {
            formattedCountryCode = `+${countryCode}`;
        }
        const matchedCountry = countryOptions.find((option) => option.code === formattedCountryCode);
        return matchedCountry ? formattedCountryCode : "";
    };

    return (
        <div className="flex flex-col h-screen overflow-x-hidden items-center gap-14 p-3 pt-36 pb-16 w-screen">
            <Image src="/logo.png" alt='logo' width={150} height={150} className="pointer-events-none drop-shadow" />
            <div className="card w-full max-w-screen-sm">
                <div className={`card__content relative transition-transform duration-1000 h-[185px] ${contactDetails.link && "flip"}`}>
                    <form onSubmit={numberHandler} className="rounded-3xl border border-gray-200 shadow-2xl shadow-green-300 w-full max-w-screen-sm bg-white card__front absolute top-0 bottom-0 right-0 left-0">
                        <div className='p-4 border-b border-[#F4F4F4] w-full'>
                            <p className="self-start text-gray-700 text-sm p-3 pt-0">Enter Phone Number</p>
                            <div className="flex w-full">
                                {/* <select
                            value={getSelectValue()}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="">
                            {countryOptions.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.country}
                                </option>
                            ))}
                            <option value="">Manual</option>
                        </select> */}
                                <div className='flex w-full bg-[#F5F5F5] rounded-full items-center'>
                                    <input
                                        type="text"
                                        className="w-16 px-4 py-2 rounded-l-full focus:outline-none bg-[#F5F5F5] border-r"
                                        placeholder="+98"
                                        value={countryCode}
                                        onChange={(e) => {
                                            setCountryCode(e.target.value);
                                        }}
                                    />
                                    <div className='w-[1px] h-full bg-[#F4F4F4]'></div>
                                    <input
                                        type="tel"
                                        className="w-[100%] px-4 py-2 rounded-r-full focus:outline-none bg-[#F5F5F5]"
                                        placeholder="9121234567"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        value={phoneNumber}
                                    />
                                    <button type='button' className={`p-3 rounded-full transition-all ${phoneNumber ? "scale-100" : "scale-0"}`}
                                        onClick={() => setPhoneNumber("")}>
                                        <RxCross2 color='gray' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='px-5 py-4 w-full'>
                            <input type="submit" value="Show" className="w-full p-3 shadow-sm shadow-green-300 rounded-[2rem] bg-green-500 text-white" />
                        </div>
                    </form>

                    <div className="flex flex-col rounded-3xl border border-gray-200 shadow-2xl shadow-green-300 w-full max-w-screen-sm bg-white card__back absolute top-0 bottom-0 right-0 left-0">
                        <div className='p-4 border-b gap-2 border-[#F4F4F4] w-full flex items-center h-full'>
                            <button className='p-1' onClick={() => { setContactDetails({ ...contactDetails, link: "" }) }}><IoChevronBack size={20} /></button>
                            <div className='rounded-full w-[50px] h-[50px] bg-gray-100 border border-gray-200 flex justify-center items-center'>{contactDetails.name?.charAt(0) === '+'
                                ? contactDetails.name?.charAt(contactDetails.name.length - 1)
                                : contactDetails.name?.charAt(0)}</div>
                            <div className="flex flex-col">
                                <div>{contactDetails.name}</div>
                                <div className="text-slate-400 text-xs">{contactDetails.number}</div>
                            </div>
                        </div>
                        <div className='px-5 py-4 w-full flex justify-between gap-4'>

                            <a href={contactDetails.link} target="_blank" className='w-full p-3 shadow-sm shadow-green-300 rounded-[2rem] bg-green-500 text-white'>
                                <button className='flex justify-center items-center m-auto gap-1'>Open WhatsApp<FaWhatsapp size={20} /></button>
                            </a>
                            <button onClick={handleContactAction} className='border w-16 rounded-2xl relative'>
                                <BiSolidUserPlus size={26} className={`absolute top-[21%] left-[25%] transition-all duration-500 ${saveStatus === "add" ? "scale-100" : "scale-0"}`} />
                                <BiSolidUserCheck size={26} color='green' className={`absolute top-[21%] left-[25%] transition-all duration-500 ${saveStatus === "added" ? "scale-100" : "scale-0"}`} />
                                <BiSolidUserX size={26} color='#F95959' className={`absolute top-[21%] left-[25%] transition-all duration-500 ${saveStatus === "remove" ? "scale-100" : "scale-0"}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default HomePage