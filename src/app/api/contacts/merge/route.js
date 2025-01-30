import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function PATCH(req) {
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

	const mergedContacts = [];

	if (new Date(localContactsData.updatedAt) > new Date(user.data.updatedAt)) {
		//  keep localData
		mergedContacts.push(...localContactsData.contacts);
		user.data.contacts.forEach((cloudContact) => {
			const exists = mergedContacts.find((c) => c.number === cloudContact.number);
			if (!exists) {
				mergedContacts.push(cloudContact);
			}
		});
		user.data.updatedAt = localContactsData.updatedAt;
	} else {
		//  keep cloudData;
		mergedContacts.push(...user.data.contacts);
		localContactsData.contacts.forEach((localContact) => {
			const exists = mergedContacts.find((c) => c.number === localContact.number);
			if (!exists) {
				mergedContacts.push(localContact);
			}
		});
	}

	const date = new Date();

	user.data.lastSync = date.toISOString();
	user.data.contacts = mergedContacts;

	await user.save();

	const data = { updatedAt: user.data.updatedAt, contacts: mergedContacts };

	return Response.json({
		success: true,
		message: `Local and cloud contacts have been merged successfully. You now have ${mergedContacts.length} contacts.`,
		data,
	});
}
