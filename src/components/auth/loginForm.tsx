'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/Card';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      setIsLoading(false);
      return;
    }

    window.location.href = '/dashboard';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <Card variant="elevated" className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-2">
            TechTask Pro
          </h1>
          <p className="text-dark-300 text-sm">Gestión de tareas inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {message}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-dark-700/50">
          <p className="text-center text-dark-400 text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
