import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/userRoutes'
import { blogRouter } from './routes/blogRoutes'

const app = new Hono()

app.use('/api/*', cors())

app.route("/api/v1", userRouter)
app.route("/api/v1", blogRouter)

// To begin with, our backend will have 4 routes
// POST /api/v1/user/signup
// POST /api/v1/user/signin
// POST /api/v1/blog
// PUT /api/v1/blog
// GET /api/v1/blog/:id
// GET /api/v1/blog/bulk

export default app
