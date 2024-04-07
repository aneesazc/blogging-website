import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinSchema, signupSchema } from "@aneesazc/backend-blog"

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>();
// POST /api/v1/user/signup
// POST /api/v1/user/signin

userRouter.post("/user/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signupSchema.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({ error: "invalid inputs" });
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password,
            }
        })
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(201);
		return c.json({ jwt });
        
    } catch (error) {
        c.status(403);
		return c.json({ error: "error while signing up" });
    }
    
})

userRouter.post("/user/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signinSchema.safeParse(body)
    console.log(success)
    if (!success) {
        c.status(411);
        return c.json({ error: "invalid inputs" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
        if (user.password !== body.password) {
            c.status(403);
            return c.json({ error: "invalid password" });
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(201);
		return c.json({ jwt });
        
        
    } catch (error) {
        c.status(403);
        return c.json({ error: "error while signing in" });
    }
    
})