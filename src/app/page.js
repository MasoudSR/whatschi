"use client";

import ContactsPage from "@/components/ContactsPage";
import HomePage from "@/components/HomePage";
import MenuBar from "@/components/MenuBar";
import loadStorage from "@/helpers/loadStorage";

import { useEffect, useState } from "react";

export default function Home() {
	const [page, setPage] = useState("home");

	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const contactsData = loadStorage();
		console.log(contactsData.contacts);
		setContacts(contactsData.contacts);
	}, []);

	return (
		<div className="overflow-hidden bg-green-50">
			<div>
				<MenuBar page={page} setPage={setPage} />
			</div>
			<div className={`flex w-[200vw]  ${page !== "home" ? "animate-smoothMoveLeft" : "animate-smoothMoveRight"}`}>
				<HomePage contacts={contacts} setContacts={setContacts} />
				<ContactsPage contacts={contacts} setContacts={setContacts} />
			</div>
		</div>
	);
}
