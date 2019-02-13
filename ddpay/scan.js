const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class newOpt extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    this.AgwBody = {
      "token":Body
    }

    this.AgwHead.msg_code = "dd_mer_get_qrcode_voucher";
    this.AgwHead.mercode = MerCode;
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  scan(Page) {
    let that = this;

    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
  }

}



module.exports = newOpt