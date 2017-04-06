const express = require('express')
const router = express.Router()

const models = require('../../models')

function marshalUser(user) {
  return {
    id: user.id,
    name: user.username
  }
}

router.get('', (req, res, next) => {
  models.User.findAll()
    .then((users) => {
      const result = users.map((user, index) => {
        return marshalUser(user)
      })
      res.json(result)
    }, (error) => {
      res.send('error')
    })
})

module.exports = router