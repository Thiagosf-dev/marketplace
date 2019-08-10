module.exports = {
  port: 3000 || process.env.port,
  urlConnection: process.env.URL_CONNECTION,
  secretKey: process.env.APP_SECRET,
  ttl: process.env.APP_TTL,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS
    }
  },
  sentry: {
    dsn: process.env.SENTRY_DSN
  }
}
