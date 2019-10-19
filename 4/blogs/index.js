const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)
console.log(config)
server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})