import { useState } from "react"
import { BiSolidUserX } from "react-icons/bi"
import { FaCheck, FaWhatsapp } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"

function ContactCard({ contact, removeHandler }) {

    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)

    return (
        <div
            className={`border border-gray-200 w-full max-w-screen-sm shrink-0 shadow-sm shadow-green-100 bg-white rounded-2xl overflow-hidden transition-all duration-500 max-h-40 mb-4`}>
            <div className="p-3 border-b border-[#F4F4F4] flex gap-2 items-center">
                <div className='rounded-full w-[50px] h-[50px] bg-gray-100 border border-gray-200 flex justify-center items-center'>{contact.name?.charAt(0) === '+'
                    ? contact.name?.charAt(contact.name.length - 1)
                    : contact.name?.charAt(0)}</div>
                <div>
                    <div>{contact.name}</div>
                    <div className="text-slate-400 text-xs">{contact.number}</div>
                </div>
            </div>
            <div className="p-3 flex gap-2 justify-between">
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
        </div >
    )
}

export default ContactCard