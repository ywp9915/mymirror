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
    console.log(this)
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
            console.log(ResAgwBody, 'order_result_query_resagwbody')
            let OrderStatus = ResAgwBody.order_status;
            switch (true) {
              case OrderStatus == "SUCCESS":
                let PayAmT = ResAgwBody.pay_info.pay_amt / 100;
                // let MenuUrl = '../../menu/menu'
                CreateAudio(PayAmT, page);
                break;
              case OrderStatus == "WAITPAY":
                setTimeout(setQueryResult
                  , 3500);
                break;
              default:
                console.log(ResAgwBody, 'elseelseelseelseelse');
                break;
            }
          })
          .catch((err) => {
            console.log(err)
            console.log(err, 'order_result-query_errr')

          })
      }
    }

    setTimeout(setQueryResult, 4000)
  }



}


module.exports = OrderPreCreate