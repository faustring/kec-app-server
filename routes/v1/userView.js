const express = require('express')
const router = express.Router()
const t = require('tcomb-validation')

const {wrap} = require('./util')
const serializer = require('./serializer')
const domain = require('./domain')
const ERROR_CODE = require('../ERROR_CODE')
const UserService = require('../../services/UserService')
const authMiddleware = require('../../middlewares/authMiddleware')

router.use('/:id', authMiddleware)
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
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 401 UNAUTHORIZED
   *  {
   *    "code":20001,
   *    "message":"유효하지 않은 토큰입니다."
   *  }
   * 
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 403 FORBIDDEN
   *  {
   *    "code":20006,
   *    "message":"권한이 없습니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 404 NOT FOUND
   *  {
   *    "code":30001,
   *    "message":"존재하지 않는 사용자입니다."
   *  }
   */
  const userId = parseInt(req.params.id)
  if (isNaN(userId) || !t.validate(userId, domain.Positive).isValid()) {
    return res.status(400).json(ERROR_CODE.common.InvalidParameter)
  }
  if (userId !== req.auth._id) {
    return res.status(403).json(ERROR_CODE.auth.Forbidden)
  }
  const user = await UserService.find({id: userId})
  return user ? res.status(200).json(serializer.marshalUser(user)) : res.status(404).json(ERROR_CODE.user.Unknown)
}))

router.put('/:id', wrap(async (req, res, next) => {
  /**
   * @api {put} /users/:id Edit user information
   * @apiVersion 1.0.0
   * @apiName editUser
   * @apiGroup User
   * 
   * @apiParamExample {json} Request-Example:
   *  {
   *    "id": 4711,
   *    "username": "xxx",
   *    "propic": "http://..."
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
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 401 UNAUTHORIZED
   *  {
   *    "code":20001,
   *    "message":"유효하지 않은 토큰입니다."
   *  }
   * 
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 403 FORBIDDEN
   *  {
   *    "code":20006,
   *    "message":"권한이 없습니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 404 NOT FOUND
   *  {
   *    "code":30001,
   *    "message":"존재하지 않는 사용자입니다."
   *  }
   */
  const userId = parseInt(req.params.id)
  if (isNaN(userId) || !t.validate(userId, domain.Positive).isValid()) {
    return res.status(400).json(ERROR_CODE.common.InvalidParameter)
  }
  if(!req.is('application/json')) {
    return res.status(406).json(ERROR_CODE.common.NotAcceptable)
  }
  if (userId !== req.auth._id) {
    return res.status(403).json(ERROR_CODE.auth.Forbidden)
  }
  const body = req.body
  const result = t.validate(body, domain.EditUser)
  if (result.isValid()) {
    const user = await UserService.find({id: userId})
    if (!user) {
      return res.status(404).json(ERROR_CODE.user.Unknown)
    }
    user.update(body).then(() => {
        return res.status(200).json(serializer.marshalUser(user))
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json(ERROR_CODE.user.NameDuplicated)
      } else {
        return res.status(500).json(ERROR_CODE.common.Unknown)
      }
    })
  } else {
    let error = null
    switch (result.firstError().path[0]) {
      case 'username':
        error = ERROR_CODE.user.NameRequired
        break
      case 'propic':
        error = ERROR_CODE.user.InvalidURLFormat
        error.source = 'propic'
        break
      default:
        error = ERROR_CODE.common.InvalidParameter
        break
    }
    return res.status(400).json(error)
  }
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
   *    "oauth_provider_id": "12345"
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
   *    "code":30002,
   *    "message":"이메일은 필수입니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 400 BAD REQUEST
   *  {
   *    "code":30005,
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
    // TODO oauth validation check
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
      return res.status(400).json(ERROR_CODE.user.EmailDuplicated)
    }
    const result = await UserService.create(body.email, body.username, body.oauth_provider, body.oauth_provider_id)
    return result ? res.status(201).json(serializer.marshalUser(user.dataValues)) : res.status(500).json(ERROR_CODE.common.Unknown)
  } else {
    let error = null
    switch (result.firstError().path[0]) {
      case 'email':
        error = ERROR_CODE.user.EmailRequired
        break
      case 'username':
        error = ERROR_CODE.user.NameRequired
        break
      case 'oauth_provider':
      case 'oauth_provider_id':
        error = ERROR_CODE.user.OauthProviderRequired
        break
      default:
        error = ERROR_CODE.common.InvalidParameter
        break
    }
    return res.status(400).json(error)
  }
}))

module.exports = router