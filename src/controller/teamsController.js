const deleteTeamsService = require('../Services/deleteTeamsService')
const getTeamsService = require('../services/getTeamsService')
const postTeamsService = require('../Services/postTeamsService')
const putTeamsService = require('../Services/putTeamsService')

const getTeams = async (_, res) => {
	try {
		const teams = await getTeamsService()
		res.status(200).json(teams)
	} catch (error) {
		res.status(404).json({ message: error })
	}
}

const postTeams = async (req, res) => {
	try {
		const teams = await postTeamsService(req)
		res.status(200).json({
			message: 'Team created successfully',
			teams: teams,
		})
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: 'Error', errorMessage: error.message })
	}
}
const putTeams = async (req, res) => {
	try {
		const teams = await putTeamsService(req)
		res.status(200).json({
			message: 'Team modified successfully',
			teams: teams,
		})
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: 'Error', errorMessage: error.message })
	}
}

const deleteTeams = async (req, res) => {
	try {
		const teams = await deleteTeamsService(req)
		res.status(200).json({
			message: 'Team deleted successfully',
			teams: teams,
		})
	} catch (error) {
		console.log(error)
		res.status(404).json({ message: 'Error', errorMessage: error.message })
	}
}

module.exports = { getTeams, postTeams, putTeams, deleteTeams }
