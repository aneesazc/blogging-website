import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInputSchema, updateBlogInputSchema } from "@aneesazc/medium-blog";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
  try {
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    c.set("userId", payload.id); // payload.id is the user id in the user table
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

blogRouter.post("/blog", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInputSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "invalid inputs" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: userId,
      },
    });
    c.status(201);
    return c.json({
      id: post.id,
    });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while creating a post" });
  }
});

blogRouter.put("/blog", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInputSchema.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "invalid inputs" });
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    c.status(201);
    return c.text("updated post");
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while updating a post" });
  }
});

blogRouter.get("/blog/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const posts = await prisma.post.findMany();
      console.log(posts);
      if (!posts) {
        c.status(404);
        return c.json({ error: "posts not found" });
      }
      c.status(200);
      return c.json(posts);
    } catch (error) {
      c.status(403);
      return c.json({ error: "error while getting posts" });
    }
  });
// blog/bulk needs to be placed before blog/:idx

blogRouter.get("/blog/:id", async (c) => {
  const id = c.req.param("id");
  const userId = c.get("userId");
  if (!userId) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!post) {
      c.status(404);
      return c.json({ error: "post not found" });
    }

    c.status(200);
    return c.json(post);
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while getting a post" });
  }
});


