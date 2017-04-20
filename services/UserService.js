const ERROR_CODE = require('../routes/v1/ERROR_CODE')
const db = require('../models')

function currentTime() {
  return new Date().getTime() / 1000
}

function find(filter) {
  return db.User.find({where: filter})
}

function create(email, username, oauthProvider, oauthProviderId) {
  return db.User.create({
    email: email,
    username: username,
    create_ts: currentTime(),
    oauth_provider: oauthProvider,
    oauth_provider_id: oauthProviderId
  })
}

module.exports = {
  find,
  create
}