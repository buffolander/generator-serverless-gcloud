module.exports = (data, context) => {
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
