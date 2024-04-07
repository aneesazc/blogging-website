import z from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6),
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const createBlogInputSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
})

export const updateBlogInputSchema = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
})


export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type CreateBlogInput = z.infer<typeof createBlogInputSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogInputSchema>;