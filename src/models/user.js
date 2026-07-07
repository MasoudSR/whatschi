import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	data: {
		updatedAt: { type: Date, default: null },
		lastSync: { type: Date, default: null },
		contacts: {
			type: [
				{
					name: { type: String },
					number: { type: String, required: true },
					color: { type: String, default: "gray" },
				},
			],
			default: [],
		},
	},
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
