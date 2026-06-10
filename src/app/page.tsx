import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <nav>
        <h2>To Do List</h2>

        <div>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </div>
      </nav>

      <section>
        <h1>Organiza tus tareas con To Do List</h1>

        <p>
          Crea, edita, completa y elimina tareas de forma sencilla.
          Una aplicacion práctica para gestionar tu día.
        </p>

        <div>
          <Link href="/auth/register">Comenzar ahora </Link>
          <Link href="/auth/login">Ya tengo una cuenta</Link>
        </div>
      </section>
    </main>
  )
}