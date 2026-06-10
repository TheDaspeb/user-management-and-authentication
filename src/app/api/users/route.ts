import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/src/lib/mongodb";
import { verifyAccessToken } from "@/src/lib/jwt";
import { User } from "@/src/models/User.model";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const decoded = verifyAccessToken(token) as { role: string };

    if (decoded.role !== "ADMIN") {
      return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
    }

    const users = await User.find({}, "fullName email role createdAt").sort({ fullName: 1 });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("USERS ERROR:", error);
    return NextResponse.json({ message: "Error al obtener usuarios" }, { status: 500 });
  }
}
