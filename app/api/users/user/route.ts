// app/api/users/user/route.ts
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebase/server";
import { http } from "@/lib/utils/http-response";
import { userSchema } from "@/lib/types/user";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  const requesterSnap = await adminDb.doc(`users/${userId}`).get();
  const requester = requesterSnap.data();

  if (!requester || !["leader", "co_leader"].includes(requester.role)) {
    return http.unauthorized("Only leader or co_leader can update users");
  }

  const body = await req.json();
  const { targetId, ...updateFields } = body;

  if (!targetId) return http.badRequest("Missing target userId");

  try {
    const targetSnap = await adminDb.doc(`users/${targetId}`).get();
    if (!targetSnap.exists) return http.notFound("Target user not found");

    const updated = userSchema.partial().parse({
      ...targetSnap.data(),
      ...updateFields,
    });

    await adminDb.doc(`users/${targetId}`).update(updated);

    return http.ok({ message: `User ${targetId} updated`, updated });
  } catch (err) {
    console.error("[user update failed]", err);
    return http.internal("Failed to update user");
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  const requesterSnap = await adminDb.doc(`users/${userId}`).get();
  const requester = requesterSnap.data();

  if (!requester || !["leader", "co_leader"].includes(requester.role)) {
    return http.unauthorized("Only leader or co_leader can delete users");
  }

  const { targetId } = await req.json();

  if (!targetId) return http.badRequest("Missing target userId");

  try {
    await adminDb.doc(`users/${targetId}`).delete();
    return http.ok({ message: `User ${targetId} deleted` });
  } catch (err) {
    console.error("[user delete failed]", err);
    return http.internal("Failed to delete user");
  }
}
