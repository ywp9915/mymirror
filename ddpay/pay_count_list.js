const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

//获取信用支付统计信息
class getPayCountList extends LoginAgw {
    constructor(Body) {
    super();
    let page = Body.page;
    let bDate = Body.bDate;
    let eDate = Body.eDate;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let mercode = OperatorInfo.mercode;
    this.AgwBody = {
      "mercode": mercode,
      "page": page,
      "page_size": 10,
      "query_type":"credit",
      "report_date_end": eDate,
      "report_date_start": bDate
    };
    this.AgwHead.msg_code = "REP01";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  payCountList(page) {
    let that = this;
    let payCount_listArr;  //API返回payCount_listArr数据，数组
    let payCount_list;      //格式化payCount_list数据，对象	 
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((res)=>{
        if(page.data.payCount_list && page.data.payCount_list.length>0){
          payCount_list =page.data.payCount_list;
        }else{
          payCount_list = [];
        }
        payCount_listArr = res.list;
        if(payCount_listArr){
          payCount_listArr.forEach(function (value,index) {
            value.credit_pay_amt = value.credit_pay_amt.toString();
            value.credit_pay_amt = `${Common.number_format(Math.abs((parseInt(value.credit_pay_amt)))/100,2, ".", ",")}`;
            value.credit_user_refund_amt = value.credit_user_refund_amt.toString();
            value.credit_user_refund_amt = `${Common.number_format(Math.abs((parseInt(value.credit_user_refund_amt)))/100,2, ".", ",")}`;
            value.credit_pay_net_amount = value.credit_pay_net_amount.toString();
            value.credit_pay_net_amount = `${Common.number_format(Math.abs((parseInt(value.credit_pay_net_amount)))/100,2, ".", ",")}`;
            payCount_list.push(value);
          });
        }
        res.count.credit_pay_amt = res.count.credit_pay_amt.toString();
        res.count.credit_pay_amt = `${Common.number_format(Math.abs((parseInt(res.count.credit_pay_amt)))/100,2, ".", ",")}`;
        page.setData({
          "payInfo": res,
          "payCount_list": payCount_list,
          "page": res.nextid,
        })

      }).catch((err)=>{
        wx.showModal({
          title: '提示',
          content: err.data.AgwBody.result_msg,
          showCancel: false
        })
        return;
      })
    }
}


module.exports = getPayCountList;