import { CORS_ORIGIN } from './environment'

// Allowing origins
const allowedOrigins = CORS_ORIGIN.split(',')
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback (null, true)
    }
    return callback (new Error('Not allowed by CORS'))
  },
  methods: 'GET, POST'
}

export default corsOptions
