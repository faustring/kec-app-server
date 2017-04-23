const express = require('express')
const router = express.Router()
const t = require('tcomb-validation')
const jwt = require('jsonwebtoken')

const {wrap} = require('./util')
const serializer = require('./serializer')
const domain = require('./domain')
const ERROR_CODE = require('../ERROR_CODE')
const UserService = require('../../services/UserService')
const authMiddleware = require('../../middlewares/authMiddleware')

router.post('/authentication', wrap(async (req, res, next) => {
  /**
   * @api {post} /authentication user authentication
   * @apiVersion 1.0.0
   * @apiName authentication
   * @apiGroup Auth
   * 
   * @apiParamExample {json} Request-Example:
   *  {
   *    "oauth_provider": "facebook",
   *    "oauth_provider_id": "1234",
   *    "oauth_access_token": "asdf"
   *  }
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "id": 1,
   *    "propic": "",
   *    "is_admin": false,
   *    "access_token": "...",
   *    "last_login_ts": 0
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 400 BAD REQUEST
   *  {
   *    "code":20003,
   *    "message":"oauth id가 올바르지 않습니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 400 BAD REQUEST
   *  {
   *    "code":30001,
   *    "message":"존재하지 않는 사용자입니다."
   *  }
   * 
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 406 NOT ACCEPTABLE
   *  {
   *    "code":20006,
   *    "message":"허용되지 않은 요청입니다."
   *  }
   */

  if(!req.is('application/json')) {
    return res.status(406).json(ERROR_CODE.common.NotAcceptable)
  }
  const body = req.body
  const result = t.validate(body, domain.Authorize)
  if (result.isValid()) {
    // TODO oauth validation check
    const user = await UserService.find({
      '$and': [
        {
          oauth_provider: body.oauth_provider,
          oauth_provider_id: body.oauth_provider_id
        }
      ]
    })
    if (!user) {
      return res.status(400).json(ERROR_CODE.user.Unknown)
    }
    const p = new Promise((resolve, reject) => {
      jwt.sign({
        _id: user.id,
        email: user.email,
        username: user.username,
        is_admin: user.is_admin
      }, 
      req.app.get('JWT_SCRECT'),
      {
        expiresIn: '1d',
        issuer: 'kec'
      }, (err, token) => {
        if (err) reject(err)
        resolve(token) 
      })
    })
    p.then((token) => {      
      data = {
        id: user.id,        
        propic: user.propic,
        is_admin: user.is_admin,
        access_token: token,
        last_login_ts: user.last_login_ts
      }
      user.update({
        last_login_ts: new Date().getTime() / 1000
      })
      return res.status(200).json(data)
    }).catch((error) => {
      return res.status(500).json(ERROR_CODE.common.Unknown)
    })
  } else {
    let error = ''
     switch (result.firstError().path[0]) {
      case 'oauth_provider':
        error = ERROR_CODE.auth.InvalidProvider
        break
      case 'oauth_provider_id':
        error = ERROR_CODE.auth.InvalidProviderId
        break
      case 'oauth_access_token':
        error = ERROR_CODE.auth.InvalidProviderAccessToken
        break
      default:
        error = ERROR_CODE.common.InvalidParameter
        break
     }
     return res.status(400).json(error)
  }
}))

module.exports = router
