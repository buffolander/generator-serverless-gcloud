const admin = require('firebase-admin')

admin.initializeApp({ credential: admin.credential.applicationDefault() })
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

module.exports = db
