const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class merModifyRole extends LoginAgw {
  constructor(Body) {
    super()
    this.AgwBody = {
      "mercode": Body.mercode,
      "operator": Body.operator,
      "role": Body.role
    }
    this.AgwHead.msg_code = "dd_mer_modify_role";
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  changeRole(Page) {
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

module.exports = merModifyRole