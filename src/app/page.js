"use client";

import ContactsPage from "@/components/ContactsPage";
import HomePage from "@/components/HomePage";
import MenuBar from "@/components/MenuBar";

import { useState } from "react";

export default function Home() {
	const [page, setPage] = useState("home");

	const countryOptions = [
		{ code: "+98", country: "Iran" },
		{ code: "+90", country: "Turkey" },
		{ code: "+971", country: "UAE" },
		{ code: "+86", country: "China" },
		{ code: "+81", country: "Japan" },
		{ code: "+1", country: "USA" },
		{ code: "+44", country: "UK" },
		{ code: "+49", country: "Germany" },
		{ code: "+33", country: "France" },
		{ code: "+61", country: "Australia" },
	];

	// const getSelectValue = () => {
	// 	let formattedCountryCode = countryCode;
	// 	if (countryCode.startsWith("00")) {
	// 		formattedCountryCode = `+${countryCode.slice(2)}`;
	// 	} else if (!countryCode.startsWith("+")) {
	// 		formattedCountryCode = `+${countryCode}`;
	// 	}
	// 	const matchedCountry = countryOptions.find((option) => option.code === formattedCountryCode);
	// 	return matchedCountry ? formattedCountryCode : "";
	// };

	return (
		<div className="flex flex-col min-h-screen">
			<MenuBar page={page} setPage={setPage} />
			{page === "home" ? <HomePage /> : <ContactsPage />}
		</div>
	);
}
