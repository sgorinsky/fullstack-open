const logger = require('./logger')
const morgan = require('morgan')

morgan.token('req-content', (req, res) => {
    if (req['body']) {
        if (req.body.password || req.body.passwordHash) {
            return JSON.stringify({'user': 'hiding user info'});
        }
        return JSON.stringify(req['body']);
    } else {
        return '-';
    }
})

const requestLogger = morgan('method::method \
                              \nurl: :url \
                              \nstatus: :status \
                              \nremote address: :remote-addr \
                              \nrequest body: :req-content \
                              \nrequest length: :req[content-length] \
                              \nresponse length: :res[content-length] \
                              \nresponse time: :response-time ms\
                              \n----------------------');

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'wrong id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') { 
        return response.status(401).json({ error: 'invalid token' }) 
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}