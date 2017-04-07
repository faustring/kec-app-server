const express = require('express')
const router = express.Router()
const t = require('tcomb-validation')

const serializer = require('./serializer')
const ErrorCode = require('./ErrorCode')
const domain = require('./domain')
const models = require('../../models')

router.get('/:id', (req, res, next) => {
  /**
   * @api {get} /users/:id Request User Information
   * @apiName getUser
   * @apiGroup User
   * 
   * @apiParamExample {json} Request-Example:
   *  {
   *    "id": 4711
   *  }
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    id: 1,
   *    username: 'faustring',
   *    email: 'admin@faustring.com',
   *    propic: 'http://...',
   *    is_admin: true,
   *    create_ts: 1491484731
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 404 NOT FOUND
   *  {
   *    "code":20001,
   *    "message":"존재하지 않는 사용자입니다."
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 500 INTERNAL SERVER ERROR
   *  {
   *    "code":10001,
   *    "message":"서버측에 에러가 발생했습니다."
   *  }
   */

  models.User.find({
    where: {
      id: req.params.id
    }
  })
    .then((user) => {
      if (user) {
        res.status(200).json(serializer.marshalUser(user))
      } else {
        res.status(404).json(ErrorCode.user.unknownUser)
      }
    }, (error) => {
      res.status(500).json(ErrorCode.common.unknown)
    })
})

router.post('', (req, res, next) => {
  const data = req.body
  const result = t.validate(data, domain.RegisterUser)
  if (result.isValid()) {
    console.log(result)
  } else {
    console.log(result.errors)
  }
  res.send('test')
})

module.exports = router