const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
//创建二维码
// const WxQrCode = require('../resource/js/wxqrcode.js');
const CanQrCode = require('../resource/js/qrcode.js');
const WxRequest = require('./../wx/wx_request.js');
class PreCreate extends LoginAgw {
  constructor(Body) {
    super();
    //body
    let ReMark = Body.ReMark;
    let TotalAmt = Body.TotalAmt;
    //OperatorInfo
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let MerCode = OperatorInfo.mercode;
    let Operator = OperatorInfo.operator;
    let MerName = OperatorInfo.mername;
    //func storage
    let OrderNo = Common.setOrderNo();


    this.AgwBody = {
      "business_code": "CASHIERPAY",
      "expires_in": 0,
      "ext_order_no": OrderNo, //业务系统本地流水号/订单号 
      "mercode": MerCode,
      "mername": MerName,
      "no_discount_amt": 0,
      "notify_url": "", //可空
      "operator": Operator,
      "order_type": "CASHIER",
      "remark": ReMark,
      "scene_code": "HY_CHSHIER_PAY_USERSCAN",
      "termcode": 0, //终端号
      "total_amt": TotalAmt,
      "trade_detail": "", //可空
      "trade_info": ""   //可空
    }

    this.AgwHead.msg_code = "ddpay_order_precreate";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }


  reqPreCreate() {
    let that = this;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);
    })
  }

}


module.exports = PreCreate