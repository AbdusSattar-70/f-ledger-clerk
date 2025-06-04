// /lib/server/createUserIfNotExists.ts
import { currentUser } from "@clerk/nextjs/server";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { userConverter } from "../converters/userConverter";
import { db } from "../firebase/config";

export async function createUserIfNotExists() {
  const user = await currentUser();
  if (!user) return;

  const userRef = doc(db, "users", user.id).withConverter(userConverter);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      id: user.id,
      name: user.firstName || "Unnamed",
      avatar: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      role: "member",
      groupId: "",
      createdAt: serverTimestamp(),
    });
  }
}
