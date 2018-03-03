const Config = require('../config.js')
const Common = require('./../base/common.js');
//微信请求wxcode
class WxLogin {
  reqWxLogin() {
    let WxCode;
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          WxCode = res.code;
          resolve(WxCode)
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        }
      });
    })

  }
}
module.exports = WxLogin