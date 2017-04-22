const jwt = require('jsonwebtoken')
const ERROR_CODE = require('../routes/ERROR_CODE')

const PREFIX_BEARER = 'Bearer'

const authMiddleware = (req, res, next) => {
  const authorization = req.get('Authorization')

  if (!authorization || !authorization.startsWith(PREFIX_BEARER)) {
    return res.status(401).json(ERROR_CODE.auth.InvalidToken)
  }
  const accessToken = authorization.slice(7)

  const p = new Promise((resolve, reject) => {
    jwt.verify(accessToken, req.app.get('JWT_SCRECT'), (err, decoded) => {
      if(err) reject(err)
      resolve(decoded)
    })
  })

  const errorHandler = (error) => {
    let errorMessage = ERROR_CODE.auth.InvalidToken
    errorMessage.reason = error.message
    return res.status(401).json(errorMessage)
  }

  p.then((auth) => {
    req.auth = auth
    next()
  }).catch(errorHandler)
}

module.exports = authMiddleware
