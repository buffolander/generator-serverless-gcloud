const mongoose = require('mongoose')

const models = require('../models')

const dbConnection = () => (
  mongoose.connect(process.env.MONGODB_CNX_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
)

module.exports = { models, dbConnection }
