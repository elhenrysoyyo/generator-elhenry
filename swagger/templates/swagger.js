const swaggerAutogen = require('swagger-autogen')();
require('dotenv/config')

const { BASE_PATH } = require('./environment');

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: '<%= appname %>',
    version: '1.0.0',
    description: 'Swagger para documentar y probar endpoint de <%= appname %>'
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
  './src/routes/routes.js'
]

swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition)
