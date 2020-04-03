const mongoose = require('mongoose')

const resourceSchema = require('./resources')

module.exports = {
  Resources: mongoose.model('Resources', resourceSchema),
}
