import { z } from "zod";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";


export type RegisterInputType = z.infer<typeof RegisterInput>;
export type LoginInputType = z.infer<typeof LoginInput>;