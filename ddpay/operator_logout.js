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
        
        if (ResultCode == '0000000' || ResultCode == '00000') {
          
          wx.clearStorage();
          wx.reLaunch({
            url: '../login/login',
          })
        } 
        else if (ResultCode=="auth.operator_access_token_error"){
          
          wx.clearStorage();
          wx.reLaunch({
            url: '../login/login',
          })
        }
        else {
          
        }
      }
    })
  }
};


module.exports = LoginOut;

