import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const email = session.user.email;

	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const user = await User.findOne({ email: email });

	const contactsCount = user.data.contacts.length;

	const data = { contactsCount, updatedAt: user.data.updatedAt, lastSync: user.data.lastSync };

	return Response.json(data);
}
