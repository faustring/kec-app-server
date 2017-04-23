define({ "api": [  {    "type": "post",    "url": "/authentication",    "title": "user authentication",    "version": "1.0.0",    "name": "authentication",    "group": "Auth",    "parameter": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"oauth_provider\": \"facebook\",\n  \"oauth_provider_id\": \"1234\",\n  \"oauth_access_token\": \"asdf\"\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"propic\": \"\",\n  \"is_admin\": false,\n  \"access_token\": \"...\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"code\":20003,\n  \"message\":\"oauth id가 올바르지 않습니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"code\":30001,\n  \"message\":\"존재하지 않는 사용자입니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 406 NOT ACCEPTABLE\n{\n  \"code\":20006,\n  \"message\":\"허용되지 않은 요청입니다.\"\n}",          "type": "json"        }      ]    },    "filename": "./routes/v1/authView.js",    "groupTitle": "Auth"  },  {    "type": "get",    "url": "/users/:id",    "title": "Request User Information",    "version": "1.0.0",    "name": "getUser",    "group": "User",    "parameter": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"id\": 4711\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  id: 1,\n  username: 'faustring',\n  email: 'admin@faustring.com',\n  propic: 'http://...',\n  is_admin: true,\n  create_ts: 1491484731\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"code\":10003,\n  \"message\":\"파라메터가 잘못되었습니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 401 UNAUTHORIZED\n{\n  \"code\":20001,\n  \"message\":\"유효하지 않은 토큰입니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 403 FORBIDDEN\n{\n  \"code\":20006,\n  \"message\":\"권한이 없습니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 NOT FOUND\n{\n  \"code\":30001,\n  \"message\":\"존재하지 않는 사용자입니다.\"\n}",          "type": "json"        }      ]    },    "filename": "./routes/v1/userView.js",    "groupTitle": "User"  },  {    "type": "post",    "url": "/users",    "title": "Register User",    "version": "1.0.0",    "name": "registerUser",    "group": "User",    "parameter": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n  \"email\": \"xxx@xxx.com\",\n  \"name\": \"xxx\",\n  \"oauth_provider\": \"facebook\",\n  \"oauth_provider_id\": \"12345\"\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 OK\n{\n  id: 1,\n  username: 'faustring',\n  email: 'admin@faustring.com',\n  propic: 'http://...',\n  is_admin: true,\n  create_ts: 1491484731\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"code\":30002,\n  \"message\":\"이메일은 필수입니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 BAD REQUEST\n{\n  \"code\":30005,\n  \"message\":\"이미 등록된 사용자입니다.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "HTTP/1.1 406 NOT ACCEPTABLE\n{\n  \"code\":10004,\n  \"message\":\"허용되지 않은 요청입니다.\"\n}",          "type": "json"        }      ]    },    "filename": "./routes/v1/userView.js",    "groupTitle": "User"  },  {    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "optional": false,            "field": "varname1",            "description": "<p>No type.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "varname2",            "description": "<p>With type.</p>"          }        ]      }    },    "type": "",    "url": "",    "version": "0.0.0",    "filename": "./apidoc/main.js",    "group": "_Users_seodongmyeong_Documents_workspace_faustring_kec_app_server_apidoc_main_js",    "groupTitle": "_Users_seodongmyeong_Documents_workspace_faustring_kec_app_server_apidoc_main_js",    "name": ""  }] });
