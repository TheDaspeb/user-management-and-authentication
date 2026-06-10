'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/button';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalUsers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const tasksRes = await fetch('/api/tasks');
        const tasksData = await tasksRes.json();
        
        const tasks = tasksData.tasks || [];
        const completed = tasks.filter((t: any) => t.completed).length;
        
        setStats({
          totalTasks: tasks.length,
          completedTasks: completed,
          pendingTasks: tasks.length - completed,
          totalUsers: 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total de Tareas', value: stats.totalTasks, icon: '📋', color: 'from-blue-600 to-blue-400' },
    { label: 'Completadas', value: stats.completedTasks, icon: '✅', color: 'from-green-600 to-green-400' },
    { label: 'Pendientes', value: stats.pendingTasks, icon: '⏳', color: 'from-orange-600 to-orange-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark-50 mb-2">Bienvenido al Panel</h1>
        <p className="text-dark-400">Administra tus tareas de forma eficiente</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <Card key={idx} variant="filled" className="group hover:shadow-cyber">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-dark-400 text-sm font-medium mb-2">{stat.label}</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="elevated">
          <h3 className="text-xl font-semibold text-dark-50 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <Button variant="primary" size="lg" className="w-full">
              ➕ Nueva Tarea
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              👥 Ver Usuarios
            </Button>
          </div>
        </Card>

        <Card variant="elevated">
          <h3 className="text-xl font-semibold text-dark-50 mb-4">Información</h3>
          <p className="text-dark-300 text-sm leading-relaxed">
            Gestiona tus tareas de forma inteligente con cronómetros en tiempo real y asignación flexible de usuarios.
          </p>
        </Card>
      </div>
    </div>
  );
}
