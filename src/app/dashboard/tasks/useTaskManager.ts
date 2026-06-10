import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Task } from "@/src/types/auth.types";
import type { UserOption } from "./types";

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    getTasks();
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      getUsers();
    }
  }, [isAdmin]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  async function fetchJson(url: string, init?: RequestInit) {
    const response = await fetch(url, {
      credentials: "include",
      ...init,
    });
    const data = await response.json().catch(() => null);
    return { response, data } as const;
  }

  async function getTasks() {
    const { response, data } = await fetchJson("/api/tasks");

    if (!response.ok) {
      setMessage(data?.message || "Error al cargar tareas");
      return;
    }

    setTasks(data.tasks || []);
  }

  async function getCurrentUser() {
    setAuthLoaded(false);

    try {
      const { response, data } = await fetchJson("/api/auth/me");

      if (!response.ok) {
        setIsAdmin(false);
        setUsersError(data?.message || "No autenticado");
        return;
      }

      setIsAdmin(data?.user?.role === "ADMIN");
      if (data?.user?.role !== "ADMIN") {
        setUsersError("Necesitas iniciar sesión como ADMIN para asignar tareas a otros usuarios.");
      }
    } catch (error) {
      setIsAdmin(false);
      setUsersError("Error al verificar sesión de usuario");
      console.error("Auth fetch error:", error);
    } finally {
      setAuthLoaded(true);
    }
  }

  async function getUsers() {
    setLoadingUsers(true);
    setUsersError(null);

    try {
      const { response, data } = await fetchJson("/api/users");

      if (!response.ok) {
        setUsers([]);
        setUsersError(data?.message || "No tienes permiso para ver los usuarios");
        return;
      }

      const usersList: UserOption[] = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.users)
        ? (data as any).users
        : [];

      setUsers(usersList);

      if (!assignedUserId && usersList.length > 0) {
        setAssignedUserId(usersList[0]._id);
      }

      if (usersList.length === 0) {
        setUsersError("No hay usuarios registrados para asignar tareas");
      }
    } catch (error) {
      setUsers([]);
      setUsersError("Error al cargar los usuarios, revisa la sesión o el servidor");
      console.error("User fetch error:", error);
    } finally {
      setLoadingUsers(false);
    }
  }

  async function updateTask(taskId: string, body: Record<string, unknown>) {
    const { response, data } = await fetchJson(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setMessage(data?.message || "Error al actualizar tarea");
      return null;
    }

    const updatedTask = data.task;
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? updatedTask : task)));
    return updatedTask;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("El título es obligatorio");
      return;
    }

    if (isAdmin && !assignedUserId) {
      setMessage("Debes seleccionar un usuario para asignar la tarea");
      return;
    }

    const body: Record<string, unknown> = { title, description };
    if (isAdmin && assignedUserId) {
      body.userId = assignedUserId;
    }

    const { response, data } = await fetchJson("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setMessage(data?.message || "Error al crear tarea");
      return;
    }

    setTasks((prevTasks) => [data.task, ...prevTasks]);
    setMessage(editingId ? "Tarea actualizada correctamente" : "Tarea creada correctamente");
    setEditingId(null);
    setAssignedUserId(assignedUserId || "");
    setTitle("");
    setDescription("");
  }

  function handleEdit(task: Task) {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setAssignedUserId(task.userId || users[0]?._id || "");
    setMessage("");
  }

  async function handleDelete(id: string) {
    const { response, data } = await fetchJson(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage(data?.message || "Error al eliminar tarea");
      return;
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    setMessage("Tarea eliminada correctamente");
  }

  async function startTask(task: Task) {
    await updateTask(task._id, { startedAt: new Date().toISOString() });
  }

  async function finishTask(task: Task) {
    await updateTask(task._id, { completed: true });
  }

  async function toggleCompleted(task: Task) {
    await updateTask(task._id, { completed: !task.completed });
  }

  function cancelEditing() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setMessage("");
  }

  function getElapsedSeconds(task: Task) {
    if (!task.startedAt) return 0;
    if (task.completed) return task.durationSeconds || 0;
    return Math.max(0, Math.floor((now - new Date(task.startedAt).getTime()) / 1000));
  }

  function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  return {
    tasks,
    users,
    isAdmin,
    loadingUsers,
    usersError,
    authLoaded,
    title,
    description,
    assignedUserId,
    editingId,
    message,
    setTitle,
    setDescription,
    setAssignedUserId,
    handleSubmit,
    handleEdit,
    handleDelete,
    startTask,
    finishTask,
    toggleCompleted,
    cancelEditing,
    getElapsedSeconds,
    formatDuration,
  };
}
