<%= usesMongoDB %>const { dbConnection, models: { Resources } } = require('./utils/mongoose-client')
<%= usesFirestore %>const db = require('../../utils/firestore-client')

module.exports = async (pubSubEvent, context) => {
  <%= usesMongoDB %>const db = await dbConnection()
  
  const { data } = pubSubEvent
  const decodedData = Buffer.from(data, 'base64').toString()

  return console.info(decodedData)
}
