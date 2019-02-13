const LoginAgw = require('./../base/head_agw.js');
const Config = require('../config.js');
const Common = require('./../base/common.js');
const WxRequest = require('./../wx/wx_request.js');

//查询商户列表
class getmerLlist extends LoginAgw {
    constructor(Body) {
    super();
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    this.AgwBody = {
        "effective":"Y",
        "mercode": OperatorInfo.mercode,
        "role": OperatorInfo.operator_role
    };
    this.AgwHead.msg_code = "dd_mer_list";
    let Signature = Common.setSignature(this.AgwHead, this.AgwBody);
    this.AgwHead.signature = Signature;
  }

  merListFun(page) {
    let that = this;
    let merListArr;  //API返回merListArr数据，数组
    let merList;      //格式化merList数据，对象	 

    return new Promise((resolve, reject) => {
      WxRequest(that, resolve, reject);

    })
      .then((merDataList)=>{
        if(page.data.merList && page.data.merList.length>0){
          merList =page.data.merList;
        }else{
          merList = [];
        }
        merListArr = merDataList.detail;
        if(merListArr){
          for(var i in merListArr){
            merList.push(merListArr[i]);
          }
        }
        page.setData({
          "merList": merList
        })
      });
    }
}

module.exports =getmerLlist;