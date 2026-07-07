import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { SyncSchema } from "@/lib/validations/contacts";

export async function PATCH(req) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const email = session.user?.email;

	if (!email) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();

	const result = SyncSchema.safeParse(body);

	if (!result.success) {
		return Response.json({ error: "invalid request" }, { status: 400 });
	}

	try {
		await connectMongoDB();

		const user = await User.findOne({ email });

		const localUpdated = new Date(result.data.updatedAt).getTime();
		const cloudUpdated = user.data.updatedAt ? new Date(user.data.updatedAt).getTime() : 0;

		const keepLocal = localUpdated > cloudUpdated;

		const primaryContacts = keepLocal ? result.data.contacts : user.data.contacts;

		const secondaryContacts = keepLocal ? user.data.contacts : result.data.contacts;

		const mergedMap = new Map();

		for (const contact of primaryContacts) {
			mergedMap.set(contact.number, contact);
		}

		for (const contact of secondaryContacts) {
			if (!mergedMap.has(contact.number)) {
				mergedMap.set(contact.number, contact);
			}
		}

		const mergedContacts = [...mergedMap.values()];

		user.data.contacts = mergedContacts;
		user.data.lastSync = new Date();

		if (keepLocal) {
			user.data.updatedAt = result.data.updatedAt;
		}

		await user.save();

		return Response.json({
			success: true,
			message: `Local and cloud contacts have been merged successfully. You now have ${mergedContacts.length} contacts.`,
			data: {
				updatedAt: user.data.updatedAt,
				contacts: mergedContacts,
			},
		});
	} catch (error) {
		return Response.json({ error: "internal server error" }, { status: 500 });
	}
}
