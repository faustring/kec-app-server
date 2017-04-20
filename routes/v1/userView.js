const express = require('express')
const router = express.Router()
const t = require('tcomb-validation')

const {wrap} = require('./util')
const serializer = require('./serializer')
const domain = require('./domain')
const ERROR_CODE = require('./ERROR_CODE')
const UserService = require('../../services/UserService')

router.get('/:id', wrap(async (req, res, next) => {
  /**
   * @api {get} /users/:id Request User Information
   * @apiVersion 1.0.0
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
   *  HTTP/1.1 400 BAD REQUEST
   *  {
   *    "code":10003,
   *    "message":"파라메터가 잘못되었습니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 404 NOT FOUND
   *  {
   *    "code":20001,
   *    "message":"존재하지 않는 사용자입니다."
   *  }
   */
  const userId = parseInt(req.params.id)
  if (isNaN(userId) || !t.validate(userId, domain.Positive).isValid()) {
    return res.status(400).json(ERROR_CODE.common.InvalidParameter)
  }
  const user = await UserService.find({id: userId})
  return user ? res.status(200).json(serializer.MarshalUser(user)) : res.status(404).json(ERROR_CODE.user.Unknown)
}))

router.post('', wrap(async (req, res, next) => {
  /**
   * @api {post} /users Register User
   * @apiVersion 1.0.0
   * @apiName registerUser
   * @apiGroup User
   * 
   * @apiParamExample {json} Request-Example:
   *  {
   *    "email": "xxx@xxx.com",
   *    "name": "xxx",
   *    "oauth_provider": "facebook",
   *    "oauth_provider_id": "access_token"
   *  }
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 201 OK
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
   *  HTTP/1.1 400 BAD REQUEST
   *  {
   *    "code":20002,
   *    "message":"이메일은 필수입니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 400 BAD REQUEST
   *  {
   *    "code":20005,
   *    "message":"이미 등록된 사용자입니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 406 NOT ACCEPTABLE
   *  {
   *    "code":10004,
   *    "message":"허용되지 않은 요청입니다."
   *  }
   */
  if(!req.is('application/json')) {
    return res.status(406).json(ERROR_CODE.common.NotAcceptable)
  }
  const body = req.body
  const result = t.validate(body, domain.RegisterUser)
  if (result.isValid()) {
    const user = await UserService.find({
      '$or': [
        {
          email: body.email
        },
        {
          username: body.username
        },
        {
          '$and': [
            {
              oauth_provider: body.oauth_provider,
              oauth_provider_id: body.oauth_provider_id
            }
          ]
        }
      ]
    })
    if (user) {
      return res.status(400).json(ERROR_CODE.user.Duplicated)
    }
    const result = await UserService.create(body.email, body.username, body.oauth_provider, body.oauth_provider_id)
    return result ? res.status(201).json(serializer.MarshalUser(user.dataValues)) : res.status(500).json(ERROR_CODE.common.Unknown)
  } else {
    let error = null
    switch (result.firstError().path[0]) {
      case 'email':
        error = ErrorCode.user.EmailRequired
        break
      case 'username':
        error = ErrorCode.user.NameRequired
        break
      case 'oauth_provider':
      case 'oauth_provider_id':
        error = ErrorCode.user.OauthProviderRequired
        break
      default:
        error = ErrorCode.common.InvalidParameter
        break
    }
    return res.status(400).json(error)
  }
}))

module.exports = router