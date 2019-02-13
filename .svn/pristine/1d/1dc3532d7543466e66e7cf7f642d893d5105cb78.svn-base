const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class refundSubmit extends LoginAgw {
  constructor(Body) {
    super()
    
    this.AgwBody = {
      'auth_token': Body.auth_token,
      'ext_refund_no': Body.ext_refund_no,
      'main_order_no':Body.main_order_no,
      'mercode': Body.mercode,
      'refund_amt': Common.number_format(Body.refund_amt*100),
      'refund_reason':Body.refund_reason
    }

    this.AgwHead.msg_code = "ddpay_order_refund";
    this.AgwHead.mercode = Body.mercode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  reqrefundSubmit(Page) {
    let that = this;
    
    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
  }

}



module.exports = refundSubmit