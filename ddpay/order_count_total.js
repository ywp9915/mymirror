const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const WxRequest = require('./../wx/wx_request.js');
const Common = require('./../base/common.js');

class getTotalInfo extends LoginAgw {
  constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let Operator = OperatorInfo.operator;
    let MerCode = OperatorInfo.mercode;
    let pay_class = Body.pay_class;

    this.AgwBody = {
      contain_mer_trans: 'Y',
      count_date_type: 'ORDER_DATE',
      mercode: MerCode,
      order_end_date: Body.order_end_date,
      order_end_time: Body.order_end_time,
      order_start_date: Body.order_start_date,
      order_start_time: Body.order_start_time,
      order_status: 'SUCCESS',
      order_type: '',
      pay_class: pay_class,
      query_no: '0',
      query_type: "MER",
      with_pay_type: ''
    };
    if (OperatorInfo.operator_role == "OPERATOR") {//收银员登录
      this.AgwBody.query_type = "OPERATOR";
      this.AgwBody.query_no = Operator;
      if(!Body.isCode){
        this.AgwBody.contain_mer_trans = "N";
      }
    }else{//老板、店长登录
      if(Body.operator_name){
        this.AgwBody.contain_mer_trans = "N";
        this.AgwBody.query_type = "OPERATOR";
        this.AgwBody.query_no = Body.operator_name;
      }
    }
    this.AgwHead.msg_code = "ddpay_order_count_total";
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  orderCountTotal(page) {
    let that = this;

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);
    }).then((res)=>{
        let OperatorInfo = wx.getStorageSync("OperatorInfo");
        let order_amt_count = (parseInt(res.order_amt_count)/100).toFixed(2);
        let refund_amt_count = (parseInt(res.refund_amt_count)/100).toFixed(2);
        let amount = ((parseInt(res.order_amt_count)-parseInt(res.refund_amt_count))/100).toFixed(2);
        let trans_count = res.trans_count;

        if (OperatorInfo.operator_role == "OPERATOR") {//收银员登录
          refund_amt_count = "0.00";
        }
        page.setData({
          order_amt_count: order_amt_count,
          refund_amt_count: refund_amt_count,
          amount: amount,
          trans_count: trans_count
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


module.exports = getTotalInfo;