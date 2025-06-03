import { z } from "zod";
import { Timestamp } from "firebase/firestore";
import { FEEDBACK_MSG } from "@/lib/utils/constant";

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

// ==============================
// Sign-up form validation
// ==============================
export const signUpSchema = z
  .object({
    name: z.string().min(2, FEEDBACK_MSG.NAME_REQUIRED),
    email: z.string().email(FEEDBACK_MSG.INVALID_EMAIL),
    password: z.string().min(6, FEEDBACK_MSG.WEEK_PASSWORD),
    confirmPassword: z.string().optional(),
    avatar: z.string().url(FEEDBACK_MSG.INVALID_AVATAR).optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: FEEDBACK_MSG.PASSWORD_UNMATCHED,
    }
  );

export type SignUpFormData = z.infer<typeof signUpSchema>;

// ==============================
// Login form validation
// ==============================
export const loginSchema = z.object({
  email: z.string().email(FEEDBACK_MSG.INVALID_EMAIL),
  password: z.string().min(6, FEEDBACK_MSG.WEEK_PASSWORD),
});

export type LoginFormData = z.infer<typeof loginSchema>;
