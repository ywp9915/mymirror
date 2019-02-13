const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');

let StartTime = Common.setStartTimeYMD(0);
let EndTime = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');


class refundList extends LoginAgw {
  constructor(Body) {
    super();
    let PageNum = Body.PageNum;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let MerCode = OperatorInfo.mercode;
    let Operator = OperatorInfo.operator;
    this.AgwBody = {
      "branch_mercode": '',
      "mercode": MerCode,
      "page_num": PageNum,
      "page_size": 10,
      "pay_class": Body.pay_class,
      "query_direction": '1',
      "query_no": '0',
      "query_type": "MER",
      "refund_end_date": Body.order_end_date || EndTime,
      "refund_end_time": Body.order_end_time || '235959',
      "refund_start_date": Body.order_start_date || StartTime,
      "refund_start_time": Body.order_start_time || '000000',
      "refund_status": 'S',
    }
    if (OperatorInfo.operator_role == "OPERATOR") {//收银员登录
      this.AgwBody.query_type = "OPERATOR";
      this.AgwBody.query_no = Operator;
      
    }else{//老板、店长登录
      if(Body.operator_name){
        this.AgwBody.query_type = "OPERATOR";
        this.AgwBody.query_no = Body.operator_name;
      }
    }
    this.AgwHead.msg_code = "ddpay_refund_list";
    
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqRefundList(page) {
    let that = this;
    let OrderListArr;  //API返回order_list数据，数组
    let OrderList;      //格式化order_list数据，对象
    
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);
    })
      .then((refundListResBody) => {
        if(page.data.OrderList && page.data.OrderList.length>0){
          OrderList = page.data.OrderList;
        }else{
          OrderList = [];
        }
        if(refundListResBody.count == 0){
          if(page.data.PageNum == 1){
            page.setData({
              "noData": true
            })
            return;
          }else{
            page.setData({
              "nextPage": false
            })
            return;
          }
          //wx.stopPullDownRefresh();
        }else{
          OrderListArr = refundListResBody.order_list;
           for (let i = 0; i < OrderListArr.length; i++) {
             OrderListArr[i].user_refund_amt = Common.fomatAmount(OrderListArr[i].user_refund_amt / 100);
             OrderListArr[i].mer_cls_amt = Common.fomatAmount(OrderListArr[i].mer_cls_amt / 100);
             OrderListArr[i].mer_cls_amt.slice(0, 1) == "-"? OrderListArr[i].pay_amt_type = "plus" : OrderListArr[i].pay_amt_type = "minus";
             if(OrderListArr[i].refund_status == 'W'){
              OrderListArr[i].refund_status = '未发起退款';
             }else if(OrderListArr[i].refund_status == 'P'){
              OrderListArr[i].refund_status = '退款中';
             }else if(OrderListArr[i].refund_status == 'F'){
              OrderListArr[i].refund_status = '退款失败';
             }else if(OrderListArr[i].refund_status == 'S'){
              OrderListArr[i].refund_status = '退款成功';
             }
             if(OrderListArr[i].pay_class == 'WX'){
              OrderListArr[i].pay_class = '微信';
             }else if(OrderListArr[i].pay_class == 'ZFB'){
              OrderListArr[i].pay_class = '支付宝';
             }else if(OrderListArr[i].pay_class == 'WALLET'){
              OrderListArr[i].pay_class = '钱包';
             }else if(OrderListArr[i].pay_class == 'VIP'){
              OrderListArr[i].pay_class = '会员卡';
             }
             OrderListArr[i].main_order_no_s = `${OrderListArr[i].main_order_no.slice(0,2)}...${OrderListArr[i].main_order_no.slice(-6)}`;
             let createTime = OrderListArr[i].create_time
             OrderListArr[i].create_time_YMD = `${createTime.slice(0, 4)}-${createTime.slice(4, 6)}-${createTime.slice(6, 8)}`;
             OrderListArr[i].create_time_HMS = `${createTime.slice(8, 10)}:${createTime.slice(10, 12)}:${createTime.slice(12, 14)}`;
             OrderListArr[i].create_time = `${OrderListArr[i].create_time_YMD} ${OrderListArr[i].create_time_HMS}`;
             let refundFinishTime = OrderListArr[i].refund_finish_time
             OrderListArr[i].refund_finish_time_YMD = `${refundFinishTime.slice(0, 4)}-${refundFinishTime.slice(4, 6)}-${refundFinishTime.slice(6, 8)}`;
             OrderListArr[i].refund_finish_time_HMS = `${refundFinishTime.slice(8, 10)}:${refundFinishTime.slice(10, 12)}:${refundFinishTime.slice(12, 14)}`;
             OrderListArr[i].refund_finish_time = `${OrderListArr[i].refund_finish_time_YMD} ${OrderListArr[i].refund_finish_time_HMS}`;
             OrderList.push(OrderListArr[i]);
           }
            page.setData({
              "OrderList": OrderList,
              "PageNum": page.data.PageNum + 1,
              "noData": false,
              "total": refundListResBody.total
            })
            if (OrderListArr.length < 10){
              page.setData({
                "nextPage": false
              })
            }
        }
      })
  }
}


module.exports = refundList;