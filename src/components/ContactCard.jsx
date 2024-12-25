import { BiSolidUserX } from "react-icons/bi"

function ContactCard({ contact, removeHandler }) {

    return (
        <div
            className={`border border-gray-200 w-full max-w-screen-sm shrink-0 shadow-sm shadow-green-100 bg-white rounded-2xl overflow-hidden transition-all duration-300`}>
            <div className="p-3 border-b border-[#F4F4F4]">
                <div>{contact.name}</div>
                <div className="text-slate-400 text-xs">{contact.number}</div>
            </div>
            <div className="p-3 flex gap-6 justify-between">
                <a href={contact.link} target="_blank" className='w-full p-3 shadow-sm shadow-green-300 rounded-[2rem] bg-green-500 text-white text-center'>
                    <button>Open WhatsApp</button>
                </a>
                {/* <a href={contact.link} target="_blank">
                    <button>open</button>
                </a> */}
                <button className='border py-2 px-3 rounded-2xl' onClick={() => removeHandler(contact.number)}>
                   <BiSolidUserX size={26} />
                </button>
            </div>
        </div>
    )
}

export default ContactCard