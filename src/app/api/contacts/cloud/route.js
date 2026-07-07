import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const email = session.user?.email;

	if (!email) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await connectMongoDB();

		const user = await User.findOneAndUpdate(
			{ email },
			{
				$set: {
					"data.lastSync": new Date(),
				},
			},
			{
				new: true,
				projection: {
					"data.contacts": 1,
					"data.updatedAt": 1,
				},
			},
		);

		if (!user) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		return Response.json({
			success: true,
			message: "Local contacts successfully replaced with cloud data.",
			data: {
				updatedAt: user.data.updatedAt,
				contacts: user.data.contacts,
			},
		});
	} catch (error) {
		console.error(error);

		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
}
