"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

import { auth } from "@/lib/firebase/config";
import { useUserStore } from "@/stores/useUserStore";
import { getRedirectPathByRole } from "@/lib/utils/roleRedirect";
import { ROUTES } from "@/lib/utils/constant";
import { SkeletonCard } from "../shared/skeleton-card";
import { getUserFromFirestore } from "@/lib/firebase/auth";

export const AuthInitializer = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const loading = useUserStore((state) => state.loading);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          const userDoc = await getUserFromFirestore(firebaseUser.uid);

          if (userDoc) {
            setUser(userDoc);

            const isUnauthPath =
              pathname === ROUTES.ROOT ||
              pathname === ROUTES.AUTH_HOME ||
              pathname === ROUTES.SIGN_IN ||
              pathname === ROUTES.SIGN_UP;

            if (isUnauthPath) {
              const redirectPath = getRedirectPathByRole(userDoc.role);
              if (pathname !== redirectPath) {
                router.replace(redirectPath); // Use replace to avoid stacking browser history
              }
            }
          } else {
            // User exists in auth but not in Firestore → force logout
            await auth.signOut();
            setUser(null);
            router.replace(ROUTES.SIGN_IN);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          router.replace(ROUTES.SIGN_IN);
        }
      } else {
        setUser(null);
        const unauthPaths = [ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.ROOT];
        if (!unauthPaths.includes(pathname)) {
          router.replace(ROUTES.SIGN_IN);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router, setUser, setLoading]);

  if (loading) return <SkeletonCard />;

  return null;
};
