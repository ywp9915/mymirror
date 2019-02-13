const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class refundGetAuth extends LoginAgw {
  constructor(Body) {
    super()
    let mercode = Body.mercode
    let random = Math.floor(Math.random()*100000000)
    this.AgwBody = {
      "mercode": mercode,
      "params":Body.params,
      "random": random,
      "template_id": 'mer.order.refund'
    }

    this.AgwHead.msg_code = "ddpay_mer_operation_send_otp";
    this.AgwHead.mercode = mercode
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  reqrefundGetAuth(Page) {
    let that = this;
    Page.setData({
      resCb: that
    })
    return new Promise((resolve, reject) => {

      WxRequest(that, resolve, reject)

    })
      /* .then((refundGetAuthResBody) => {
        Page.setData({
          count: true
        })
        Page.timeDown(Page.data.countdown)
        let result_code = refundGetAuthResBody.result_code
        if(result_code == '0000000' || result_code == '00000'){
          Page.setData({
            "random": that.AgwBody.random,
            "mobile": refundGetAuthResBody.mobile,
            "checkAmt": that.AgwBody.params.refundAmt
          })
        }else{
          wx.showToast({
            title: refundGetAuthResBody.result_msg,
            icon: 'loading',
            image: '/resource/image/warn.png',
            duration: 2000,
            mask: false
          })
        }
       
      })
      .catch((err) => {
        wx.showToast({
          title: err.data.AgwBody.result_msg,
          image: '/resource/image/warn.png',
          duration: 2000,
          mask: false
        })
        console.log(Page)
        clearInterval(Page.data.timer)
        Page.setData({
          countdown: 60,
          count: false
        })
        return err
      }) */
  }

}



module.exports = refundGetAuth