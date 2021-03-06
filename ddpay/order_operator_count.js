const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');


class TradeCount extends LoginAgw {
  constructor(Body) {
    super()
    let PageSize = Body.PageSize;

    let OperatorInfo = wx.getStorageSync("OperatorInfo");

    let MerCode = OperatorInfo.mercode;
    let Role = OperatorInfo.operator_role
    let Operator = OperatorInfo.operator;

    let StartTime = Common.setStartTimeYMD(90);
    let EndTime = Common.setCurTimeYMD()

    this.AgwBody = {
      "count_date_type": "ORDER_DATE",
      "mercode": MerCode,
      "operator": Operator,
      "order_end_date": EndTime,
      "order_start_date": StartTime,
      "order_status": "SUCCESS",
      "order_type": "CASHIER",
      "page_num": 1,
      "page_size": PageSize,
    }
    if (Role == "OPERATOR") {
      this.AgwHead.msg_code = "ddpay_order_operator_count";
    } else {
      delete this.AgwBody.operator;
      this.AgwHead.msg_code = "ddpay_order_mer_count";
    }

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }
  reqTradeCount(Page, GroupArr) {
    let that = this;
    let ResultCode;
    let RespCode;
    let TradeCountResBody;
    let TradeCountResHead;
    let GroupList = Page.data.GroupList
     new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)

    })
      .then((TradeCountResBody) => {
        
        let data_list = TradeCountResBody.data_list
        for (let i = 0; i < data_list.length; i++) {
          data_list[i].rep_date = GroupArr[i]
        }
        Page.setData({
          "MerCountStat": data_list,

        })
      })
      .catch((err) => {
        
      })

  }

}



module.exports = TradeCount