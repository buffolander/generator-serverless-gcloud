<%= usesMongoDB %>const { dbConnection, models: { Resources } } = require('./utils/mongoose-client')
<%= usesFirestore %>const db = require('../../utils/firestore-client')

module.exports = async (data, context) => {
  <%= usesMongoDB %>const db = await dbConnection()

  const file = data

  const { eventId, eventType } = context
  console.info('event', eventId);
  console.info('event type', eventType)

  const { bucket, name, metageneration, timeCreated, updated } = file
  console.info('bucket', bucket)
  console.info('file', name)
  console.info('metageneration', metageneration)
  console.info('created', timeCreated)
  console.info('updated', updated)
}
