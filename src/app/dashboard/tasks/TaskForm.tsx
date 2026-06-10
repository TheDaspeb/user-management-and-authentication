"use client";

import type { FormEvent } from "react";
import type { UserOption } from "./types";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

interface TaskFormProps {
  title: string;
  description: string;
  assignedUserId: string;
  users: UserOption[];
  isAdmin: boolean;
  loadingUsers: boolean;
  usersError: string | null;
  editingId: string | null;
  message: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAssignedUserChange: (value: string) => void;
  onCancelEdit: () => void;
}

export function TaskForm({
  title,
  description,
  assignedUserId,
  users,
  isAdmin,
  loadingUsers,
  usersError,
  editingId,
  message,
  onSubmit,
  onTitleChange,
  onDescriptionChange,
  onAssignedUserChange,
  onCancelEdit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Título de la tarea</label>
        <Input
          type="text"
          placeholder="Ingresa un título claro"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">Descripción</label>
        <textarea
          className="w-full min-h-[120px] resize-none rounded-xl border border-white/10 bg-dark-900/80 px-4 py-3 text-white outline-none transition focus:border-cyber-500 focus:ring-2 focus:ring-cyber-500/20"
          placeholder="Describe la tarea y su objetivo"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </div>

      {isAdmin ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Asignar a</label>

          <select
            className="w-full rounded-xl border border-white/10 bg-dark-900/80 px-4 py-3 text-white outline-none transition focus:border-cyber-500 focus:ring-2 focus:ring-cyber-500/20"
            value={assignedUserId}
            onChange={(e) => onAssignedUserChange(e.target.value)}
            disabled={loadingUsers || users.length === 0}
          >
            <option value="">Selecciona un usuario</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName} ({user.email})
              </option>
            ))}
          </select>

          {loadingUsers && <p className="text-xs text-slate-400">Cargando usuarios...</p>}
          {!loadingUsers && users.length === 0 && (
            <p className="text-xs text-amber-300">No hay usuarios disponibles para asignar. Verifica que existan usuarios en la base de datos.</p>
          )}
          {usersError && !loadingUsers && (
            <p className="text-xs text-rose-300">{usersError}</p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-dark-900/80 p-4 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Solo administradores pueden asignar tareas.</p>
          <p>Inicia sesión con una cuenta ADMIN para seleccionar un usuario.</p>
          {usersError && (
            <p className="mt-2 text-xs text-rose-300">{usersError}</p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" className="rounded-full px-6 py-3">
          {editingId ? "Actualizar tarea" : "Crear tarea"}
        </Button>
        {editingId && (
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6 py-3"
            onClick={onCancelEdit}
          >
            Cancelar edición
          </Button>
        )}
      </div>

      {message && <p className="text-sm text-slate-300">{message}</p>}
    </form>
  );
}
