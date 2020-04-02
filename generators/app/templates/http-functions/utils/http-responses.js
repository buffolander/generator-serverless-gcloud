const _ = require('lodash')

module.exports = (res, code, args = {}) => {
  if (code >= 400) return res.status(code).json({ 
    message: code === 401 ? 'unauthorized' : code === 404 ? 'not found' : 'internal server error'
  })

  const { state = true, payload = {} } = args
  if (code === 200) return res.status(code).json({
    resource: '<%= serviceName %>',
    ok: state,
    data: payload,
    size: _.isArray(payload) ? payload.length : 1,
  })

  return res.status(code).send()
}
