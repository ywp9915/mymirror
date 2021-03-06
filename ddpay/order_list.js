const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');

let StartTime = Common.setStartTimeYMD(0);
let EndTime = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');


class OrderList extends LoginAgw {
  constructor(Body) {
    super();
    let PageNum = Body.PageNum;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let MerCode = OperatorInfo.mercode;
    let Operator = OperatorInfo.operator;
    this.AgwBody = {
      "contain_mer_trans": "Y",
      "count_date_type": "ORDER_DATE",
      "mercode": MerCode,
      "order_end_date": Body.order_end_date || EndTime,
      "order_end_time": Body.order_end_time || '235959',
      "order_start_date": Body.order_start_date || StartTime,
      "order_start_time": Body.order_start_time || '000000',
      "order_status": "SUCCESS",
      "order_type": "",
      "page_num": PageNum,
      "page_size": 10,
      "pay_class": Body.pay_class,
      "query_no": '0',
      "query_type": "MER",
    }
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
    this.AgwHead.msg_code = "ddpay_order_list";
    
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqOrderList(page) {
    let that = this;
    let OrderListArr;  //API返回order_list数据，数组
    let OrderList;      //格式化order_list数据，对象
    
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);
    })
      .then((OrderListResBody) => {
        if(page.data.OrderList && page.data.OrderList.length>0){
          OrderList = page.data.OrderList;
        }else{
          OrderList = [];
        }
        if(OrderListResBody.count == 0){
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
          OrderListArr = OrderListResBody.order_list;
           for (let i = 0; i < OrderListArr.length; i++) {
             OrderListArr[i].total_amt = Common.fomatAmount(OrderListArr[i].total_amt / 100);
             OrderListArr[i].pay_amt = Common.fomatAmount(OrderListArr[i].pay_amt / 100);
             OrderListArr[i].fee = Common.fomatAmount(OrderListArr[i].fee / 100);
             OrderListArr[i].discount_amt = Common.fomatAmount(OrderListArr[i].discount_amt / 100);
             OrderListArr[i].total_refund_amt = Common.fomatAmount(OrderListArr[i].total_refund_amt / 100);
             OrderListArr[i].total_refunding_amt = Common.fomatAmount(OrderListArr[i].total_refunding_amt / 100);
             if(OrderListArr[i].refund_status == 'ALL'){
              OrderListArr[i].refund_status = '全部退款';
             }else if(OrderListArr[i].refund_status == 'PORTION'){
              OrderListArr[i].refund_status = '部分退款';
             }else if(OrderListArr[i].refund_status == 'W'){
              OrderListArr[i].refund_status = '未退款';
             }
             let PayTime = OrderListArr[i].pay_time
             OrderListArr[i].pay_time_YMD = `${PayTime.slice(0, 4)}-${PayTime.slice(4, 6)}-${PayTime.slice(6, 8)}`;
             OrderListArr[i].pay_time_HMS = `${PayTime.slice(8, 10)}:${PayTime.slice(10, 12)}:${PayTime.slice(12, 14)}`;
             let OrderTime = OrderListArr[i].order_time
             OrderListArr[i].order_time_YMD = `${OrderTime.slice(0, 4)}-${OrderTime.slice(4, 6)}-${OrderTime.slice(6, 8)}`;
             OrderListArr[i].order_time_HMS = `${OrderTime.slice(8, 10)}:${OrderTime.slice(10, 12)}:${OrderTime.slice(12, 14)}`;
             OrderList.push(OrderListArr[i]);
           }
            page.setData({
              "OrderList": OrderList,
              "PageNum": page.data.PageNum + 1,
              "noData": false
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


module.exports = OrderList;