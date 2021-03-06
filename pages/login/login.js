//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/new_login.js');
const WxLoginApi = require('../../wx/wx_login.js');
const getToken = require('../../ddpay/getToken.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');

Page({
  data:{
    status:0,
    bottomText:"找回密码",
    mobile:"",
    account:"",
    psw:""
  },
  onLoad: function (options) {
    self = this
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    if (OperatorInfo) {
      return wx.redirectTo({
        url: '../menu/menu',
      })
    }
    else {
    let WxLogin;
    WxLogin = new WxLoginApi();
    WxLogin.reqWxLogin()
      .then((WxCode) => {
        let CheckLogin = new CheckLoginApi({ "WxCode": WxCode })
        CheckLogin.reqCheckLogin()
          .then((CheckLoginResBody) => {
            let ResultCode = CheckLoginResBody.result_code;
            if (ResultCode == '0000000' || ResultCode == '00000') {
              wx.setStorageSync("OperatorInfo", CheckLoginDataBody)
              wx.redirectTo({
                url: '../menu/menu'
              })
            }
            else if (ResultCode == 'auth.wxms_not_login') {
            }
          })
          .catch((err) => {
            // wx.clearStorage();
          })
      })
      .catch((err) => {
        // wx.clearStorage();
      })
    }
  },
  onShareAppMessage: function () {

  },
  changeStatus(e){
    this.setData({
      status: e.currentTarget.dataset.num
    })
    if (e.currentTarget.dataset.num==0){
      this.setData({
        bottomText: "找回密码"
      })
    } else if (e.currentTarget.dataset.num==1){
      this.setData({
        bottomText: "忘记密码？请联系老板"
      })
    }
  },
  findPsw(){
    if(this.data.status==0){
      wx.navigateTo({
        url: '../find_psw/find_psw'
      })
    }
  },
  login(){
    if (this.data.status == 0){//老板登录
      if (this.data.mobile==""||this.data.mobile.length<11){
        wx.showModal({
          title: '提示',
          content: '请先输入完整的手机号',
          showCancel:false
        })
        return false;
      }
      
      if (this.data.psw == ""){
        wx.showModal({
          title: '提示',
          content: '请先输入密码',
          showCancel:false
        })
        return false;
      }

      let loadApi = new dataApi(this);
      loadApi.boss_login(this).then((res) => {
        wx.setStorageSync("operatorList", res);
        if(res.need_mod_pwd==1){
          wx.redirectTo({
            url: '../change_psw/change_psw?data='+JSON.stringify(res)+'&old_psw='+this.data.psw
          })
          return false;
        }

        if(res.count>1){
          wx.redirectTo({
            url: '../choose_store/choose_store'
          })
        }else{
          this.setData({
            auth_token:res.auth_token,
            operator:res.merchants[0].operator
          })
          let getTokenApi = new getToken(this);
          getTokenApi.get_token(this).then((res) => {
            if(res.result_code=="0000000"||res.result_code=="00000"){
              var OperatorInfo = {
                mer_accno:res.mer_accno,
                mercode:res.mercode,
                mername:res.mername,
                mobile:res.mobile,
                operator:res.operator_name,
                operator_access_token:res.operator_access_token,
                operator_accno:res.operator_accno,
                operator_role:res.operator_role,
                orgcode:res.orgcode
              }

              wx.setStorageSync("OperatorInfo", OperatorInfo);

              wx.redirectTo({
                url: '../menu/menu'
              })
            }else{
              wx.showToast({
                title: '提示',
                content: res.result_msg,
                showCancel:false
              })
            }
          })
          .catch((res) => {
            wx.showModal({
              title: '提示',
              content: res.data.AgwBody.result_msg,
              showCancel:false
            })
          });
        }
      })
      .catch((res) => {
        wx.showModal({
          title: '提示',
          content: res.data.AgwBody.result_msg,
          showCancel:false
        })
      });
    }else{//操作员登录
      if (this.data.account==""){
        wx.showModal({
          title: '提示',
          content: '请先输入账号',
          showCancel:false
        })
        return false;
      }
      
      if (this.data.psw == ""){
        wx.showModal({
          title: '提示',
          content: '请先输入密码',
          showCancel:false
        })
        return false;
      }

      let WxLogin;
      WxLogin = new WxLoginApi();
      WxLogin.reqWxLogin()
        .then((WxCode) => {
          this.setData({
            wx_code:WxCode
          })
          let loadApi = new dataApi(this);
          loadApi.operator_login(this).then((res) => {
            if(res.result_code=="0000000"||res.result_code=="00000"){
              wx.removeStorageSync("operatorList");
              wx.setStorageSync("OperatorInfo", res);
              if(res.is_initial==1){
                wx.navigateTo({
                  url: '../change_psw/change_psw?data='+JSON.stringify(res)+'&old_psw='+this.data.psw
                })
              }else{
                return wx.redirectTo({
                  url: '../menu/menu',
                })
              }
            }else{
              wx.showModal({
                title: '提示',
                content: res.result_msg,
                showCancel:false
              })
            }
          })
          .catch((res) => {
            wx.showModal({
              title: '提示',
              content: res.data.AgwBody.result_msg,
              showCancel:false
            })
          });
        })
        .catch((err) => {
          // wx.clearStorage();
        })
         
    }
  },
  getInput(e){
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  }
})