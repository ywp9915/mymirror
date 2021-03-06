const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const CreateAudio = require('./../wx/wx_createaudio.js');
const WxRequest = require('./../wx/wx_request.js');
// let OperatorInfo = wx.getStorageSync("OperatorInfo");

class OrderPreCreate extends LoginAgw {
  constructor(Body) {
    super()
    let QueryNo = Body.QueryNo
    let QueryType = Body.QueryType

    this.AgwBody = {
      "query_no": QueryNo,
      "query_type": QueryType || "ext_order_no",
    }

    this.AgwHead.msg_code = "ddpay_order_result_query";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
    
  }

  // queryOrderResult() {
  //   let that = this;
  //   return new Promise((resolve, reject) => {
  //     WxRequest(that, resolve, reject)

  //   })
  // }

  queryOrderResult(page) {
    let that = this;
    let DeadLine = Common.setResultQueryDeadLine()
    let StopTimeout

    function setQueryResult() {
      StopTimeout = page.data.StopTimeout
      if (new Date().getTime() <= DeadLine && !StopTimeout) {

        new Promise((resolve, reject) => {
          WxRequest(that, resolve, reject)

        })
          .then((ResAgwBody) => {
            
            let OrderStatus = ResAgwBody.order_status;
            switch (true) {
              case OrderStatus == "SUCCESS":
                let PayAmT = ResAgwBody.total_amt / 100;
                // let MenuUrl = '../../menu/menu'
                CreateAudio(PayAmT, page);
                break;
              case OrderStatus == "WAITPAY":
                setTimeout(setQueryResult
                  , 3500);
                break;
              default:
                
                break;
            }
          })
          .catch((err) => {

          })
      }
    }

    setTimeout(setQueryResult, 500)
  }
  checkOrderResult(page) {
    let that = this;
    let DeadLine = Common.setResultQueryDeadLine()
    let StopTimeout

    function checkResult() {
      StopTimeout = page.data.StopTimeout
      if (new Date().getTime() <= DeadLine && !StopTimeout) {

        new Promise((resolve, reject) => {
          WxRequest(that, resolve, reject)

        })
          .then((ResAgwBody) => {
            
            let OrderStatus = ResAgwBody.order_status;
            switch (true) {
              case OrderStatus == "SUCCESS":
                let PayAmT = ResAgwBody.total_amt / 100;
                // let MenuUrl = '../../menu/menu'
                CreateAudio(PayAmT, page);
                break;
              case OrderStatus == "WAITPAY":
                wx.showToast({
                  title: '待支付',
                  icon: 'loading',
                  image: '/resource/image/warn.png',
                  duration: 2000,
                  mask: false
                })
                break;
                case OrderStatus == "CANCEL":
                wx.showToast({
                  title: '已撤销',
                  icon: 'loading',
                  image: '/resource/image/warn.png',
                  duration: 2000,
                  mask: false
                })
                break;
                case OrderStatus == "REFUND":
                wx.showToast({
                  title: '已退款',
                  icon: 'loading',
                  image: '/resource/image/warn.png',
                  duration: 2000,
                  mask: false
                })
                break;
                case OrderStatus == "CLOSE":
                wx.showToast({
                  title: '订单关闭',
                  icon: 'loading',
                  image: '/resource/image/warn.png',
                  duration: 2000,
                  mask: false
                })
                break;
              default:
                
                break;
            }
          })
          .catch((err) => {
            wx.showToast({
              title: err.data.AgwBody.result_msg,
              icon: 'loading',
              image: '/resource/image/warn.png',
              duration: 2000,
              mask: false
            })
          })
      }
    }

    setTimeout(checkResult, 500)
  }


}


module.exports = OrderPreCreate