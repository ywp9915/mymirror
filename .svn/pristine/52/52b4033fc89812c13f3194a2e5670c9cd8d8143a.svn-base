const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class bossChangeOptPsw extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    let mobile = wx.getStorageSync("OperatorInfo").mobile||Body.data.mobile
    let auth_token = Body.data.auth_token||""
    this.AgwBody = {
      "auth_token":auth_token,
      "mobile":mobile,
      "newpwd":Common.hexByMd5(Body.data.psw),
      "role":"MANAGER"
    }
    this.AgwHead.msg_code = "ddpay_operator_reset_pwd";
    this.AgwHead.mercode = MerCode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  changePsw(Page) {
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

module.exports = bossChangeOptPsw