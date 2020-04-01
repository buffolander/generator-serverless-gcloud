const cloudPubSubTrigger = require('./functions/cloud-pubsub-trigger/handler')
const storageTrigger = require('./functions/storage-trigger/handler')

module.exports = {
  '<%= serviceName %>-cloud-pubsub-trigger': cloudPubSubTrigger,
  '<%= serviceName %>-storage-trigger': storageTrigger,
}
