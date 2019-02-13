const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class newOpt extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    this.AgwBody = {
      "mercode": Body.data.mercode,
      "operator":wx.getStorageSync("OperatorInfo").operator,
      "password":Common.hexByMd5(Body.data.psw),
      "role": Body.data.role,
      "username":Body.data.account,
      "voucher_no":Body.data.scanCode
    }

    this.AgwHead.msg_code = "dd_mer_add_operator";
    this.AgwHead.mercode = MerCode;
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  add_operator(Page) {
    let that = this;

    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
  }

}



module.exports = newOpt