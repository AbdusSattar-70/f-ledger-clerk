import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

// ==============================
// User schema (for Firestore)
// ==============================
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  avatar: z.string().nullable(),
  email: z.string().email(),
  role: z.enum(["leader", "co_leader", "member"]).default("member"),
  groupId: z.string().default(""),
  createdAt: z.instanceof(Timestamp),
});

export type User = z.infer<typeof userSchema>;

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
