const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class newLogin extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = 0;
    let mobile = Body.data.mobile
    let account = Body.data.account
    let password = Common.hexByMd5(Body.data.psw)
    let status = Body.data.status
    let wx_code = Body.data.wx_code

    if(status==0){
      this.AgwBody = {
      	"mobile":mobile,
        "password":password,
        "role":"MANAGER"
      }
      this.AgwHead.msg_code = "ddpay_boss_login";
      this.AgwHead.mercode = MerCode
      let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
      this.AgwHead.signature = Signature;
    }else{
      this.AgwBody = {
        "login_type":"WXMS",
        "operator":account,
        "password":password,
        "wx_code":wx_code,
        "wxms_id":"WXMS_APPID_GRCB_CS"
      }
      this.AgwHead.msg_code = "ddpay_operator_login_only";
      this.AgwHead.mercode = MerCode
      let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
      this.AgwHead.signature = Signature;
    }
  }

  boss_login(Page) {
    let that = this;

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
    })
    // .then((AuthOptResBody) => {
      
    // })
    // .catch((err) => {

    // })
  }

  operator_login(Page) {
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

module.exports = newLogin