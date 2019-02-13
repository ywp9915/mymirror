const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class refundCheckAuth extends LoginAgw {
  constructor(Body) {
    super()
    let mercode = 0;
    this.AgwBody = {
      'mobile': Body.data.mobile,
      "operation_type": "reset_pwd",
      'otp': Body.data.code,
      "random": Body.data.resCb.AgwBody.random,
    }

    this.AgwHead.msg_code = "ddpay_mer_operation_auth_otp";
    this.AgwHead.mercode = mercode;
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  reqrefundCheckAuth(Page) {
    let that = this;
    
    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
  }

}



module.exports = refundCheckAuth