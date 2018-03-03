const LoginAgw = require('./../base/head_agw.js');
const CheckLoginApi = require('./wxms_checklogin.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class LoginOtp extends LoginAgw {
  constructor(Body) {
    super()
    let Operator = Body.Operator;
    let MerCode = Body.MerCode;
    let SessionKey = Body.SessionKey;
    let PassWord = Common.hexByMd5(Body.PassWord);
    this.AgwBody = {
      "login_type": "WXMS",
      "mercode": MerCode,
      "operator": Operator,
      "password": PassWord,
      "temp_session_key": SessionKey,
    }
    this.AgwHead.msg_code = "ddpay_operator_login";
    this.AgwHead.operator = Operator
    this.AgwHead.mercode = MerCode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqLogin(Page) {
    let that = this;
    let LoginResBody
    let LoginResCode
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
    })

      .then((LoginResBody) => {
        wx.setStorageSync("OperatorInfo", LoginResBody)
        wx.redirectTo({
          url: '../menu/menu',
        })
      })
      .catch((err) => {
        // Page.data.form.$invalidMsg = err.data.AgwBody.result_msg;
        // Page.setData({
        //   'form': Page.data.form
        // })
        wx.showToast({
          title: err.data.AgwBody.result_msg,
          icon: 'loading',
          image: '/resource/image/warn.png',  
          duration: 2000,
          mask: false
        })
        //console.log(err, `catch`)
      })
  }
}


module.exports = LoginOtp