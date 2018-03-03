const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');
class CreateAndPay extends LoginAgw {
  constructor(Body) {
    super()
    let AuthCode = Body.AuthCode
    let TotalAmt = Body.TotalAmt
    let OperatorInfo = wx.getStorageSync("OperatorInfo");

    let MerCode = OperatorInfo.merCode;
    let Operator = OperatorInfo.operator;
    let OrderNo = Common.setOrderNo();

    // let TotalAmt = Body.TotalAmt

    this.AgwBody = {
      "auth_code": AuthCode,
      "business_code": "CASHIERPAY",
      "ext_order_no": OrderNo,
      "mercode": MerCode,
      "no_discount_amt": 0,
      "notify_url": "",
      "operator": Operator,
      "order_type": "CASHIER",
      "pay_code_type": "AUTO",
      "remark": "",
      "scene_code": "HY_CHSHIER_PAY_USERSCAN",
      "total_amt": TotalAmt * 100,
      "trade_detail": "",
      "trade_info": "",
    }

    this.AgwHead.msg_code = "ddpay_order_create_and_pay";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqCreateAndPay() {
    let CreateAndPayBody;
    let CreateAndPayHead;
    let ResultCode;
    let RespCode;
    let that=this;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject)
  
    })
  }

}


module.exports = CreateAndPay