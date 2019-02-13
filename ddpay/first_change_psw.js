const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class firstChangePsw extends LoginAgw {
  constructor(Body) {
    super();
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    let role = Body.data.data.role||Body.data.data.operator_role;
    if(role=="MANAGER"){
      this.AgwBody = {
        "mobile":Body.data.data.mobile,
        "newpwd":Common.hexByMd5(Body.data.psw),
        "oldpwd":Common.hexByMd5(Body.data.old_psw),
        "role":"MANAGER"
      }
      this.AgwHead.msg_code = "ddpay_operator_mod_pwd";
    }else{
      this.AgwBody = {
        "newpwd":Common.hexByMd5(Body.data.psw),
        "oldpwd":Common.hexByMd5(Body.data.old_psw),
        "operator":Body.data.data.operator,
        "role":"OPERATOR"
      }
      this.AgwHead.msg_code = "ddpay_operator_mod_pwd";
    }
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

module.exports = firstChangePsw