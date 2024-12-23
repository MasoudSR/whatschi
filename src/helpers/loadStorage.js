export default function loadStorage() {
	const contactsData = localStorage.getItem("contactsData");
	if (contactsData === null) {
		const date = new Date();
		const newContactsData = { updatedAt: date, contacts: [] };
		return newContactsData;
	} else {
		return JSON.parse(contactsData);
	}
}
