const LoginAgw = require('../base/head_agw.js');
const Config = require('../config.js');
const Common = require('../base/common.js');
const WxRequest = require('../wx/wx_request.js');

//获取语音token
class getToken extends LoginAgw {
    constructor(Body) {
    super();
    this.AgwBody = {};
    this.AgwHead.msg_code = "baidu_get_api_token";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqToken() {
    let that = this;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    });

    }
}


module.exports =getToken;