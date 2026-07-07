import { z } from "zod";

export const ContactSchema = z.object({
	name: z.string().trim().max(100).optional,

	number: z.string().regex(/^\+[1-9]\d{7,14}$/),

	color: z.enum(["gray", "red", "blue", "green", "orange", "yellow"]).optional(),
});

export const SyncSchema = z.object({
	updatedAt: z.iso.datetime(),
	contacts: z.array(ContactSchema).max(10000),
});
