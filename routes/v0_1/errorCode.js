module.exports = {
  common: {
    prefix: 10000,
    unknown: {
      code: 10001,
      message: '서버측에 에러가 발생했습니다.'
    },
    notfound: {
      code: 10002,
      message: 'not found'
    },
    invalidParameter: {
      code: 10003,
      message: '파라메터가 잘못되었습니다.'
    },
  },
  user: {
    prefix: 20000,
    unknownUser: {
      code: 20001,
      message: '존재하지 않는 사용자입니다.'
    }
  }
}
