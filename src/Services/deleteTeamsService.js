const fs = require('fs/promises')

const deleteTeamsService = async (req) => {
	const id = req.query.id
	const teams = await fs.readFile('./src/db/database.txt', 'utf-8')
	const teamsParsed = JSON.parse(teams)
	const teamFilter = teamsParsed.filter((team) => team.id !== Number(id))
	if (teamFilter.length === teamsParsed.length)
		res.status(404).json({ message: 'Equipo no encontrado' })
	const teamCompleteString = JSON.stringify(teamFilter)
	await fs.writeFile('./src/db/database.txt', teamCompleteString, 'utf-8')
	return JSON.parse(teamCompleteString)
}

module.exports = deleteTeamsService
