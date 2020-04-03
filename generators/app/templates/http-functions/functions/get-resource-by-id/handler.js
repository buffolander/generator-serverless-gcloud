const logger = require('../../logger')

<%= usesMongoDB %>const { models: { Resources } } = require('../../utils/mongoose-client')

module.exports = async (req, res) => {
  const { params, emitter, db = null } = req
  await db

  <%= usesMongoDB %>const resources = await Resources.find({}).exec()
    .catch(err => (logger.error(err)))

  return emitter(res, 200, { payload: resources || null })
}
