"use client";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/Card";
import type { Task } from "@/src/types/auth.types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStart: (task: Task) => void;
  onFinish: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
  getElapsedSeconds: (task: Task) => number;
  formatDuration: (seconds: number) => string;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStart,
  onFinish,
  onToggleCompleted,
  getElapsedSeconds,
  formatDuration,
}: TaskCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{task.title}</h3>
          <p className="text-slate-300">{task.description}</p>
          {task.assignedTo && (
            <p className="text-sm text-slate-300">
              Asignada a: {task.assignedTo}
              {task.assignedToEmail ? ` (${task.assignedToEmail})` : ""}
            </p>
          )}
          <p className="text-sm text-slate-300">Estado: {task.completed ? "Completada" : "Pendiente"}</p>
          {task.startedAt && !task.completed && (
            <p className="text-sm text-slate-300">Tiempo transcurrido: {formatDuration(getElapsedSeconds(task))}</p>
          )}
          {task.completed && (
            <p className="text-sm text-slate-300">Tiempo total: {formatDuration(getElapsedSeconds(task))}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {!task.startedAt && !task.completed && (
            <Button type="button" onClick={() => onStart(task)}>
              Comenzar tarea
            </Button>
          )}

          {task.startedAt && !task.completed && (
            <Button type="button" onClick={() => onFinish(task)}>
              Finalizar tarea
            </Button>
          )}

          <Button type="button" onClick={() => onToggleCompleted(task)}>
            {task.completed ? "Marcar como pendiente" : "Cambiar estado"}
          </Button>

          <Button type="button" onClick={() => onEdit(task)}>
            Editar
          </Button>

          <Button type="button" variant="danger" onClick={() => onDelete(task._id)}>
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
}
