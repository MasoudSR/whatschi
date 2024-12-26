import localFont from "next/font/local";
import "./globals.css";
import MenuBar from "./../components/MenuBar";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "WhatsChi: WhatsApp Contact Manager",
	description:
		"Easily manage and organize your WhatsApp contacts with WhatsChi. Save, sync, and access contacts effortlessly.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#15803d" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
