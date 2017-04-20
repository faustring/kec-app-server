const t = require('tcomb');

const re = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/
const Email = t.refinement(t.String, s => re.test(s), 'Email')
const Predicate = (x) => { return x > 0 }
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

module.exports = {
  Email,
  Oauth,
  RegisterUser,
  Positive
}
