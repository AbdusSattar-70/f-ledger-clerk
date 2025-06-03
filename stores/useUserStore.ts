// import { getUserFromFirestore } from "@/lib/firebase/userServices";
// import { User } from "@/lib/types/user";
// import { onAuthStateChanged } from "firebase/auth";
// import { create } from "zustand";

// interface UserState {
//   currentUser: User | null;
//   loading: boolean;
//   authError: string | null;
//   setUser: (user: User | null) => void;
//   setLoading: (loading: boolean) => void;
//   setAuthError: (error: string | null) => void;
//   clearAuthError: () => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   currentUser: null,
//   loading: false,
//   authError: null,
//   setUser: (user) => set({ currentUser: user }),
//   setLoading: (loading) => set({ loading }),
//   setAuthError: (error) => set({ authError: error }),
//   clearAuthError: () => set({ authError: null }),
// }));

// onAuthStateChanged(auth, async (firebaseUser) => {
//   if (firebaseUser) {
//     try {
//       const userData = await getUserFromFirestore(firebaseUser.uid);
//       if (userData) {
//         useUserStore.getState().setUser(userData);
//       } else {
//         useUserStore.getState().setUser(null);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       useUserStore.getState().setUser(null);
//     }
//   } else {
//     useUserStore.getState().setUser(null);
//   }
// });
