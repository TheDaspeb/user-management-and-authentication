import Link from "next/link";

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>

      <p>Bienvenido, estás autenticado correctamente.</p>

      <section>
        <h2>Opciones</h2>

        <ul>
          <li>
            <Link href="/dashboard/profile">Mi perfil</Link>
          </li>

          <li>
            <Link href="/dashboard/users">Usuarios</Link>
          </li>

          <li>
            <Link href="/dashboard/settings">Configuración</Link>
          </li>

          <li>
            <Link href="/dasboard/tasks">Tareas</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}