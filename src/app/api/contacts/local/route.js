import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { SyncSchema } from "@/lib/validations/contacts";

export async function PUT(req) {
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

	const localContactsData = result.data;

	try {
		await connectMongoDB();

		const user = await User.findOneAndUpdate(
			{ email },
			{
				$set: {
					"data.contacts": localContactsData.contacts,
					"data.updatedAt": localContactsData.updatedAt,
					"data.lastSync": new Date(),
				},
			},
			{
				new: true,
			},
		);

		if (!user) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		return Response.json({
			success: true,
			message: "Local contacts have been successfully synced and replaced in the cloud.",
		});
	} catch (error) {
		console.log(error);

		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
