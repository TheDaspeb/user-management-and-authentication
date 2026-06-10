import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        completed: {
            type: Boolean,
            default: false,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        startedAt: {
            type: Date,
        },

        completedAt: {
            type: Date,
        },

        durationSeconds: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Task = models.Task || model("Task", taskSchema);