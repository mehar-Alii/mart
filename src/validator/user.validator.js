import { z } from "zod";

const registerUserSchema = z.object({
    firstName: z.string().trim().min(3),
    
    lastName: z.string().trim().min(3),

    email: z.string().trim().email(),

    password: z
        .string()
        .min(8)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

const loginUserSchema = z.object({
    email : z.string({ required_error: "email is required" }).email(),
    password: z.string()
})

export { registerUserSchema , loginUserSchema}