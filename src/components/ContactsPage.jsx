import loadStorage from '@/helpers/loadStorage'
import React, { useEffect, useState } from 'react'
import ContactCard from './ContactCard'

function ContactsPage() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const contactsData = loadStorage()
        setContacts(contactsData.contacts)
        console.log(contactsData.contacts);
    }, [])


    return (
        <div className='flex flex-col items-center gap-4 mt-4'>
            {contacts.length ?
                contacts.map((contact, index) => <ContactCard key={index} contact={contact} />)
                :
                "You have no saved Contact"}
        </div>
    )
}

export default ContactsPage