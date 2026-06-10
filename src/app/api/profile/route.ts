import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/src/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);

    return NextResponse.json({
      message: "Ruta protegida funcionando",
      user: payload,
    });
  } catch {
    return NextResponse.json(
      { message: "Token inválido o expirado" },
      { status: 401 }
    );
  }
}