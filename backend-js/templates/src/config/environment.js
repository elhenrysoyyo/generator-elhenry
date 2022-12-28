module.exports = {
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'cors_origin',
  BASE_PATH: process.env.BASE_PATH || '/v1',
  NODE_ENV: process.env.NODE_ENV || 'develop',
  PORT: process.env.PORT || '3000',
  URL: process.env.URL || `localhost:${process.env.PORT || 3000}`
}
