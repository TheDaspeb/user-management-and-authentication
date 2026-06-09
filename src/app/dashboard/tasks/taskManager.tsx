'use client';

import { useEffect, useState } from "react";
import { Task } from "@/src/types/auth.types";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/Card";

export function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditing] = useState<string | null>(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        if(!title.trim()) return;

        if(editingId) {
            setTasks((prevTasks)=>
                prevTasks.map((task) =>
                    task.id === editingId
                        ?{...task, title, description}
                        : task
                )
            );

            setEditing(null);

        } else {
            const newTask: Task = {
                id:crypto.randomUUID(),
                title,
                description,
                completed: false,
            };

            setTasks((prevTasks) => [... prevTasks, newTask]);
        }

        setTitle("");
        setDescription("");
    }

    function handleEdit(task:Task) {
        setEditing(task.id);
        setTitle(task.title);
        setDescription(task.description)
    }

    function handleDelete(id:string) {
        setTasks ((prevTasks)=> 
            prevTasks.filter((task)=> task.id !== id)
        );
    }

    function toggleCompleted(id:string){
        setTasks((prevTasks)=> 
            prevTasks.map((task)=>
            task.id === id
                ?{...task, completed:!task.completed}
                :task
            )
        );
    }


    return (
        <Card>
            <h1>Gestión de tareas</h1>

            <form onSubmit={handleSubmit}>
                <Input 
                    type="text"
                    placeholder="Titulo de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea 
                    placeholder="Descripción"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                />

                <Button type="submit">
                    {editingId ? "Actualizar tarea": "Crear tarea"}
                </Button>
            </form>

            <ul>
                {tasks.map((tasks) => (
                    <li key={tasks.id}>
                        <h3>{tasks.title}</h3>
                        <p>{tasks.description}</p>
                        <p>{tasks.completed}</p> 

                        <Button onClick={() => toggleCompleted(tasks.id)}>
                            Cambiar estado
                        </Button>   

                        <Button onClick={() => handleEdit(tasks)}>
                            Editar
                        </Button> 

                        <Button onClick={()=> handleDelete(tasks.id)}>
                            Eliminar
                        </Button>   
                    </li>
                ))}
            </ul>
        </Card>
    );
}