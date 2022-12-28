import swaggerAutogen from 'swagger-autogen'
import 'dotenv/config'
import { BASE_PATH } from './environment'

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: '<%= appname %>', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'Swagger para documentar y probar endpoints de <%= appname %>'
  },
  basePath: BASE_PATH,
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Ingrese token formato **Bearer &lt;token>**'
    },
    ApiKeyAuth: {
      type: 'apiKey',
      name: 'apikey',
      in: 'header',
      description: 'Ingrese key'
    }
  },
  '@definitions': {}
}

const outputFile = './docs/swagger.json'
const endpointsFiles = [
  './src/routes/routes.ts',
]

swaggerAutogen()(outputFile, endpointsFiles, swaggerDefinition)

