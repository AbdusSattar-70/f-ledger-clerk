import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Auth | F-Ledger",
  description: "Your Family Finance Tracker",
};
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
