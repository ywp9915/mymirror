const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
let StartTime = Common.setStartTimeYMD(90);
let EndTime = Common.setCurTimeYMD();
const WxRequest = require('./../wx/wx_request.js');

//查询商户清算列表
class getAccountLlist extends LoginAgw {
    constructor(Body) {
    super();
    let PageNum = Body.PageNum;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let mercode = OperatorInfo.mercode;
    this.AgwBody = {
        "end_date":EndTime,
        "mercode": mercode,
        "page_num":PageNum,
        "page_size":10,
        "start_date":StartTime,
    };
    this.AgwHead.msg_code = "grcb_mer_clear_list";

    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  reqAccountList(page) {
    let that = this;
    let AccountListArr;  //API返回AccountListArr数据，数组
    let AccountList;      //格式化AccountList数据，对象	 
    // let plus;
    // let minus;         

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((accountDataList)=>{
        if(page.data.accountList && page.data.accountList.length>0){
          AccountList =page.data.accountList;
        }else{
          AccountList = [];
        }
        AccountListArr = accountDataList.list;
        if(AccountListArr){
          AccountListArr.forEach(function (value,index) {
            value.cls_amt = value.cls_amt.toString();
            value.cls_amt = `${Common.number_format(Math.abs((parseInt(value.cls_amt)))/100,2, ".", ",")}`;
            value.pay_amt = value.pay_amt.toString();
            value.pay_amt = `${Common.number_format(Math.abs((parseInt(value.pay_amt)))/100,2, ".", ",")}`;

            value.mer_fee = value.mer_fee.toString()
            value.mer_fee = `${Common.number_format(Math.abs((parseInt(value.mer_fee)))/100,2, ".", ",")}`;
            if(value.cls_status == '11'){
              value.cls_status = '入账成功'
            } else if(value.cls_status == 'FF'){
              value.cls_status = '入账失败'
            } else if(value.cls_status == 'P'){
              value.cls_status = '待入账'
            }
            AccountList.push(value);
          });
        }

        page.setData({
          "accountList": AccountList,
          "PageNum": page.data.PageNum + 1,
        })

      });

    }
}


module.exports =getAccountLlist;