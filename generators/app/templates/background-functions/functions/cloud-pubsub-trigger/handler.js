const logger = require('../../logger')

module.exports = async (pubSubEvent, context) => {
  // logger.info('request received')
  const { data } = pubSubEvent
  const decodedData = Buffer.from(data, 'base64').toString()

  return console.info(decodedData)
}
