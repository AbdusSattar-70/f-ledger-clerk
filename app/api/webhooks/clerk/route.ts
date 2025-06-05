import { Webhook } from "svix";
import { headers } from "next/headers";
import { http } from "@/lib/utils/http-response";
import { adminDb } from "@/lib/firebase/server";
import { loggerServer } from "@/logger/loggerServer";
import { userSchema } from "@/lib/types/user";
import { Timestamp } from "firebase-admin/firestore";
import { USERS_DB_PATHS } from "@/lib/utils/constant";
import { ClerkEventType, ClerkUserPayload } from "@/lib/types/api";

export async function POST(req: Request): Promise<Response> {
  const payload = await req.text();
  const header = await headers();

  // Check for required Svix headers
  const svixId = header.get("svix-id");
  const svixTimestamp = header.get("svix-timestamp");
  const svixSignature = header.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    loggerServer.error("Missing Svix headers");
    return http.badRequest();
  }

  const svix = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!);

  let event: { type: ClerkEventType; data: ClerkUserPayload };

  // Verify webhook payload
  try {
    event = svix.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof event;
  } catch (err) {
    loggerServer.error(`Webhook verification failed: ${err}`);
    return http.internal();
  }

  const { type, data } = event;
  const userId = data.id;
  const docRef = adminDb.doc(USERS_DB_PATHS.userDoc(userId));

  try {
    switch (type) {
      case "user.created": {
        const primaryEmail = data.email_addresses.find(
          (email) => email.id === data.primary_email_address_id
        )?.email_address;
        if (!primaryEmail) {
          loggerServer.error(`No primary email found for user ${userId}`);
          return http.internal();
        }
        const name =
          `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() ||
          data.username ||
          "Unnamed User";
        const userData = userSchema.parse({
          id: userId,
          email: primaryEmail,
          name,
          avatar: data.image_url,
          createdAt: Timestamp.fromMillis(data.created_at),
        });
        await docRef.set(userData);
        break;
      }

      case "user.updated": {
        const primaryEmail = data.email_addresses.find(
          (email) => email.id === data.primary_email_address_id
        )?.email_address;
        const name =
          `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() ||
          data.username ||
          "Unnamed User";
        const updateFields: Record<string, string> = {};
        if (primaryEmail !== undefined) updateFields.email = primaryEmail;
        if (name !== undefined) updateFields.name = name;
        if (data.image_url !== undefined) updateFields.avatar = data.image_url;
        if (Object.keys(updateFields).length > 0) {
          await docRef.update(updateFields);
        }
        break;
      }

      case "user.deleted": {
        const snapshot = await docRef.get();
        if (snapshot.exists) {
          await docRef.delete();
        } else {
          loggerServer.error(
            `User document for ${userId} not found for deletion`
          );
        }
        break;
      }

      default:
        loggerServer.error(`Unhandled event type: ${type}`);
        break;
    }

    return http.ok({ success: true });
  } catch (err) {
    loggerServer.error(err);
    return http.internal();
  }
}
