const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class switchOperator extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    this.AgwBody = {
      "mercode":Body.data.data.mercode,
      "new_state":Body.data.new_state,
      "old_state":Body.data.old_state,
      "operator_id":Body.data.data.operator_id
    }
    this.AgwHead.msg_code = "MGM09";
    this.AgwHead.mercode = MerCode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  switch(Page) {
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

module.exports = switchOperator