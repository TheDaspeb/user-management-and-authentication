"use client";

import { stringify } from "querystring";
import React, { useState } from "react";
import { Card } from "../ui/Card";

export function RegisterForm() {
    const [form, setForm] = useState({
        fullName:"",
        email:"",
        password:"",
    });

    const [message, setMessage] = useState("");

    async function handleSubmite(e:React.FormEvent) {
        e.preventDefault();

        const response = await fetch("/api/auth/register", {
           method: "POST",
           headers: {
            "content-Type": "application/json",
           } ,
           body: JSON.stringify(form),
        });
        
        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message);
            return;
        }

        setMessage("Usuario registrado correctamente");
    }

    return (
        
        <Card>
            <form onSubmit={handleSubmite}>
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={form.fullName}
                    onChange={(e) =>
                        setForm({... form, fullName: e.target.value})
                    }
                />

                <input
                    type="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={(e) => 
                        setForm({...form, email: e.target.value})
                    }
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={(e) => 
                        setForm({...form, password: e.target.value})
                    }
                />
                <button type="submit">Registrarme</button>

                {message && <p>{message}</p>}
            </form>
        </Card>    
    );
}