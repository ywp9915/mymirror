const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class operatorList extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    let operator = wx.getStorageSync("OperatorInfo").operator;
    let role = wx.getStorageSync("OperatorInfo").operator_role;
    if(Body.state == 1){
      this.AgwBody = {
        mercode:MerCode,
        role:role
      }
      this.AgwHead.msg_code = "dd_operator_list";
    }else{
      this.AgwBody = {
        mercode:MerCode,
        operator:operator
      }
      this.AgwHead.msg_code = "MGM08";
    }
    this.AgwHead.mercode = MerCode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  load_list(Page) {
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

module.exports = operatorList