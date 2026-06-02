import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error ('token no definida');
}

export function generateToken(payload:object) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d"
    });
}

export function verifyYoken(token:string) {
    return jwt.verify(token, JWT_SECRET);
}