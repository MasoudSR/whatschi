export default function saveStorage(contactsData) {
	const newDate = new Date();
	contactsData.updatedAt = newDate;
	localStorage.setItem("contactsData", JSON.stringify(contactsData));
}
