'use strict';

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//routes
const hallsRoutes = require('./routes/halls.routes')
const moviesRoutes = require('./routes/movies.routes')
const moviescreeningRoutes = require('./routes/moviescreening.routes')


const ApiError = require('./models/ApiError')
const { webPort, logger } = require('./config/config')

const port = process.env.PORT || webPort

let app = express()

// bodyParser parses the body from a request
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})) // parse application/vnd.api+json as json

// Instal Morgan as logger
app.use(morgan('dev'))

//Database connection (NOSQL, MONGODB)
// if (process.env.NODE_ENV == 'testCloud' || process.env.NODE_ENV == 'production') {
//     mongoose.connect('mongodb+srv://AvansHogeschool:CWEqQvl366hIB67r@clusterrenemongo-ozzvk.mongodb.net/test?retryWrites=true',
//         { useNewUrlParser: true });
// } else
 if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/Filmcasussysteem',
        { useNewUrlParser: true });
}

// on shutdown disconnect from neo4j db
// process.on('exit', function () {
//     neo.driver.close();
// })

// Routes
app.use('/api', hallsRoutes)
app.use('/api', moviesRoutes)
app.use('/api', moviescreeningRoutes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
    // logger.error('Non-existing endpoint')
    const error = new ApiError('Non-existing endpoint', 404)
    next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    logger.error(err)
    res.status((err.code || 404)).json(err).end()
})

//
// When this server shuts down, we gracefully clean up all the mess behind us.
// This is where we release the database pool.
//
function shutdown() {
    logger.info('shutdown started')
    app.stop()
        // 	.then(() => {
        // pool.end((err) => {
        // 	if (err) {
        // 		logger.info('Error releasing connection in the database pool: ' + err.toString())
        // 		process.exit()
        // 	} else {
        // 		logger.info('All connections in the pool have ended')
        // 		process.exit()
        // 	}
        // })
        // })
        .then(() => {
            logger.info('process is stopping')
        })
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

// Start listening for incoming requests.
app.listen(port, () => {
    logger.info('Server running on port ' + port)
    logger.info('API documentation is available at ./api-docs/')
})

// Testcases need our app - export it.
module.exports = app