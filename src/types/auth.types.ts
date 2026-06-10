import { z } from "zod";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";

export type RegisterInputType = z.infer<typeof RegisterInput>;
export type LoginInputType = z.infer<typeof LoginInput>;

export type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    assignedTo?: string;
    assignedToEmail?: string;
    startedAt?: string;
    completedAt?: string;
    durationSeconds?: number;
    createdAt: string;
    updatedAt: string;
};

