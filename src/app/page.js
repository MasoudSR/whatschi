"use client";

import ContactsPage from "@/components/ContactsPage";
import HomePage from "@/components/HomePage";
import MenuBar from "@/components/MenuBar";
import loadStorage from "@/helpers/loadStorage";

import { useEffect, useState } from "react";

export default function Home() {
	const [page, setPage] = useState("home");
	const [contacts, setContacts] = useState([]);
	const [countryCode, setCountryCode] = useState("98");
	const [defaultCountryCode, setDefaultCountryCode] = useState("98");
	const [isManualCountryCode, setIsManualCountryCode] = useState(null);

	let startX = 0;

	const handleTouchStart = (e) => {
		const touch = e.touches[0];
		startX = touch.clientX;
	};

	const handleTouchEnd = (e) => {
		const touch = e.changedTouches[0];
		const diffX = touch.clientX - startX;

		if (diffX > 50 && page === "contacts") {
			setPage("home");
		} else if (diffX < -50 && page === "home") {
			setPage("contacts");
		}
	};

	useEffect(() => {
		const contactsData = loadStorage();
		setContacts(contactsData.contacts);
		const settings = JSON.parse(localStorage.getItem("settings"));
		if (settings) {
			setCountryCode(settings.defaultCode);
			setDefaultCountryCode(settings.defaultCode);

			const countryCodes = ["98", "90", "971", "86", "81", "1", "44", "49", "33", "61"];

			const isManualCode = !countryCodes.some((code) => code === settings.defaultCode);
			if (isManualCode) {
				setIsManualCountryCode(true);
			}
		}
	}, []);

	return (
		<div className="overflow-hidden bg-green-50">
			<div>
				<MenuBar
					page={page}
					setPage={setPage}
					countryCode={countryCode}
					setCountryCode={setCountryCode}
					defaultCountryCode={defaultCountryCode}
					setDefaultCountryCode={setDefaultCountryCode}
					setContacts={setContacts}
					isManualCountryCode={isManualCountryCode}
					setIsManualCountryCode={setIsManualCountryCode}
				/>
			</div>
			<div
				className={`flex w-[200vw]  ${page !== "home" ? "animate-smoothMoveLeft" : "animate-smoothMoveRight"}`}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}>
				<HomePage
					contacts={contacts}
					setContacts={setContacts}
					countryCode={countryCode}
					setCountryCode={setCountryCode}
				/>
				<ContactsPage contacts={contacts} setContacts={setContacts} />
			</div>
		</div>
	);
}
