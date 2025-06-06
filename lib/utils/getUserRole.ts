import { adminDb } from "@/lib/firebase/server";
import { USERS_DB_PATHS } from "@/lib/utils/constant";

export async function getUserRole(userId: string): Promise<string | null> {
  const userDoc = await adminDb.doc(USERS_DB_PATHS.userDoc(userId)).get();
  const user = userDoc.data();
  return user?.role ?? null;
}
