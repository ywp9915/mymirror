const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

class bossSwitchMer extends LoginAgw {
  constructor(Body) {
    super()
    let MerCode = wx.getStorageSync("OperatorInfo").mercode;
    this.AgwBody = {
      "new_mercode":Body.new_mercode,
      "termtype":"CS_WXMS"
    }
    this.AgwHead.msg_code = "ddpay_boss_switch_mer";
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  changeStore(Page) {
    let that = this;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
    }).then((res)=>{
      /* let OperatorInfo = {
        mer_accno: res.mer_accno,
        mercode: res.mercode,
        mername: res.mername,
        mobile: res.mobile,
        operator: res.operator_name,
        operator_access_token: res.operator_access_token,
        operator_accno: res.operator_accno,
        operator_role: res.operator_role
      } */
      res.operator = res.operator_name;
      wx.setStorageSync("OperatorInfo",res);
      
      if(res.result_code=="0000000"||res.result_code=="00000"){
        wx.reLaunch({
          url: '../menu/menu'
        })
      }else{
        wx.showToast({
          title: '提示',
          content: res.result_msg
        })
      }
    }).catch((err) => {
      wx.showModal({
        title: '提示',
        content: err.data.AgwBody.result_msg,
        showCancel:false
      })
    });
    
  }
}

module.exports = bossSwitchMer