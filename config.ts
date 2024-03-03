export default () => ({
  port: process.env.PORT,
  jwtSecret: process.env.JWTSECRET,
  database: {
    url: process.env.MONGODB_URI,
  },
});
