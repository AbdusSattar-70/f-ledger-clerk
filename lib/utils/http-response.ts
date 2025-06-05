import { NextResponse } from "next/server";
import { HttpStatus, RES_MSG } from "@/lib/types/api";

function createResponse<T>(
  status: HttpStatus,
  data: T | null,
  message: string
) {
  return NextResponse.json({ data, message, status }, { status });
}

export const http = {
  ok: <T>(data: T, message = RES_MSG.OK) => createResponse(200, data, message),

  created: <T>(data: T, message = RES_MSG.CREATED) =>
    createResponse(201, data, message),

  badRequest: (message = RES_MSG.BAD_REQUEST) =>
    createResponse(400, null, message),

  unauthorized: (message = RES_MSG.UNAUTHORIZED) =>
    createResponse(401, null, message),

  notFound: (message = RES_MSG.NOT_FOUND) => createResponse(404, null, message),

  internal: (message = RES_MSG.SERVER_ERROR) =>
    createResponse(500, null, message),
};
