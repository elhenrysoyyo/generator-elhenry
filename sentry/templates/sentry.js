const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const { NODE_ENV } = require('./environment');

const initialization = (app) => {
  if (['production', 'qa'].includes(NODE_ENV)) {
    Sentry.init({
      environment: NODE_ENV,
      dsn: '<%= dsn %>',
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app })
      ],
      tracesSampleRate: 1.0,
    })
    return Sentry
  }
  return null
}

module.exports = initialization;
