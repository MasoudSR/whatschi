"use client";

import ContactsPage from "@/components/ContactsPage";
import MenuBar from "@/components/MenuBar";
import loadStorage from "@/helpers/loadStorage";
import saveStorage from "@/helpers/saveStorage";
import { useState } from "react";

export default function Home() {
	const [phoneNumber, setPhoneNumber] = useState();
	const [countryCode, setCountryCode] = useState("+98");
	const [contactDetails, setContactDetails] = useState({});
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

	const numberHandler = () => {
		if (!countryCode) {
			alert("Country Code Missing");
			return;
		}
		if (!phoneNumber) {
			alert("Phone Number Missing");
			return;
		}

		let formattedCountryCode = countryCode;
		if (countryCode.startsWith("00")) {
			formattedCountryCode = `+${countryCode.slice(2)}`;
		} else if (!countryCode.startsWith("+")) {
			formattedCountryCode = `+${countryCode}`;
		}

		const countryCodeRegex = /^\+([1-9]\d{0,2})$/;

		if (!countryCodeRegex.test(formattedCountryCode)) {
			alert("Country Code Invalid");
			return;
		}

		let formattedPhoneNumber = phoneNumber;
		if (phoneNumber.startsWith("0")) {
			formattedPhoneNumber = phone.slice(1);
		}

		const phoneNumberRegex = /^\d{9,15}$/;

		if (!phoneNumberRegex.test(formattedPhoneNumber)) {
			alert("Phone Number Invalid");
			return;
		}

		const formattedNumber = formattedCountryCode + formattedPhoneNumber;

		const link = `https://wa.me/${formattedNumber}`;

		setContactDetails({ name: formattedNumber, number: formattedNumber, link: link });
	};

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

	const saveHandler = () => {
		console.log(contactDetails);
		const contactsData = loadStorage();
		contactsData.contacts.push(contactDetails);
		saveStorage(contactsData);
	};

	return (
		<>
			<MenuBar page={page} setPage={setPage} />
			{page === "home" ? (
				<div className="flex flex-col min-h-screen justify-center items-center gap-3 p-3">
					<div className="flex flex-col items-center gap-3 w-full p-3 bg-green-400 rounded-lg">
						<p className="self-start text-gray-700">Enter Phone Number:</p>
						<div className="flex w-full">
							{/* <select
							value={getSelectValue()}
							onChange={(e) => setCountryCode(e.target.value)}
							className="border p-2 rounded w-24">
							{countryOptions.map((c) => (
								<option key={c.code} value={c.code}>
								{c.country}
								</option>
								))}
								<option value="">Manual</option>
								</select> */}
							<input
								type="text"
								className="p-2 rounded-l-md w-16 border-r"
								placeholder="+98"
								value={countryCode}
								onChange={(e) => {
									setCountryCode(e.target.value);
								}}
							/>

							<input
								type="tel"
								className=" w-[100%] py-2 pl-4 px-1 rounded-r-md"
								placeholder="9121234567"
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<button className="w-36 h-16 rounded-[2rem] bg-white text-green-800" onClick={numberHandler}>
							OK
						</button>
					</div>
					<div
						className={`border border-green-500 bg-green-400 rounded-2xl overflow-hidden w-64 transition-all duration-300 ${
							contactDetails.link ? "scale-100" : "scale-0"
						}`}>
						<div className="p-3 bg-white">
							<div>{contactDetails.name}</div>
							<div className="text-slate-400 text-xs">{contactDetails.number}</div>
						</div>
						<div className="p-3 flex justify-between">
							<a href={contactDetails.link} target="_blank">
								<button>open</button>
							</a>
							<button onClick={saveHandler}>save</button>
						</div>
					</div>
				</div>
			) : (
				<ContactsPage />
			)}
		</>
	);
}
