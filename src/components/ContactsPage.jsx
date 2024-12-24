import loadStorage from '@/helpers/loadStorage'
import React, { useEffect, useState } from 'react'
import ContactCard from './ContactCard'
import saveStorage from '@/helpers/saveStorage'

function ContactsPage() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const contactsData = loadStorage()
        setContacts(contactsData.contacts)
    }, [])

    const removeHandler = (contactId) => {
        const contactsData = loadStorage();
        const newContacts = contactsData.contacts.filter((item) => item.id !== contactId);
        contactsData.contacts = newContacts;
        saveStorage(contactsData);
        setContacts(newContacts)
    }

    return (
        <div className='flex flex-col items-center gap-4 mt-4'>
            {contacts.length ?
                contacts.map(contact => <ContactCard key={contact.id} contact={contact} removeHandler={removeHandler} />)
                :
                "You have no saved contact"}
        </div>
    )
}

export default ContactsPage