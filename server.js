const dev = process.env.NODE_ENV === 'development'
if (dev) {
  require('dotenv').config()
}
const express = require('express')
const next = require('next')
const admin = require('firebase-admin')

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const firebase = admin.initializeApp({
  credential: admin.credential.cert(require('./credentials/server')),
  databaseURL: 'https://can-daddy-play-minecraft.firebaseio.com' // TODO database URL goes here
}, 'server')

app.prepare()
  .then(() => {
    const server = express()

    server.use((req, res, next) => {
      req.firebaseServer = firebase
      next()
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
