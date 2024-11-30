"use client";

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

	const getSelectValue = () => {
		let formattedCountryCode = countryCode;
		if (countryCode.startsWith("00")) {
			formattedCountryCode = `+${countryCode.slice(2)}`;
		} else if (!countryCode.startsWith("+")) {
			formattedCountryCode = `+${countryCode}`;
		}
		const matchedCountry = countryOptions.find((option) => option.code === formattedCountryCode);
		return matchedCountry ? formattedCountryCode : "";
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div>WhatsChi</div>
				<div className="flex flex-col gap-3 items-center">
					<div>
						<select
							value={getSelectValue()}
							onChange={(e) => setCountryCode(e.target.value)}
							className="border p-2 rounded w-24">
							{countryOptions.map((c) => (
								<option key={c.code} value={c.code}>
									{c.country}
								</option>
							))}
							<option value="">Manual</option>
						</select>
						<input
							type="text"
							className="border p-2 rounded w-24 ml-2"
							placeholder="+98"
							value={countryCode}
							onChange={(e) => {
								setCountryCode(e.target.value);
							}}
						/>

						<input
							type="tel"
							className="bg-green-300 shadow-inner py-2 px-1 rounded-md"
							placeholder="9121234567"
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<button className="w-36 h-16 rounded-[2rem] bg-green-300 text-green-800" onClick={numberHandler}>
						OK
					</button>
				</div>
				<div
					className={`border border-green-500 bg-green-400 rounded-2xl overflow-hidden m-auto w-64 transition-all duration-300 ${
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
						<button>save</button>
					</div>
				</div>
			</main>
			<footer className="row-start-3 justify-around flex gap-6 items-center bg-green-200 p-4 rounded-3xl drop-shadow-sm w-full">
				<div className="">Home</div>
				<div>Saved</div>
			</footer>
		</div>
	);
}
