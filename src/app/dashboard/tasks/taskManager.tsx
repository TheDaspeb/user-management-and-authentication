"use client";

import { Card } from "@/src/components/ui/Card";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { useTaskManager } from "./useTaskManager";

export function TaskManager() {
  const {
    tasks,
    users,
    isAdmin,
    loadingUsers,
    usersError,
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
  } = useTaskManager();

  return (
    <section className="space-y-6">
      <Card>
        <h1>Gestión de tareas</h1>
        <TaskForm
          title={title}
          description={description}
          assignedUserId={assignedUserId}
          users={users}
          isAdmin={isAdmin}
          loadingUsers={loadingUsers}
          usersError={usersError}
          editingId={editingId}
          message={message}
          onSubmit={handleSubmit}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onAssignedUserChange={setAssignedUserId}
          onCancelEdit={cancelEditing}
        />
      </Card>

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStart={startTask}
        onFinish={finishTask}
        onToggleCompleted={toggleCompleted}
        getElapsedSeconds={getElapsedSeconds}
        formatDuration={formatDuration}
      />
    </section>
  );
}
