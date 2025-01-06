import { useRef, useState } from "react"
import { BiSolidUserCheck, BiSolidUserX } from "react-icons/bi"
import { FaArrowLeft, FaCheck, FaPhoneAlt, FaUser, FaUserEdit, FaWhatsapp } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { MdColorLens } from "react-icons/md";

function ContactCard({ contact, removeHandler, editHandler }) {

    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(contact.name)
    const [color, setColor] = useState(contact.color || "gray")
    const [isSaved, setIsSaved] = useState(false)
    const inputRef = useRef(null);

    const handleCancelEdit = () => {
        if (isEditing) {
            setColor(contact.color || "gray")
            setName(contact.name)
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }

    const handleEditSubmit = () => {
        const newContact = { ...contact, name, color }
        editHandler(newContact)
        setIsEditing(false)
        setIsSaved(true)
        setTimeout(() => {
            setIsSaved(false)
        }, 1500);
    }

    const changeColor = (selectedColor) => {
        setColor(selectedColor)
    }

    const clearAndFocus = () => {
        setName("");
        inputRef.current.focus();
    };

    return (
        <div
            className={`border relative border-gray-200 w-full max-w-screen-sm shrink-0 shadow-sm shadow-green-100 bg-white rounded-2xl overflow-hidden transition-all duration-300 mb-4 max-h-96`}>
            <div className="border-b border-[#F4F4F4]">

                <div className={`p-3 flex justify-between`}>
                    <div className="flex gap-2 items-center relative">
                        <div className={`rounded-full shrink-0 w-[50px] h-[50px] border transition-all duration-500 border-gray-200 flex justify-center items-center ${color}`}>{contact.name?.charAt(0) === '+'
                            ? contact.name?.charAt(contact.name.length - 1)
                            : contact.name?.charAt(0)}
                        </div>
                        <div className={`transition-all duration-300 ${isEditing ? "opacity-0 translate-y-20 pointer-events-none" : "opacity-100"}`}>
                            <div>{contact.name}</div>
                            <div className="text-slate-400 text-xs">{contact.number}</div>
                        </div>
                        <div className="w-10"></div>
                    </div>

                    <div className={`flex rounded-2xl h-12 absolute right-3 ${isEditing ? "bg-gray-100" : ""}`}>
                        <button className={`flex justify-center flex-col items-center transition-all duration-300 h-full rounded-2xl w-12 ${isEditing ? "" : ""}`} onClick={handleCancelEdit}>
                            <div className={`flex justify-center items-center transition-all duration-300 ${isEditing ? "scale-0 rotate-180" : ""}`}>
                                <FaUserEdit size={20} className={`absolute transition-all duration-300 ${isSaved ? "scale-0" : "scale-100"}`} />
                                <BiSolidUserCheck size={26} color='green' className={`transition-all duration-300 ${isSaved ? "scale-100" : "scale-0"}`} />
                            </div>

                            <span className={`transition-all duration-300 absolute ${isEditing ? "scale-100 rotate-[360deg]" : "scale-0"}`}><FaArrowLeft /></span>
                        </button>
                        <div className={`transition-all duration-300 overflow-hidden origin-right ${isEditing ? "opacity-100 scale-100 max-w-20" : "opacity-0 scale-0 max-w-0"}`}>
                            <button className="border py-1 px-5 rounded-2xl h-full bg-green-500 text-white border-green-200" onClick={handleEditSubmit}>Save</button>
                        </div>
                    </div>

                </div>
                <div className={`pt-0 flex flex-col overflow-hidden transition-all duration-300 ${isEditing ? "max-h-56 opacity-100" : "max-h-0 opacity-0 -translate-y-20"}`}>
                    <div className="p-3 flex flex-col gap-1">
                        <div className={`border-b border-gray-100 p-1 flex items-center gap-2`}>
                            <FaUser size={14} className="text-green-500 w-8" />
                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-sm text-gray-400">Name</span>
                                <div className="flex">
                                    <input type="text" ref={inputRef} className={`w-full focus:outline-none`} value={name} onChange={(e) => setName(e.target.value)} />
                                    <button type='button' className={`rounded-full transition-all ${name ? "scale-100" : "scale-0"}`}
                                        onClick={clearAndFocus}>
                                        <RxCross2 color='gray' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-slate-400 text-xs flex items-center m-2 gap-[2px]">
                            <FaPhoneAlt size={10} />{contact.number}
                        </div>
                        <div className={` border-t border-gray-100 p-1 flex items-center gap-2`}>
                            <MdColorLens size={17} className="text-green-500 w-8" />
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-400">Color</span>
                                <div className="flex gap-1">
                                    <button className={`rounded-full w-[25px] h-[25px] bg-gray-100 border border-gray-200 flex justify-center items-center outline-2 outline-gray-400 ${color === "gray" && "outline"}`} onClick={() => changeColor("gray")}></button>
                                    <button className={`rounded-full w-[25px] h-[25px] bg-red-100 border border-red-200 flex justify-center items-center outline-2 outline-red-400 ${color === "red" && "outline"}`} onClick={() => changeColor("red")}></button>
                                    <button className={`rounded-full w-[25px] h-[25px] bg-blue-100 border border-blue-200 flex justify-center items-center outline-2 outline-blue-400 ${color === "blue" && "outline"}`} onClick={() => changeColor("blue")}></button>
                                    <button className={`rounded-full w-[25px] h-[25px] bg-green-100 border border-green-200 flex justify-center items-center outline-2 outline-green-400 ${color === "green" && "outline"}`} onClick={() => changeColor("green")}></button>
                                    <button className={`rounded-full w-[25px] h-[25px] bg-orange-100 border border-orange-200 flex justify-center items-center outline-2 outline-orange-400 ${color === "orange" && "outline"}`} onClick={() => changeColor("orange")}></button>
                                    <button className={`rounded-full w-[25px] h-[25px] bg-yellow-100 border border-yellow-200 flex justify-center items-center outline-2 outline-yellow-400 ${color === "yellow" && "outline"}`} onClick={() => changeColor("yellow")}></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={`overflow-hidden transition-all duration-300`}>
                <div className=" p-3 flex gap-2 justify-between">

                    <a href={contact.link} target="_blank" className='w-full flex justify-center gap-1 p-3 shadow-sm shadow-green-300 rounded-[2rem] bg-green-500 text-white text-center'>
                        <span>Open</span>
                        <span className={`transition-all duration-300 ${showRemoveConfirm ? "scale-0 max-w-0" : "scale-100 max-w-36"}`}>WhatsApp</span>
                        <FaWhatsapp size={20} />
                    </a>
                    <div className={`flex border rounded-2xl transition-all duration-300 shadow-sm`}>
                        <button className={`flex  justify-center  font-bold items-center transition-all duration-300 w-12 rounded-2xl ${showRemoveConfirm ? " rounded-r-none text-red-500" : "text-black"}`} onClick={() => setShowRemoveConfirm(true)}>
                            <BiSolidUserX size={26} /><span className={`transition-all duration-300 origin-left text-red-500 ${showRemoveConfirm ? "scale-100" : "scale-0 w-0"}`}>?</span>
                        </button>
                        <div className={`overflow-hidden origin-right flex rounded-2xl bg-slate-100 transition-all duration-300 ${showRemoveConfirm ? "scale-100 opacity-100 w-24" : "scale-0 opacity-0 w-0"}`}>
                            <button className={`bg-gray-50 rounded-l-2xl border-l border-gray-300 transition-all duration-300 w-12`} onClick={() => setShowRemoveConfirm(false)}>
                                <RxCross2 size={20} className="m-auto" />
                            </button>
                            <button className={`bg-green-100 transition-all duration-300 w-12`} onClick={(e) => removeHandler(e, contact.number)}>
                                <FaCheck className="m-auto" color="green" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContactCard