"use client";

import type { Task } from "@/src/types/auth.types";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStart: (task: Task) => void;
  onFinish: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
  getElapsedSeconds: (task: Task) => number;
  formatDuration: (seconds: number) => string;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStart,
  onFinish,
  onToggleCompleted,
  getElapsedSeconds,
  formatDuration,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No hay tareas todavía.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStart={onStart}
          onFinish={onFinish}
          onToggleCompleted={onToggleCompleted}
          getElapsedSeconds={getElapsedSeconds}
          formatDuration={formatDuration}
        />
      ))}
    </div>
  );
}
