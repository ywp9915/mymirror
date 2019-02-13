const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
let StartTime = Common.setStartTimeYMD(90);
let EndTime = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');

//获取信用支付日志
class getPayLogList extends LoginAgw {
    constructor(Body) {
    super();
    let page = Body.page;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let mercode = OperatorInfo.mercode;
    this.AgwBody = {
      "create_time_end": '',
      "create_time_start": '',
      "mercode": mercode,
      "page": page,
      "page_size": 10
    };
    this.AgwHead.msg_code = "dd_mer_credit_log";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  payLogList(page) {
    let that = this;
    let payLog_listArr;  //API返回payLog_listArr数据，数组
    let payLog_list;      //格式化payLog_list数据，对象	 
    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((res)=>{
        if(page.data.payLog_list && page.data.payLog_list.length>0){
          payLog_list =page.data.payLog_list;
        }else{
          payLog_list = [];
        }
        payLog_listArr = res.list;
        if(payLog_listArr){
          payLog_listArr.forEach(function (value,index) {
            if(value.status == '2'){
              value.status = '待审核';
            } else if(value.status == '1'){
              value.status = '审核成功';
              value.look_status = 'status_success';
            } else if(value.status == '-1'){
              value.status = '审核不通过';
            }
            if(value.action == 'start'){
              value.action = '开启';
            } else{
              value.action = '关闭';
            }
            payLog_list.push(value);
          });
        }
        
        page.setData({
          "is_creditcard": res.is_creditcard,
          "payLog_list": payLog_list,
          "page": res.nextid,
        })

      });

    }
}


module.exports = getPayLogList;