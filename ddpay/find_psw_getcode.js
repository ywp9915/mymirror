const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class refundGetAuth extends LoginAgw {
  constructor(Body) {
    super()
    let mercode = 0;
    let random = Math.floor(Math.random()*100000000)
    this.AgwBody = {
      "mobile": Body.data.mobile,
      "params":"",
      "random": random,
      "template_id": 'common.auth'
    }

    this.AgwHead.msg_code = "ddpay_mer_operation_send_otp";
    this.AgwHead.mercode = mercode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  reqrefundGetAuth(Page) {
    let that = this;
    Page.setData({
      resCb: that
    })
    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
  }

}



module.exports = refundGetAuth