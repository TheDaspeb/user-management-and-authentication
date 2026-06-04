import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "No autenticado",
        },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    return NextResponse.json(
      {
        user: decoded,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Token inválido",
      },
      { status: 401 }
    );
  }
}