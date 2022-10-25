const express = require('express')
const server = express()
const fs = require('fs/promises')
const routes = require('../routes/routes')

server.use(express.json())
server.get('/', (_, res) => {
	res.send('Servidor de estructuras funcionando :)')
})
server.use('/api', routes)

module.exports = server
