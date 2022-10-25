const {
	getEstudiantes,
	postEstudiantes,
} = require('../controller/estudiantesController')

const routes = require('express').Router()

routes.get('/estudiantes/:cantidad', getEstudiantes)
routes.get('/estudiantes', postEstudiantes)

module.exports = routes
