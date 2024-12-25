import loadStorage from '@/helpers/loadStorage'
import ContactCard from './ContactCard'
import saveStorage from '@/helpers/saveStorage'

function ContactsPage({ contacts, setContacts }) {

    const removeHandler = (contactNumber) => {
        const contactsData = loadStorage();
        const newContacts = contactsData.contacts.filter((item) => item.number !== contactNumber);
        contactsData.contacts = newContacts;
        saveStorage(contactsData);
        setContacts(newContacts)
    }

    return (
        <div className='flex flex-col items-center gap-4 pt-20 md:pt-24 p-4 w-screen h-screen overflow-auto'>
            {contacts.length ?
                contacts.map(contact => <ContactCard key={contact.number} contact={contact} removeHandler={removeHandler} />)
                :
                "You have no saved contact"}
        </div>
    )
}

export default ContactsPage