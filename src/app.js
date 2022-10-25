const app = require('./server/server')
const PORT = 8080

app.listen(PORT, () =>
	console.log(`Servidor escuchando en http://localhost:${PORT} :)`)
)

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
