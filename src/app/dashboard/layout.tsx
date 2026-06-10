import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "220px", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h2>To Do List</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/tasks">Tareas</Link>
          <Link href="/dashboard/profile">Perfil</Link>
          <Link href="/dashboard/settings">Configuración</Link>
        </nav>
      </aside>

      <section style={{ flex: 1, padding: "24px" }}>
        {children}
      </section>
    </main>
  );
}