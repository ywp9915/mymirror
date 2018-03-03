const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
// const WxRequest = require('./../wx/wx_request.js');
/**
 * API:ddpay_operator_login
 * DTMP_操作员登录密码登录 
 */
class LoginOut extends LoginAgw{
  constructor() {
    super()
    let Operator=wx.getStorageSync("OperatorInfo").operator;
    this.AgwBody = {
      "login_type": "WXMS",
      "operator": Operator,
    }
    this.AgwHead.msg_code = "ddpay_operator_logout";
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  
  logOut() {
    let that=this
    wx.request({
      url: Config.URL,
      data: that,
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (data) {
        let ResAgwBody = data.data.AgwBody
        let ResultCode = ResAgwBody.result_code;
        console.log(data,'logout59')
        if (ResultCode == '0000000' || ResultCode == '00000') {
          console.log('loginout成功')
          wx.clearStorage();
          wx.redirectTo({
            url: '../login/login',
          })
        } 
        else if (ResultCode=="auth.operator_access_token_error"){
          console.log("授权码不存在或失效，需要退出到登录页面，操作员重新登录")
          wx.clearStorage();
          wx.redirectTo({
            url: '../login/login',
          })
        }
        else {
          console.log('loginout失败')
        }
      }
    })
  }
};


module.exports = LoginOut;

