import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import songRoutes from './routes/song.routes.js'
import playlistRoutes from './routes/playlist.routes.js'
import searchRoute from "./routes/search.route.js";

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/playlists', playlistRoutes)
app.use("/api/search", searchRoute);

export default app
