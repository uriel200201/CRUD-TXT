const fs = require('fs/promises')

const postTeamsService = async (req) => {
	//Guardamos en una constante el nuevo equipo que nos pasa el usuario por body
	const newTeam = req.body

	//Leo la base de datos (el .txt)
	const teams = await fs.readFile('./src/db/database.txt', 'utf-8')
	//Parseo a json la lectura de la bbdd
	const teamsParsed = JSON.parse(teams)
	console.log(teamsParsed[teamsParsed.length - 1]['id'] + 1)
	//Metodo post...
	const definitiveNewTeam = {
		...newTeam,
		id: teamsParsed[teamsParsed.length - 1]['id'] + 1,
	}
	teamsParsed.push(definitiveNewTeam)
	const stringTeamsParsed = JSON.stringify(teamsParsed)
	await fs.writeFile('./src/db/database.txt', stringTeamsParsed, 'utf-8')
	return teamsParsed
}

module.exports = postTeamsService
