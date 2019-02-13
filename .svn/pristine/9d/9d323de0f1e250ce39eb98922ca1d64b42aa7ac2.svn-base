const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const WxRequest = require('./../wx/wx_request.js');
const Common = require('./../base/common.js');

class getTodayInfo extends LoginAgw {
  constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let MerCode = OperatorInfo.mercode;
    let Operator = OperatorInfo.operator;
    this.AgwBody = {
      "contain_mer_trans": 'Y',
      "mercode": MerCode,
      "query_no": '0',
      "query_type": "MER"
    };
    if (OperatorInfo.operator_role == "OPERATOR") {//收银员登录
      this.AgwBody.query_type = "OPERATOR";
      this.AgwBody.query_no = Operator;
      if(!Body.isCode){
        this.AgwBody.contain_mer_trans = "N";
      }
    }
    
    this.AgwHead.msg_code = "ddpay_order_count_today";
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  orderCountToday(page) {
    let that = this;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);
    }).then((res)=>{
        let OperatorInfo = wx.getStorageSync("OperatorInfo");
        let order_amt_count = (parseInt(res.order_amt_count)/100).toFixed(2);
        let refund_amt_count = (parseInt(res.refund_amt_count)/100).toFixed(2);
        let amount = ((parseInt(res.order_amt_count)-parseInt(res.refund_amt_count))/100).toFixed(2);
        let trans_count = res.trans_count;
        let rep_date = `${res.rep_date.slice(0, 4)}-${res.rep_date.slice(4, 6)}-${res.rep_date.slice(6, 8)}`;
        
        if (OperatorInfo.operator_role == "OPERATOR") {//收银员登录
          refund_amt_count = "0.00";
        }
        page.setData({
          order_amt_count: order_amt_count,
          refund_amt_count: refund_amt_count,
          amount: amount,
          trans_count: trans_count,
          rep_date: rep_date
        })
      })
      .catch((err)=>{
        wx.showModal({
          title: '提示',
          content: err.data.AgwBody.result_msg,
          showCancel: false
        })
      });

  }
}


module.exports = getTodayInfo;