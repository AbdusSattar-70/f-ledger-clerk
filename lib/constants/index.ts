export const RoleEnum = ["leader", "co_leader", "member"] as const;

export const ROUTES = {
  ROOT: "/",
  AUTH: "/auth",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  DASHBOARD: "/dashboard",
};

export const API_ROUTES = {
  CURRENT_USER: "/api/users/current",
};

// Typing sentences
export const SENTENCES = [
  "Pay off debt and stay out for good",
  "Save more money without feeling restricted",
  "Have money saved for next month",
  "Feel confident with an irregular income",
  "Feel organized about my finances",
  "Be less stressed about money",
  "Stop arguing about money with my partner",
];

export const FEEDBACK_MSG = {
  auth: "Handled by Clerk",
};
