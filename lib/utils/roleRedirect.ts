import { ROUTES } from "@/lib/utils/constant";

export function getRedirectPathByRole(role: string): string {
  return ["leader", "co_leader"].includes(role)
    ? ROUTES.DASHBOARD
    : ROUTES.MEMBER;
}
