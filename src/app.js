const app = require('./server/server')
const port = 3000
app.listen(port, () =>
	console.log(`Example app listening on port http://localhost:${port} !`)
)
