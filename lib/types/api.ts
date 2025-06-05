export type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

export const RES_MSG = {
  OK: "Request successful",
  CREATED: "Resource created successfully",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized access",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Internal server error",
} as const;

export type ClerkEventType = "user.created" | "user.updated" | "user.deleted";

export type ClerkUserPayload = {
  id: string;
  email_addresses: { id: string; email_address: string }[];
  primary_email_address_id: string | null;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  username?: string | null;
  created_at: number;
};
