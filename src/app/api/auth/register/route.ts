import { registerSchema } from "@/src/schemas/auth.schema";

export async function POST(request:Request) {
    const body = await request.json();

    const data = registerSchema.parse(body);

    console.log(data);

    return Response.json({
        message: "Datos válidos"
    })
}