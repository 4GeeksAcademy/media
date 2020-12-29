module.exports = ({ env }) => ({
    url: env('HEROKU_URL'),
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET'),
      },
    },
  });