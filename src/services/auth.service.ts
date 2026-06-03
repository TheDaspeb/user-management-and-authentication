import { connectDB } from "../lib/mongodb";
import { hashPassword, comparePassword } from "../lib/password";
import { generateToken } from "../lib/jwt";
import { User } from "../models/User.model";
import type { LoginInputType, RegisterInputType } from "../schemas/auth.schema";


export const authService = {
    async register(data: RegisterInputType) {
        await connectDB();

        const userExists = await User.findOne({
            email: data.email
        });

        if (userExists) {
            throw new Error ("El usuario ya está registrado")
        }

        const hashedPassword = await hashPassword(data.password);
        
        const user = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: hashedPassword,
        });

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return {
            token, user: {
                id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        };
    },

    async login(data:LoginInputType) {
        await connectDB();

        const user = await User.findOne({
            email: data.email,
        });
        
        if (!user) {
            throw new Error("Credenciales inválidas")
        }

        const isPasswordValid = await comparePassword(
            data.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Credenciales inválidas")
        }

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        return {
            token, user: {
                id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        };
    },
};