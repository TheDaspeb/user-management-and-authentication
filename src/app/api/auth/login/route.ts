import { NextResponse } from "next/server";
import { authService } from "@/src/services/auth.service";
import { LoginInput } from "@/src/schemas/auth.schema";
import { setAuthCookie } from "@/src/lib/cookies";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const data = LoginInput.parse(body);

        const result = await authService.login(data);

        await setAuthCookie(result.accessToken, result.refreshToken);

        return NextResponse.json(
            {
                message: "Inicio de sesión exitoso",
                user: result.user,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Error al iniciar sesión",
            },
            { status: 401 }
        );
    }
}