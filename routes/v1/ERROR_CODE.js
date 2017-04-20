module.exports = {
  common: {
    prefix: 10000,
    Unknown: {
      code: 10001,
      message: '서버측에 에러가 발생했습니다.'
    },
    NotFound: {
      code: 10002,
      message: 'not found'
    },
    InvalidParameter: {
      code: 10003,
      message: '파라메터가 잘못되었습니다.'
    },
    NotAcceptable: {
      code: 10004,
      message: '허용되지 않은 요청입니다.'
    }
  },
  user: {
    prefix: 20000,
    Unknown: {
      code: 20001,
      message: '존재하지 않는 사용자입니다.'
    },
    EmailRequired: {
      code: 20002,
      message: '이메일은 필수입니다.'
    },
    NameRequired: {
      code: 20003,
      message: '닉네임은 필수입니다.'
    },
    OauthProviderRequired: {
      code: 20004,
      message: 'SNS 인증은 필수입니다.'
    },
    Duplicated: {
      code: 20005,
      message: '이미 등록된 사용자입니다.'
    },
    InvalidOauthProvider: {
      code: 20006,
      message: '잘못된 SNS 인증입니다.'
    }
  }
}
