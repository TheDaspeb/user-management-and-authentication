'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/src/components/ui/Card';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'No tienes permiso para ver los usuarios');
          setUsers([]);
        } else if (Array.isArray(data)) {
          setUsers(data);
          setError(null);
        } else if (Array.isArray((data as any).users)) {
          setUsers((data as any).users);
          setError(null);
        } else {
          setError('Error al cargar usuarios');
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark-50 mb-2">Gestión de Usuarios</h1>
        <p className="text-dark-400">Total: {users.length} usuarios registrados</p>
      </div>

      {error && (
        <Card variant="filled" className="text-center py-12 bg-red-500/10 border-red-500/20">
          <p className="text-red-400">{error}</p>
        </Card>
      )}

      {loading ? (
        <Card variant="filled" className="text-center py-12">
          <p className="text-dark-400">Cargando usuarios...</p>
        </Card>
      ) : users.length === 0 ? (
        <Card variant="filled" className="text-center py-12">
          <p className="text-dark-400">No hay usuarios registrados</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card key={user._id} variant="elevated">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-dark-50">{user.fullName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN'
                      ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                      : 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <p className="text-dark-400 text-sm break-all">{user.email}</p>
                {user.createdAt && (
                  <p className="text-dark-500 text-xs">
                    Registrado: {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
