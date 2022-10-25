const express = require('express')
const serv = express()
const routes = require('../routes/routes')

serv.use(express.json())
serv.get('/', (req, res) => res.send('Servidor de estructuras funcionando'))

serv.use('/api', routes)

module.exports = serv
