const morgan = require('morgan')

morgan.token('req-content', (req) => {
    if (req['body']) {
        if (req.body.password || req.body.passwordHash) {
            return JSON.stringify({ 'user': 'hiding user info' });
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

module.exports = requestLogger;