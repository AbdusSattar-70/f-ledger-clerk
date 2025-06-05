// app/api/users/admin/route.ts
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/lib/firebase/server";
import { http } from "@/lib/utils/http-response";
import { userSchema } from "@/lib/types/user";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return http.unauthorized();

  const currentUserSnap = await adminDb.doc(`users/${userId}`).get();
  const currentUser = currentUserSnap.data();

  if (!currentUser || !["leader", "co_leader"].includes(currentUser.role)) {
    return http.unauthorized();
  }

  try {
    const snapshot = await adminDb.collection("users").get();

    const users = snapshot.docs.map((doc) => {
      const data = doc.data();
      return userSchema.parse(data);
    });

    return http.ok(users);
  } catch (err) {
    console.error("[admin get users failed]", err);
    return http.internal();
  }
}
