const fs = require('fs/promises')

const putTeamsService = async (req) => {
	const editTeam = req.body
	const id = req.params.id
	const teams = await fs.readFile('./src/db/database.txt', 'utf-8')
	const teamsParsed = JSON.parse(teams)
	const teamResponse = teamsParsed.find((team) => team.id == Number(id))
	teamResponse.country = editTeam.country
	teamResponse.group = editTeam.group
	teamResponse.flag_url = editTeam.flag_url
	const teamFilter = teamsParsed.filter((team) => team.id !== Number(id))
	teamFilter.push({ ...teamResponse, id: Number(id) })
	const teamCompleteString = JSON.stringify(teamFilter)
	await fs.writeFile('./src/db/database.txt', teamCompleteString, 'utf-8')
	return JSON.parse(teamCompleteString)
}

module.exports = putTeamsService
