const {
	getTeams,
	postTeams,
	putTeams,
	deleteTeams,
} = require('../controller/teamsController')

const routes = require('express').Router()

routes.get('/teams', getTeams)
routes.post('/teams', postTeams)
routes.put('/teams/:id', putTeams)
routes.delete('/teams', deleteTeams)

module.exports = routes
