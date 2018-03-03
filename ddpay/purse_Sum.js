const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');

let today = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');

//获取钱包账户信息
class getPurseSum extends LoginAgw {
    constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let mer_accno = OperatorInfo.mer_accno;
    this.AgwBody = {
      "account_no": mer_accno
    };
    this.AgwHead.msg_code = "ddpay_wallet_balance";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqPurseSum() {
    let that = this;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    });

    }
}


module.exports =getPurseSum;