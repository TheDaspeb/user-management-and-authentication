'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Panel', icon: '📊' },
  { href: '/dashboard/tasks', label: 'Tareas', icon: '✓' },
  { href: '/dashboard/users', label: 'Usuarios', icon: '👥' },
  { href: '/dashboard/profile', label: 'Perfil', icon: '👤' },
  { href: '/dashboard/settings', label: 'Configuración', icon: '⚙️' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/auth/login';
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-dark-900 to-dark-950 border-r border-dark-700/50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-dark-700/50">
          <Link href="/dashboard" className="flex items-center gap-3">
            {sidebarOpen && (
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                TechTask
              </span>
            )}
            {!sidebarOpen && <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">T</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-200 hover:bg-dark-800/50 hover:text-primary-400 transition-colors group"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '←' : '→'}
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            🚪 {sidebarOpen && 'Salir'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Top Bar */}
        <header className="h-20 bg-dark-900/50 backdrop-blur border-b border-dark-700/50 flex items-center px-6">
          <h2 className="text-xl font-semibold text-dark-50">Gestión de Tareas</h2>
        </header>

        {/* Content */}
        <section className="p-6">
          {children}
        </section>
      </main>
    </div>
  );
}
