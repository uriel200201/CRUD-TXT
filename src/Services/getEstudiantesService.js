const axios = require('axios')

const getEstudiantesService = async (req) => {
	const { cantidad } = req.params

	const cantidadParsed = Number(cantidad)

	const arrayPeople = []

	for (let i = 0; i < cantidadParsed; i++) {
		const people = await axios.get('https://randomuser.me/api/')
		console.log(people.data.results[0].name)
		if (!people) throw new Error('Error :(')
		const { first, last } = people.data.results[0].name
		arrayPeople.push({ first, last })
	}
	return arrayPeople
}

module.exports = getEstudiantesService
