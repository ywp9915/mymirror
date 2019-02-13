const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
let StartTime = Common.setStartTimeYMD(1);
let EndTime = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');

//查询商户订单退款列表
class getrefundLlist extends LoginAgw {
    constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let mercode = OperatorInfo.mercode;
    let query_no = Body.query_no;
    this.AgwBody = {
        "mercode": mercode,
        "query_no": query_no,
        "query_type": 'MAIN_ORDER_NO'
    };
    this.AgwHead.msg_code = "ddpay_order_refund_list";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqrefundList(page) {
    let that = this;
    let refundListArr;  //API返回refundListArr数据，数组
    let refundList;      //格式化refundList数据，对象	 
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((refundDataList)=>{
        if(page.data.refundList && page.data.refundList.length>0){
          refundList =page.data.refundList;
        }else{
          refundList = [];
        }
        refundListArr = refundDataList.order_list;
        if(refundListArr){
          refundListArr.forEach(function (value,index) {
            value.mer_cls_amt = value.mer_cls_amt.toString()
            value.mer_cls_amt.slice(0, 1) == "-"? value.pay_amt_type = "plus" : value.pay_amt_type = "minus";
            value.mer_cls_amt = `${value.mer_cls_amt.slice(0, 1)}${Common.number_format(Math.abs((parseInt(value.mer_cls_amt)))/100,2, ".", ",")}`;

            value.user_refund_amt = value.user_refund_amt.toString()
            value.user_refund_amt = `${Common.number_format(Math.abs((parseInt(value.user_refund_amt)))/100,2, ".", ",")}`;
            let create_time = value.create_time
             value.create_time_YMD = `${create_time.slice(0, 4)}-${create_time.slice(4, 6)}-${create_time.slice(6, 8)}`;
             value.create_time_HMS = `${create_time.slice(8, 10)}:${create_time.slice(10, 12)}:${create_time.slice(12, 14)}`;
             value.create_time = `${value.create_time_YMD} ${value.create_time_HMS}`
             let refund_finish_time = value.refund_finish_time
             value.refund_finish_time_YMD = `${refund_finish_time.slice(0, 4)}-${refund_finish_time.slice(4, 6)}-${refund_finish_time.slice(6, 8)}`;
             value.refund_finish_time_HMS = `${refund_finish_time.slice(8, 10)}:${refund_finish_time.slice(10, 12)}:${refund_finish_time.slice(12, 14)}`;
             value.refund_finish_time = `${value.refund_finish_time_YMD} ${value.refund_finish_time_HMS}`
            if(value.refund_status == 'W'){
              value.refund_status = '未发起退款'
            } else if(value.refund_status == 'P'){
              value.refund_status = '退款中'
            } else if(value.refund_status == 'F'){
              value.refund_status = '退款失败'
            } else if(value.refund_status == 'S'){
              value.refund_status = '退款成功'
            }
            if(value.pay_class == 'WX'){
              value.pay_class = '微信支付'
            } else if(value.pay_class == 'ZFB'){
              value.pay_class = '支付宝'
            } else if(value.pay_class == 'WALLET'){
              value.pay_class = '钱包'
            } else if(value.pay_class == 'VIP'){
              value.pay_class = '会员卡'
            }
            refundList.push(value);
          });
        }

        page.setData({
          "refundList": refundList
        })

      })

    }
}


module.exports =getrefundLlist;