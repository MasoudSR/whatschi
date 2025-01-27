import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user }) {
			const { email, name, image } = user;
			await connectMongoDB();
			const userExists = await User.findOne({ email });

			if (userExists) {
				console.log("user exist");
			} else {
				await User.create({ email, name, image });
			}

			return user;
		},
	},
};
