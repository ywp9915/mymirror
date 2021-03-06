const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class AuthOpt extends LoginAgw {
  constructor(Body) {
    super()
    let Mobile = Body.Mobile;
    let MerCode = Body.MerCode;
    let WxCode = Body.WxCode;
    let wxmsId = Body.wxmsId;
    let AuthKey = Body.AuthKey
    this.AgwBody = {
      "login_type": "WXMS",
      "mercode": MerCode,
      "mobile": Mobile,
      "otp": AuthKey,
      "wx_code": WxCode,
      "wxms_id": wxmsId
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
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
    })
      .then((AuthOptResBody) => {
        wx.setStorageSync("OperatorInfo", AuthOptResBody)
        wx.redirectTo({
          url: '../menu/menu',
        })
      })
      .catch((err) => {
        // Page.setData({
        //   "err": JSON.stringify(err)
        // })
        //console.log(err, `      catch`);
        //console.log('清除缓存');
        Page.setData({
          'loginText': '登录'
        })
        wx.clearStorage();
        return err
      })
  }
}


module.exports = AuthOpt