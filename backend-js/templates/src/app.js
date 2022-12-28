require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
<% if (swagger) { %>
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../docs/swagger.json')
<% } %>
const corsOptions = require('./config/cors')
const { handleError, ErrorHandler } = require('./helpers/error')
const { BASE_PATH, URL<% if(sentry) { %>, NODE_ENV <%}%> } = require('./config/environment')

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

/* Cors */
app.use(cors(corsOptions))

/* Routes */
app.use(BASE_PATH, require('./routes/routes'))
<% if (swagger) { %>
/* Swagger */
app.use(`${BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup({ ...swaggerDoc, host: URL }))
<% }
if (sentry) { %>
/* Sentry */
if (['production', 'qa'].includes(NODE_ENV)) {
  const Sentry = require('./config/sentry')(app)
  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())
  app.use(Sentry.Handlers.errorHandler())
}
<% } %>
app.use((req, res) => {
  throw new ErrorHandler(404, 'RESOURCE NOT FOUND')
})
/* ErrorHandler */
app.use((err, req, res, next) => { handleError(err, res) })

module.exports = app
