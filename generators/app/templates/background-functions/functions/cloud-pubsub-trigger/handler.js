module.exports = async (pubSubEvent, context) => {
  const { data } = pubSubEvent
  const decodedData = Buffer.from(data, 'base64').toString()

  return console.info(decodedData)
}
