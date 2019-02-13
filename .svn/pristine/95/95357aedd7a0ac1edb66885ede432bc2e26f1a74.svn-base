const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class refundCheckAmt extends LoginAgw {
  constructor(Body) {
    super()
    
    this.AgwBody = {
      "main_order_no": Body.main_order_no,
      "mercode": Body.mercode,
      "refund_amt": Body.refund_amt
    }
    
    this.AgwHead.msg_code = "ddpay_refund_allow_query";
    this.AgwHead.mercode = Body.mercode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  reqrefundCheckAmt(Page) {
    let that = this;
    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
  }

}



module.exports = refundCheckAmt