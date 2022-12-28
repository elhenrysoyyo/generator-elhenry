import { Router } from 'express'

const router = Router()

router.get('/test', (req, res) => res.json({ server: 'ok' }))

export default [
  router
]
