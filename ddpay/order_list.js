const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');

let StartTime = Common.setStartTimeYMD(90);
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
      "count_date_type": "ORDER_DATE",
      "mercode": MerCode,
      "order_end_date": EndTime,
      "order_start_date": StartTime,
      "order_status": "SUCCESS",
      "order_type": "CASHIER",
      "page_num": PageNum,
      "page_size": 10,
      "query_no": MerCode,
      "query_type": "MER",
    }

    this.AgwHead.msg_code = "ddpay_order_list";
    if (OperatorInfo.operator_role !== "MANAGER") {
      this.AgwBody.query_type = "OPERATOR";
      this.AgwBody.query_no = Operator;
    }
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqOrderList(page) {
    let that = this;
    let OrderListArr;  //API返回order_list数据，数组
    let OrderList;      //初次获取的order_list数据，对象
    let GroupSet;     //set对象，用于去重
    let GroupArr;      //set对象转换为数组，去除重复元素
    // let Group;
    let OldGroup;     //以OrderList的KEY值作数组，初次获取为空。
    // let OrderGroup;
    // let GroupOrderList;
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((OrderListResBody) => {
        
        console.log(OrderListResBody);
        OrderListArr = OrderListResBody.order_list;
        if (OrderListArr.length !== 0) {

          OrderList = page.data.OrderList;
          console.log(OrderList);
          if (OrderList){
            OldGroup = Object.keys(OrderList);
            GroupSet = new Set([...OldGroup]);
          }
          else{
            OldGroup = [];
            GroupSet = new Set();
            OrderList = {};
          }
        
           for (let i = 0; i < OrderListArr.length; i++) {
             OrderListArr[i].total_amt = Common.fomatAmount(OrderListArr[i].total_amt / 100);
             OrderListArr[i].pay_amt = Common.fomatAmount(OrderListArr[i].pay_amt / 100);
             OrderListArr[i].fee = Common.fomatAmount(OrderListArr[i].fee / 100);
             OrderListArr[i].discount_amt = Common.fomatAmount(OrderListArr[i].discount_amt / 100);
             let PayTime = OrderListArr[i].pay_time
             OrderListArr[i].pay_time_YMD = `${PayTime.slice(0, 4)}-${PayTime.slice(4, 6)}-${PayTime.slice(6, 8)}`;
             OrderListArr[i].pay_time_HMS = `${PayTime.slice(8, 10)}:${PayTime.slice(10, 12)}:${PayTime.slice(12, 14)}`;
             GroupSet.add(OrderListArr[i].pay_time_YMD)
           }

           let GroupArr = Array.from(GroupSet);
          //检查是否有新的日期，有则添加新的key
           for (let i = 0; i < GroupArr.length; i++) {
             let ExitItem = OldGroup.findIndex(function (value, index, arr) {
               return value == GroupArr[i]
             })
             if (ExitItem == -1) {
               OrderList[GroupArr[i]] = [];
             }
           }
          //匹配订单的日期push进去订单Orderlist对象
            for (let i = 0; i < OrderListArr.length; i++) {
              let item = GroupArr.find(function (value, index, arr) {
                if (value == OrderListArr[i].pay_time_YMD) {
                  OrderList[value].push(OrderListArr[i])
                }
              })
            }
            page.setData({
              "OrderList": OrderList,
              "PageNum": page.data.PageNum + 1,
            })

        }


      })
  }
}


module.exports = OrderList;