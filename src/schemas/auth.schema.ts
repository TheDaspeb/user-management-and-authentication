import { z } from "zod";

export const RegisterInput = z.object({
    fullName:z
    .string()
    .min(3, "El nombre debe tener minimo 3 caracteres"),

    email:z
    .email("El correo electrónico es inválido"),

    password:z
    .string()
    .min(6, "La contraseña debe ser nímino de 6 caracteres"),
});

export type RegisterInputType = z.infer<typeof RegisterInput>;

export const LoginInput = z.object({
    email:z
    .email("correo electronico inválido"),

    password:z
    .string()
    .min(6, "la contraseña debe tener al menos 6 caracteres"),
});

export type LoginInputType = z.infer<typeof LoginInput>