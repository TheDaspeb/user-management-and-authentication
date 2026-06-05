'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { email } from "zod";

export function LoginForm() {
    const router = useRouter();

    const [form, setForm] = useState ({
        email:"",
        password:"",
    });

    const [message, setMessage] = useState("");

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="emial"
                placeholder="Correo"
                value={form.email}
                onChange={(e)=>
                    setForm({ ...form, email: e.target.value})
                }
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e)=>
                    setForm({ ...form, password: e.target.value})
                }
            />

            <button type="submit">Iniciar Sesión</button>

            {message && <p>{message}</p>}
        </form>
    );
}