const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')

<%= useAuthorizer %>const { authorize } = require('@brdu/authorizer')

const emitter = require('./utils/http-responses')

<%= usesMongoDB %>const { dbConnection } = require('./utils/mongoose-client')

<%= usesMongoDB %>const db = dbConnection()

<%= usesFirestore %>const db = require('../../utils/firestore-client')

const routes = { // add more routes here // https://forbeslindesay.github.io/express-route-tester/
  get: [{
    endpoint: '/:id',
    regexp: new RegExp(/^\/export\/?$/i),
    path: './functions/get-resource-by-id/handler',
    // restricted_by_roles: ['admin'],
  }],
}

const app = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

app.use((req, res, next) => { Object.assign(req, { emitter, db: db || null }); next() })
<%= useAuthorizer %>app.use(authorize)

// eslint-disable-next-line global-require, import/no-dynamic-require
routes.get.forEach((route) => app.get(route.endpoint, require(route.path)))

app.use('*', (req, res) => (emitter(res, 404)))

module.exports = { '<%= serviceName %>': app }
