import { cookies } from "next/headers";

export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 día
    });
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();

    cookieStore.delete("token");
}