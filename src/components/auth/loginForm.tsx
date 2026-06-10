'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/Card";


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
                "Content-Type": "application/json",
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

        <Card>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={(e) => 
                        setForm({... form, email:e.target.value})
                    }
                
                />

                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) => 
                        setForm({... form, password:e.target.value})
                    }
                />

                <Button type="submit">Iniciar Sesión</Button>

                {message && <p>{message}</p>}
            </form>
        </Card>
        
    );
}