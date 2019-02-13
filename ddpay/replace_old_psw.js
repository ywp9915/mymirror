const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class replacePsw extends LoginAgw {
  constructor(Body) {
    super();
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    let role = wx.getStorageSync("OperatorInfo").operator_role;
    if(role=="MANAGER"){
      this.AgwBody = {
        "mobile":wx.getStorageSync("OperatorInfo").mobile,
        "newpwd":Common.hexByMd5(Body.data.new_psw),
        "oldpwd":Common.hexByMd5(Body.data.old_psw),
        "role":role
      }
    }else{
      this.AgwBody = {
        "newpwd":Common.hexByMd5(Body.data.new_psw),
        "oldpwd":Common.hexByMd5(Body.data.old_psw),
        "operator":wx.getStorageSync("OperatorInfo").operator,
        "role":role
      }
    }
    this.AgwHead.msg_code = "ddpay_operator_mod_pwd";
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

module.exports = replacePsw