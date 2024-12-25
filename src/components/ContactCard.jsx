function ContactCard({ contact, removeHandler }) {

    return (
        <div
            className={`border shrink-0 border-green-500 bg-green-400 rounded-2xl overflow-hidden w-64 transition-all duration-300`}>
            <div className="p-3 bg-white">
                <div>{contact.name}</div>
                <div className="text-slate-400 text-xs">{contact.number}</div>
            </div>
            <div className="p-3 flex justify-between">
                <a href={contact.link} target="_blank">
                    <button>open</button>
                </a>
                <button onClick={() => removeHandler(contact.number)}>remove</button>
            </div>
        </div>
    )
}

export default ContactCard