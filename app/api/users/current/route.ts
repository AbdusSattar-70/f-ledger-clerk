/* =============================
Only for Authenticated Signle-User's(Current User) Actions.

app/api/users/current/route.ts
============================= */
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebase/server";
import { userSchema } from "@/lib/types/user";
import { http } from "@/lib/utils/http-response";
import { RES_MSG } from "@/lib/types/api";
import { Timestamp } from "firebase-admin/firestore";
import { loggerServer } from "@/logger/loggerServer";
import { USERS_DB_PATHS } from "@/lib/utils/constant";

// =============================
// GET: Fetch current user's data
// =============================
export async function GET() {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  try {
    const docRef = adminDb.doc(USERS_DB_PATHS.userDoc(userId));
    const snapshot = await docRef.get();

    if (!snapshot.exists) return http.notFound(RES_MSG.NOT_FOUND);

    const userData = userSchema.parse(snapshot.data());
    return http.ok(userData);
  } catch (err) {
    loggerServer.error(err);
    return http.internal(RES_MSG.SERVER_ERROR);
  }
}

// =============================
// POST: Create new user document
// =============================
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  try {
    const body = await req.json();
    const newUser = userSchema.parse({
      ...body,
      id: userId,
      createdAt: Timestamp.now(),
    });

    await adminDb.doc(USERS_DB_PATHS.userDoc(userId)).set(newUser);
    return http.created(newUser, RES_MSG.CREATED);
  } catch (err) {
    loggerServer.error(err);
    return http.badRequest(RES_MSG.BAD_REQUEST);
  }
}

// =============================
// PATCH: Update user data
// =============================
export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  const docRef = adminDb.doc(USERS_DB_PATHS.userDoc(userId));
  const snapshot = await docRef.get();

  if (!snapshot.exists) return http.notFound(RES_MSG.NOT_FOUND);

  try {
    const body = await req.json();
    const merged = userSchema.partial().parse({
      ...snapshot.data(),
      ...body,
    });

    await docRef.update(merged);
    return http.ok(merged, RES_MSG.OK);
  } catch (err) {
    loggerServer.error(err);
    return http.badRequest(RES_MSG.BAD_REQUEST);
  }
}

// =============================
// DELETE: Remove user document
// =============================
export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  try {
    await adminDb.doc(USERS_DB_PATHS.userDoc(userId)).delete();
    return http.ok({ userId: userId }, RES_MSG.OK);
  } catch (err) {
    loggerServer.error(err);
    return http.internal(RES_MSG.SERVER_ERROR);
  }
}
