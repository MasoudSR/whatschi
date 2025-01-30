import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function PUT(req) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const email = session.user.email;
	const localContactsData = await req.json();

	try {
		await connectMongoDB();
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}

	const user = await User.findOne({ email: email });

	const date = new Date();

	user.data.lastSync = date.toISOString();
	user.data.updatedAt = localContactsData.updatedAt;
	user.data.contacts = localContactsData.contacts;

	await user.save();

	return Response.json({
		success: true,
		message: "Local contacts have been successfully synced and replaced in the cloud.",
	});
}
