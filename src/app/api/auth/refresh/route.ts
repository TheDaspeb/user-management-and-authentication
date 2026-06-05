import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/src/lib/jwt";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token no encontrado" },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshToken(refreshToken) as {
      userId: string;
      email: string;
      role: string;
    };

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    return NextResponse.json(
      {
        message: "Access token renovado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    const cookieStore = await cookies();

    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return NextResponse.json(
      {
        message: "Refresh token inválido o expirado",
      },
      { status: 401 }
    );
  }
}