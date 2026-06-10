import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/src/lib/mongodb";
import { verifyAccessToken } from "@/src/lib/jwt";
import { Task } from "@/src/models/Task.model";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const decoded = verifyAccessToken(token) as { userId: string; role: string };
        const body = await request.json();

        const filter =
            decoded.role === "ADMIN"
                ? { _id: id }
                : { _id: id, userId: decoded.userId };

        const task = await Task.findOne(filter);

        if (!task) {
            return NextResponse.json(
                { message: "Tarea no encontrada" },
                { status: 404 }
            );
        }

        if (body.completed === true && task.startedAt && !task.durationSeconds) {
            body.durationSeconds = Math.floor(
                (new Date().getTime() - new Date(task.startedAt).getTime()) / 1000
            );
            body.completedAt = new Date();
        }

        const updatedTask = await Task.findOneAndUpdate(filter, body, {
            new: true,
        }).populate("userId", "fullName email role");

        if (!updatedTask) {
            return NextResponse.json(
                { message: "No se pudo actualizar la tarea" },
                { status: 500 }
            );
        }

        const raw = updatedTask.toObject() as any;

        return NextResponse.json(
            {
                task: {
                    ...raw,
                    userId:
                        typeof raw.userId === "object" && raw.userId?._id
                            ? raw.userId._id.toString()
                            : raw.userId,
                    assignedTo: raw.userId?.fullName || "",
                    assignedToEmail: raw.userId?.email || "",
                },
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Error al actualizar tarea" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 });
        }

        const decoded = verifyAccessToken(token) as { userId: string; role: string };

        const filter =
            decoded.role === "ADMIN"
                ? { _id: id }
                : { _id: id, userId: decoded.userId };

        const task = await Task.findOneAndDelete(filter);

        if (!task) {
            return NextResponse.json(
                { message: "Tarea no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Tarea eliminada correctamente" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Error al eliminar tarea" },
            { status: 500 }
        );
    }
}