import { z } from "zod";
import { Timestamp } from "firebase/firestore";

// ==============================
// User schema (for Firestore)
// ==============================
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  avatar: z.string().nullable(),
  email: z.string().email(),
  role: z.enum(["leader", "co_leader", "member"]),
  groupId: z.string(),
  createdAt: z.instanceof(Timestamp),
});

export type User = z.infer<typeof userSchema>;
