const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js')
const Common = require('./../base/common.js');

let today = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');


class getPresent extends LoginAgw {
    constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let MerCode = OperatorInfo.mercode;
    let Operator = OperatorInfo.operator;
    let Role = OperatorInfo.operator_role;
    let PageNum = Body.PageNum;
    let state_type = ["s0","s1","s2","s3","s4"];
    this.AgwBody = {
      "mercode": MerCode,
      "operator":Operator,
      "page" :PageNum,
      "page_size" :10
    };
    this.AgwHead.msg_code = "ddpay_withdraw_mer_list";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqPresent(page) {
    let that = this;
    let OrderListArr;  //API返回order_list数据，数组
    let OrderList;      //初次获取的order_list数据，对象	          

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    });

    }
}


module.exports =getPresent;