const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
let StartTime = Common.setStartTimeYMD(1);
let EndTime = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');

//查询钱包记账流水
class getPurseLlist extends LoginAgw {
    constructor(Body) {
    super();
    let PageNum = Body.PageNum;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let mer_accno = OperatorInfo.mer_accno;
    this.AgwBody = {
        "account_no": mer_accno,
        "end_time":EndTime,
        "page":PageNum,
        "page_size":10,
        "start_time":StartTime,
    };
    this.AgwHead.msg_code = "ddpay_wallet_acc_logs";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqPurseList(page) {
    let that = this;
    let PurseListArr;  //API返回PurseListArr数据，数组
    let PurseList;      //格式化PurseList数据，对象	 
    // let plus;
    // let minus;         

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((purseDataList)=>{
        if(page.data.purseList && page.data.purseList.length>0){
          PurseList =page.data.purseList;
        }else{
          PurseList = [];
        }
        PurseListArr = purseDataList.detailRow;
        if(PurseListArr){
          PurseListArr.forEach(function (value,index) {
            value.amount.slice(0, 1) == "+"? value.pay_amt_type = "plus" : value.pay_amt_type = "minus";
            value.pay_amt = `${value.amount.slice(0, 1)}${Common.number_format(Math.abs((parseInt(value.amount)))/100,2, ".", ",")}`;
            const transtime = value.transtime;
            value.purse_time = `${transtime.slice(0, 4)}-${transtime.slice(4, 6)}-${transtime.slice(6, 8)} ${transtime.slice(8, 10)}:${transtime.slice(10, 12)}:${transtime.slice(12, 14)}`;
            PurseList.push(value);
          });
        }

        page.setData({
          "purseList": PurseList,
          "PageNum": page.data.PageNum + 1,
        })

      });

    }
}


module.exports =getPurseLlist;