const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class AuthOpt extends LoginAgw {
  constructor(Body) {
    super()
    let Mobile = Body.Mobile;
    let MerCode = Body.MerCode;
    let SessionKey = Body.SessionKey;
    let AuthKey = Body.AuthKey
    this.AgwBody = {
      "login_type": "WXMS",
      "mercode": MerCode,
      "mobile": Mobile,
      "otp": AuthKey,
      "temp_session_key": SessionKey,
    }
    this.AgwHead.msg_code = "ddpay_operator_login_authotp";
    this.AgwHead.mercode = MerCode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqLoginAuthOtp(Page) {
    let that = this;
  
    let AuthOptResBody;
    let ResultCode;
    new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
    })
      .then((AuthOptResBody) => {
        wx.setStorageSync("OperatorInfo", AuthOptResBody)
        wx.redirectTo({
          url: '../menu/menu',
        })
      })
      .catch((err) => {
        Page.setData({
          "err": JSON.stringify(err)
        })
        //console.log(err, `      catch`);
        //console.log('清除缓存');
        wx.clearStorage();
      })
  }
}


module.exports = AuthOpt