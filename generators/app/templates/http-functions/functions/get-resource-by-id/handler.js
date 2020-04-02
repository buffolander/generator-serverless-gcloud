const logger = require('../../logger')

module.exports = async (req, res) => {
  // logger.info('request received')
  const { param: { id } } = req
  
  return res.json({ ok: true, id })
}
