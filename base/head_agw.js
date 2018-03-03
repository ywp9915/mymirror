
const Config = require('../config.js')
const Common = require('./common.js');

class HeadAgw {
  constructor() {
    let AppId = Config.APP_ID;
    let ReqTime = Common.setCurTime();

    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    let Operator = "";
    let MerCode = "";
    let Token = "";

    if (OperatorInfo) {
      Operator = OperatorInfo.operator;
      MerCode = OperatorInfo.mercode;
      Token = OperatorInfo.operator_access_token;
    }
 
    this.AgwHead = {
      "app_id": AppId,
      "charset": "utf-8",
      "mercode": MerCode,
      "msg_code": "", //接口名
      "operator": Operator, //操作员，checklogin可为空
      "operator_access_token": Token,
      "req_time": ReqTime,
      "seq_no": "1512554239408",
      "sign_type": "sha256",
      "sys_no": "WXMS_CS",
      "sys_paltform": "HY",
      "term_class": "WXMS",
      "term_type": "CS_WXMS",
      "version": "2.0.0",
    };

  }

}


module.exports = HeadAgw;
