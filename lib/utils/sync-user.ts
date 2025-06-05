// lib/utils/sync-user.ts
import { User } from "@/lib/types/user";
import { useUserStore } from "@/stores/useUserStore";
import { API_ROUTES } from "./constant";

export async function syncUserWithServer(clerkUser: {
  id: string;
  fullName: string | null;
  imageUrl: string;
  emailAddress: string;
}) {
  const { setUser, clearUser } = useUserStore.getState();

  try {
    const res = await fetch(API_ROUTES.CURRENT_USER);

    if (res.status === 200) {
      const user: User = await res.json();
      setUser(user);
    } else if (res.status === 404) {
      const newUser = {
        name: clerkUser.fullName ?? "No Name",
        email: clerkUser.emailAddress,
        avatar: clerkUser.imageUrl,
        role: "member",
        groupId: "",
      };

      const createRes = await fetch(API_ROUTES.CURRENT_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (createRes.ok) {
        const createdUser: User = await createRes.json();
        setUser(createdUser);
      } else {
        clearUser();
      }
    } else {
      clearUser();
    }
  } catch (err) {
    console.error("[syncUserWithServer]", err);
    clearUser();
  }
}
