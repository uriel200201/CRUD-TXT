const getEstudiantesService = require('../Services/getEstudiantesService')

const getEstudiantes = async (req, res) => {
	try {
		const estudiantes = await getEstudiantesService(req)
		res.json(estudiantes)
	} catch (error) {
		res.json({ message: 'Algo salio mal', messageError: error })
	}
}
const postEstudiantes = (req, res) => {}

module.exports = { getEstudiantes, postEstudiantes }
