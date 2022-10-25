const fs = require('fs/promises')

const getTeamsService = async () => {
	const teams = await fs.readFile('./src/db/database.txt', 'utf-8')
	console.log(__dirname)
	const teamsParsed = JSON.parse(teams)
	return teamsParsed
}

module.exports = getTeamsService
