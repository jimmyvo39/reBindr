module.exports = {
    mongoURI: process.env.MONGO_URI,
    isProduction: process.env.NODE_ENV === 'production',
    secretOrKey: process.env.SECRET_OR_KEY,
  }