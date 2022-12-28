import 'dotenv/config'
import 'module-alias/register'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
<% if(swagger){%>
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../docs/swagger.json'
<%}%>
import corsOptions from '@config/cors'
import { handleError, ErrorHandler } from './helpers/error'
import { BASE_PATH, URL<% if(sentry) { %>, NODE_ENV<%}%> } from '@config/environment'
<% if(sentry){%>
import Sentry from '@config/sentry'
<%}%>
import routes from './routes/routes'

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

/* Cors */
app.use(cors(corsOptions))

/* Routes */
app.use(BASE_PATH, routes)
<% if (swagger) { %>
/* Swagger */
app.use(`${BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup({ ...swaggerDoc, host: URL }))
<% }
if (sentry) { %>
const sentry = Sentry(app)
/* Sentry */
if (['production', 'qa'].includes(NODE_ENV)) {
  app.use(sentry.Handlers.requestHandler())
  app.use(sentry.Handlers.tracingHandler())
  app.use(sentry.Handlers.errorHandler())
}
<% } %>
app.use((req, res) => {
  throw new ErrorHandler(404, 'RESOURCE NOT FOUND')
})
/* ErrorHandler */
app.use((err, req, res, next) => { handleError(err, res) })

export default app
