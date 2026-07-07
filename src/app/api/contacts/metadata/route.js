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

		const [user] = await User.aggregate([
			{
				$match: {
					email,
				},
			},
			{
				$project: {
					_id: 0,
					contactsCount: {
						$size: {
							$ifNull: ["$data.contacts", []],
						},
					},
					updatedAt: "$data.updatedAt",
					lastSync: "$data.lastSync",
				},
			},
		]);

		if (!user) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}

		return Response.json(user);
	} catch (error) {
		console.log(error);

		return Response.json({ error: "internal server error" }, { status: 500 });
	}
}
