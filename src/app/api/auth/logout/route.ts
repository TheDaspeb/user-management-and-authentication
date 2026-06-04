import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/src/lib/cookies";

export async function POST() {
  await clearAuthCookie();

  return NextResponse.json({
    message: "Sesión cerrada correctamente",
  });
}