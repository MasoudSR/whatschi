import loadStorage from '@/helpers/loadStorage'
import ContactCard from './ContactCard'
import saveStorage from '@/helpers/saveStorage'

function ContactsPage({ contacts, setContacts }) {

    const removeHandler = (e, contactNumber) => {
        const card = e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode
        card.classList.add("scale-0")
        setTimeout(() => {
            card.classList.remove("max-h-96")
            card.classList.add("max-h-0")
            card.classList.remove("mb-4")
            card.classList.add("mb-0")
            card.classList.remove("border")
            card.classList.add("border-0")
        }, 500);
        setTimeout(() => {
            const contactsData = loadStorage();
            const newContacts = contactsData.contacts.filter((item) => item.number !== contactNumber);
            contactsData.contacts = newContacts;
            saveStorage(contactsData);
            setContacts(newContacts)
        }, 1000);
    }

    const editHandler = (newContact) => {
        const contactsData = loadStorage();
        const index = contactsData.contacts.findIndex((contact) => contact.number === newContact.number)
        contactsData.contacts[index] = newContact
        saveStorage(contactsData);
        setContacts(contactsData.contacts)
    }

    return (
        <div className='flex flex-col items-center pt-20 md:pt-24 p-4 w-screen h-screen overflow-auto'>
            {contacts.length ?
                contacts.map(contact => <ContactCard key={contact.number} contact={contact} removeHandler={removeHandler} editHandler={editHandler} />)
                :
                <div className='mt-10 duration-300 animate-fade-up'>
                    No contacts saved yet.
                </div>
            }
        </div>
    )
}

export default ContactsPage