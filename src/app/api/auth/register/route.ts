import { NextResponse } from "next/server";
import { RegisterInput } from "@/src/schemas/auth.schema";
import { authService } from "@/src/services/auth.service";
import { setAuthCookie } from "@/src/lib/cookies";

export async function POST(request:Request) {
    try {
        const body = await request.json();

        const data = RegisterInput.parse(body);

        const result = await authService.register(data);

        await setAuthCookie(result.accessToken, result.refreshToken);

        return NextResponse.json(
            {
                message: "Usuario registrado correctamente",
                user: result.user,
            },
            {status: 201}
        );
    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
        {
            message:
            error instanceof Error
            ? error.message
            : "Error al registrar usuario",
        },
        { status: 400 }
        );
    }
}