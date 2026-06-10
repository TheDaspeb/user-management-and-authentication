import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/src/lib/mongodb";
import { verifyAccessToken } from "@/src/lib/jwt";
import { Task } from "@/src/models/Task.model";
import { User } from "@/src/models/User.model";

export async function GET() {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const decoded = verifyAccessToken(token) as { userId: string; role: string };

        const filter = decoded.role === "ADMIN" ? {} : { userId: decoded.userId };

        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .populate("userId", "fullName email role");

        const tasksData = tasks.map((task) => {
            const raw = task.toObject() as any;
            const assignedUser = typeof raw.userId === "object" ? raw.userId : null;

            return {
                ...raw,
                userId:
                    typeof raw.userId === "object" && raw.userId?._id
                        ? raw.userId._id.toString()
                        : raw.userId,
                assignedTo: assignedUser?.fullName || "",
                assignedToEmail: assignedUser?.email || "",
            };
        });

        return NextResponse.json({ tasks: tasksData }, { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "Error al obtener tareas" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const decoded = verifyAccessToken(token) as { userId: string; role: string };

        const body = await request.json();

        const userId =
            decoded.role === "ADMIN" && body.userId
                ? body.userId
                : decoded.userId;

        if (decoded.role === "ADMIN" && body.userId) {
            const assignedUserExists = await User.exists({ _id: body.userId });
            if (!assignedUserExists) {
                return NextResponse.json(
                    { message: "Usuario asignado no encontrado" },
                    { status: 404 }
                );
            }
        }

        const task = await Task.create({
            title: body.title,
            description: body.description,
            userId,
        });

        return NextResponse.json({ task }, { status: 201 });
    } catch {
        return NextResponse.json(
            { message: "Error al crear tarea" },
            { status: 500 }
        );
    }
}