const serializer = {
  MarshalUser (user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      propic: user.propic,
      is_admin: user.is_admin,
      create_ts: user.create_ts
    }
  }
}

module.exports = serializer
