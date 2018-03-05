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
    let presentListArr;  //API返回order_list数据，数组
    let PresentList;      //初次获取的order_list数据，对象	          

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    }).then((presentData)=>{
      if(page.data.presentlist && page.data.presentlist.length>0){
        PresentList =page.data.presentlist;
      }else{
        PresentList = [];
      }  
      presentListArr = presentData.withdraw_list;
      const state = ["b","c","d","e","a"];
      if(presentListArr){
        presentListArr.forEach(function (value,index) {
          value.bill_no = value.bank_accno.substr(value.bank_accno.length-4,4);
          value.stateColor = value.status == "-1" ? "a" : state[value.status];
          value.pay_amt = Common.number_format(Math.abs((parseInt(value.amount)))/100,2, ".", ",");
          PresentList.push(value);
        });
      }
      page.setData({
        "presentlist": PresentList,
        "PageNum": page.data.PageNum + 1,
      })

    });

    }
}


module.exports =getPresent;