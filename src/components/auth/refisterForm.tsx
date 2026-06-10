'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/Card';
import Link from 'next/link';

export function RegisterForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    setMessage('¡Usuario registrado exitosamente! Redirigiendo...');
    setIsSuccess(true);
    setTimeout(() => (window.location.href = '/dashboard'), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyber-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <Card variant="elevated" className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-400 to-cyber-400 bg-clip-text text-transparent mb-2">
            Crea tu Cuenta
          </h1>
          <p className="text-dark-300 text-sm">Únete a la plataforma de gestión inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-dark-200 text-sm font-medium mb-2">Nombre Completo</label>
            <Input
              type="text"
              placeholder="Juan Pérez"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-dark-200 text-sm font-medium mb-2">Correo Electrónico</label>
            <Input
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-dark-200 text-sm font-medium mb-2">Contraseña</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
          </Button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg border text-sm ${
            isSuccess
              ? 'bg-green-500/10 border-green-500/20 text-green-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-dark-700/50">
          <p className="text-center text-dark-400 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
