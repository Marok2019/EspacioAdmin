import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message:"Por favor ingresar un correo electronico válido",
    }),
    password: z.string().min(1,{
        message:"Por favor ingresar una contraseña válida",
    }),
});