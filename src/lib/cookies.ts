import { cookies } from "next/headers";

export async function setAuthCookie(
    accessToken:string, 
    refreshToken:string) {
    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 15// 15 min
    });


    cookieStore.set('refreshToken', refreshToken, {
        httpOnly:true, 
        secure:process.env.NODE_ENV === "production",
        sameSite: "strict", 
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 día 
    })
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}