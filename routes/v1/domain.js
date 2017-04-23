const t = require('tcomb');

const regexp = {
  email: /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/,
  url: /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?/
}

const Predicate = (x) => { return x > 0 }

const Email = t.refinement(t.String, s => regexp.email.test(s), 'Email')
const URL = t.refinement(t.String, s => regexp.url.test(s), 'URL')
const Positive = t.refinement(t.Number, Predicate)

const Oauth = t.enums.of([
  'facebook',
  'google',
  'kakako',
  'naver'
], 'Oauth')

const RegisterUser = t.struct({
  email: Email,
  username: t.String,
  oauth_provider: Oauth,
  oauth_provider_id: t.String,
  oauth_access_token: t.maybe(t.String)
})

const Authorize = t.struct({
  oauth_provider: Oauth,
  oauth_provider_id: t.String,
  oauth_access_token: t.maybe(t.String)
})

const EditUser = t.struct({
  username: t.String,
  propic: t.maybe(URL)
})

module.exports = {
  RegisterUser,
  Authorize,
  EditUser,
  Positive
}
