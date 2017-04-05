const models = require('../../models')

function marshalUser(user) {
  return {
    id: user.id,
    name: user.username
  }
}

function getUser(req, res, next) {
  models.User.findAll()
    .then((users) => {
      const result = users.map((user, index) => {
        return marshalUser(user)
      })
      console.log(result)
      res.json(result)
    }, (error) => {
      res.send('error')
    })
}

module.exports = {
  getUser
}