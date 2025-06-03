import { ROUTES } from "@/lib/utils/constant";
import Link from "next/link";

export function AuthButtons() {
  return (
    <div className="flex flex-row gap-4 mt-4 mb-6">
      <Link
        href={ROUTES.SIGN_IN}
        className="px-5 py-2.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800 text-center"
      >
        Sign In
      </Link>
      <Link
        href={ROUTES.SIGN_UP}
        className="px-5 py-2.5 text-sm font-medium text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800 text-center"
      >
        Sign Up
      </Link>
    </div>
  );
}
