const express = require('express')
const fs = require('fs/promises')
const app = express()
const PORT = 8080

app.use(express.json())

app.get('/teams', async (req, res) => {
	try {
		const teams = await fs.readFile(__dirname + '/db/database.txt', 'utf-8')
		const teamsParsed = JSON.parse(teams)
		res.status(200).json(teamsParsed)
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: 'Error' })
	}
})

app.get('/teams/:id', async (req, res) => {
	try {
		//Me traigo el id del parametro de la url => '/teams/:id'
		const id = req.params.id
		//Leo la base de datos (el .txt)
		const teams = await fs.readFile(__dirname + '/db/database.txt', 'utf-8')
		//Parseo a json la lectura de la bbdd
		const teamsParsed = JSON.parse(teams)
		//Leo el equipo con el id que me paso el usuario
		const teamResponse = teamsParsed.find((team) => team.id === Number(id))
		//Si existe equipo de ese id, devuelvo el eequipo
		if (teamResponse) res.status(200).json(teamResponse)
		//Devuelvo el error
		res.status(404).json({
			message: 'Error',
			errorMessage: 'Team not found.',
		})
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: 'Error', errorMessage: error.message })
	}
})

app.post('/teams', async (req, res) => {
	try {
		//Guardamos en una constante el nuevo equipo que nos pasa el usuario por body
		const newTeam = req.body

		//Leo la base de datos (el .txt)
		const teams = await fs.readFile(__dirname + '/db/database.txt', 'utf-8')
		//Parseo a json la lectura de la bbdd
		const teamsParsed = JSON.parse(teams)
		//Metodo post...
		const definitiveNewTeam = { ...newTeam, id: teamsParsed.length + 1 }
		teamsParsed.push(definitiveNewTeam)
		const stringTeamsParsed = JSON.stringify(teamsParsed)
		await fs.writeFile(
			__dirname + '/db/database.txt',
			stringTeamsParsed,
			'utf-8'
		)
		res.status(200).json({ message: 'Team created successfully' })
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: 'Error', errorMessage: error.message })
	}
})
app.put('/teams/:id', async (req, res) => {
	//Completar logica - Se empieza con:
	try {
		const editTeam = req.body
		const id = req.params.id
		const teams = await fs.readFile(__dirname + '/db/database.txt', 'utf-8')
		const teamsParsed = JSON.parse(teams)
		const teamResponse = teamsParsed.find((team) => team.id == Number(id))
		teamResponse.country = editTeam.country
		teamResponse.group = editTeam.group
		teamResponse.flag_url = editTeam.flag_url
		const teamFilter = teamsParsed.filter((team) => team.id !== Number(id))
		teamFilter.push({ ...teamResponse, id: Number(id) })
		const teamCompleteString = JSON.stringify(teamFilter)
		await fs.writeFile(
			__dirname + '/db/database.txt',
			teamCompleteString,
			'utf-8'
		)
		res.status(200).json({ message: 'Team modified successfully' })
	} catch (error) {
		console.log(error)
	}
})

app.delete('/teams/:id', async (req, res) => {
	try {
		const id = req.params.id
		const teams = await fs.readFile(__dirname + '/db/database.txt', 'utf-8')
		const teamsParsed = JSON.parse(teams)
		const teamFilter = teamsParsed.filter((team) => team.id !== Number(id))
		if (teamFilter.length === teamsParsed.length)
			res.status(404).json({ message: 'Equipo no encontrado' })
		const teamCompleteString = JSON.stringify(teamFilter)
		await fs.writeFile(
			__dirname + '/db/database.txt',
			teamCompleteString,
			'utf-8'
		)
		res.status(200).json({ message: 'Team descalificado' })
	} catch (err) {
		console.log(err)
	}
})

app.listen(PORT, () => console.log(`Servidor escuchando en ${PORT} :)`))
