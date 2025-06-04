import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function AuthCallbackPage() {
  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_REDIRECT_URL
      }
      signUpFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_REDIRECT_URL
      }
    />
  );
}
