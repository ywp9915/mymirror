const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class getToken extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    this.AgwBody = {
      "auth_token":Body.data.auth_token,
      "operator":Body.data.operator
    }
    this.AgwHead.msg_code = "ddpay_boss_target_mer";
    this.AgwHead.mercode = MerCode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  get_token(Page) {
    let that = this;

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
    })
    // .then((AuthOptResBody) => {
      
    // })
    // .catch((err) => {

    // })
  }
}

module.exports = getToken