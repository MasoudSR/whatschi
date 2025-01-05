/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			animation: {
				smoothMoveLeft: "smoothMoveLeft 0.4s ease-in-out forwards",
				smoothMoveRight: "smoothMoveRight 0.4s ease-in-out forwards",
			},
			keyframes: {
				smoothMoveLeft: {
					"0%": { transform: "translateX(0)" },
					"80%": { transform: "translateX(-52%)" },
					"100%": { transform: "translateX(-50%)" },
				},
				smoothMoveRight: {
					"0%": { transform: "translateX(-50%)" },
					"80%": { transform: "translateX(2%)" },
					"100%": { transform: "translateX(0)" },
				},
			},
		},
	},
	plugins: [require("tailwindcss-animated")],
};
