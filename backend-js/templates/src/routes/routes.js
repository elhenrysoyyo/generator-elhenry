const router = require('express').Router()

router.get('/test', (req, res) =>  res.json({ server: 'ok' }))

module.exports = [
  router
]
