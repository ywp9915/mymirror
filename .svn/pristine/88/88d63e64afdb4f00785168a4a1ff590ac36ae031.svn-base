const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class refundCheckAuth extends LoginAgw {
  constructor(Body) {
    super()
    
    this.AgwBody = {
      "mercode": Body.mercode,
      'mobile': Body.mobile,
      "operation_type": Body.operation_type,
      'otp': Body.otp,
      "random": Body.random,
    }

    this.AgwHead.msg_code = "ddpay_mer_operation_auth_otp";
    this.AgwHead.mercode = Body.mercode
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