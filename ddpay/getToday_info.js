const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');

let today = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');


class getTodayList extends LoginAgw {
  constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let MerCode = OperatorInfo.mercode;
    let Operator = OperatorInfo.operator;
    let Role = OperatorInfo.operator_role;
    this.AgwBody = {
      "count_date_type": "ORDER_DATE",  
      "mercode": MerCode,
      "operator":Operator,
      "order_end_date": today,
      "order_start_date": today,
      "order_status": "SUCCESS",
      "order_type": "CASHIER",
      "page_num" :"1",
      "page_size" :"10"
    };

    if (Role == "OPERATOR") {
        this.AgwHead.msg_code = "ddpay_order_operator_count";
      } else {
        delete this.AgwBody.operator;
        this.AgwHead.msg_code = "ddpay_order_mer_count";
      }

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqTodayInfo(page) {
    let that = this;
    let trans_count;                  //总交易笔数	int	Y	
    let order_amt_count;	          //总交易金额	int	Y

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    });

    }
}


module.exports =getTodayList;