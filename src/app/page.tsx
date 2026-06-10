import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-8 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyber-400">To Do List</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Tu espacio para tareas productivas</h1>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Link
              href="/auth/login"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:border-cyber-400 hover:bg-cyber-950/90"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-2 text-white shadow-glow transition hover:opacity-95"
            >
              Regístrate
            </Link>
          </div>
        </nav>

        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-cyber-500/40 bg-cyber-950/50 px-4 py-2 text-sm text-cyber-200">Organiza, controla y cumple tus objetivos diarios</p>
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Gestiona tus tareas con una experiencia clara y práctica.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Todo lo que necesitas para crear, actualizar y completar tareas desde un panel seguro y fácil de usar. Diseñado para ayudarte a mantener el foco y avanzar cada día.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:opacity-95"
              >
                Comenzar ahora
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base text-white transition hover:border-cyber-400 hover:bg-cyber-950/80"
              >
                Ya tengo cuenta
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-200 shadow-lg shadow-black/20">
                <p className="text-3xl font-semibold text-white">100%</p>
                <p className="mt-2">Control total de tus tareas</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-200 shadow-lg shadow-black/20">
                <p className="text-3xl font-semibold text-white">Rápido</p>
                <p className="mt-2">Flujo de trabajo ligero y eficiente</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-200 shadow-lg shadow-black/20">
                <p className="text-3xl font-semibold text-white">Seguro</p>
                <p className="mt-2">Autenticación con JWT y sesiones controladas</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-10 shadow-cyber backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-dark-900/80 p-6 text-slate-300 shadow-lg shadow-black/20">
                <h3 className="text-xl font-semibold text-white">¿Qué puedes hacer?</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li>• Crear tareas con título, descripción y estado.</li>
                  <li>• Marcar tareas como completadas o pendientes.</li>
                  <li>• Editar y eliminar tareas fácilmente.</li>
                  <li>• Ver tu progreso en un panel limpio y moderno.</li>
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-dark-900/80 p-5 text-slate-300 shadow-lg shadow-black/20">
                  <h4 className="text-lg font-semibold text-white">Perfil</h4>
                  <p className="mt-2 text-sm text-slate-300">Administra tus datos y configura tu cuenta en segundos.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-dark-900/80 p-5 text-slate-300 shadow-lg shadow-black/20">
                  <h4 className="text-lg font-semibold text-white">Tareas</h4>
                  <p className="mt-2 text-sm text-slate-300">Nuestra interfaz hace fácil organizar tareas por prioridad y fecha.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-slate-400 shadow-lg shadow-black/10">
          <p>To Do List — gestión de tareas con autenticación segura y diseño responsive.</p>
        </footer>
      </div>
    </main>
  );
}
