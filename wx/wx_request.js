const Config = require('../config.js');


module.exports = (data, resolve, reject, LoginUrl = "../login/login") => {
  let ResDataBody;
  let ResDataHead;
  let ResultCode;
  let RespCode;

  wx.request({
    url: Config.URL,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(ResData) {
      ResDataBody = ResData.data.AgwBody;
      ResDataHead = ResData.data.AgwHead;
      RespCode = ResDataHead.resp_code;
      console.log(ResData, "ResData")
      console.log(ResDataBody, "ResDataBody")
      console.log(JSON.stringify(ResDataBody) == "{}")
      if (JSON.stringify(ResDataBody) !== "{}" && RespCode == "agw.success") {

        ResultCode = ResDataBody.result_code;

        if (ResultCode == '0000000' || ResultCode == '00000') {
          resolve(ResDataBody)
        }
        else if (ResultCode == "auth.wxms_not_login") {
          console.log("微信小程序未登录，请重新登录");
          resolve(ResDataBody)
        }
        else {
          reject(ResData)
        }
      }
      else {
        //   console.log("operator_access_token_error")
        //   if (RespCode == 'auth.operator_access_token_error') {
        //     console.log("redirect")
        //     wx.clearStorageSync()
        //     return wx.redirectTo({
        //       url: LoginUrl,
        //     })
        //   }
        // }
        switch (RespCode) {
          //auth.operator_access_token_error操作员授权码错误
          case 'auth.operator_access_token_error':
            console.log("auth.operator_access_token_error操作员授权码错误")
            wx.clearStorageSync()
            return wx.redirectTo({
              url: LoginUrl,
            })
            break;
          //agw.reqmsg_error请求报文格式错误
          case 'agw.reqmsg_error':
            console.log("agw.reqmsg_error请求报文格式错误")
            break;
          //agw.sign_error签名验证失败
          case 'agw.sign_error':
            console.log("agw.sign_error签名验证失败")
            break;
          //agw.ip_errorIP地址未授权访问
          case 'agw.ip_error':
            console.log("agw.ip_errorIP地址未授权访问")
            break;
          //agw.auth_error访问未授权.{0}
          case 'agw.auth_error':
            console.log("agw.auth_error访问未授权.{0}")
            break;
          //agw.route_error内部交易路由异常
          case 'agw.route_error':
            console.log("agw.route_error内部交易路由异常")
            break;
          //agw.inner_error网关内部处理异常
          case 'agw.inner_error':
            console.log("gw.inner_error网关内部处理异常")
            break;
          //agw.method_error请用POST方式访问
          case 'agw.method_error':
            console.log("agw.method_error请用POST方式访问")
            break;
          //agw.seqno_duplicate_errorseq_no流水号重复
          case 'agw.seqno_duplicate_error':
            console.log("agw.seqno_duplicate_errorseq_no流水号重复")
            break;
          //agw.reqtime_error	req_time与当前实际时间差异过大
          case 'agw.reqtime_error':
            console.log("gw.reqtime_error	req_time与当前实际时间差异过大")
        }
      }



    },
    fail(err) {
      console.error(JSON.stringify(err))
      reject(err)
    }
  })
}

