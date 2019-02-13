//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/first_change_psw.js');
const WxLoginApi = require('../../wx/wx_login.js');
const getToken = require('../../ddpay/getToken.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    psw:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data:JSON.parse(options.data),
      old_psw:options.old_psw
    })

    if(this.data.data.role=="MANAGER"){
      this.setData({
        status:0
      })
    }else{
      this.setData({
        status:1
      })
    }
  },
  confirm(){
    if(this.data.psw==""||this.data.psw.length<6){
      wx.showModal({
        title: '提示',
        content: '请先输入不小于6位的新密码',
        showCancel:false
      })
      return false;
    }

    let CPSW = new dataApi(this);
    CPSW.changePsw(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
        wx.showModal({
          title: '提示',
          content: '修改成功',
          showCancel:false,
          success:()=>{
            if(wx.getStorageSync("operatorList")){
              if(wx.getStorageSync("operatorList").count>1){
                wx.redirectTo({
                  url: '../choose_store/choose_store'
                })
              }else{
                this.setData({
                  auth_token:wx.getStorageSync("operatorList").auth_token,
                  operator:wx.getStorageSync("operatorList").merchants[0].operator
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
                      operator_role:res.operator_role
                    }

                    wx.setStorageSync("OperatorInfo", OperatorInfo);

                    wx.reLaunch({
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
            }else{
              wx.reLaunch({
                url: '../menu/menu',
              })
            }
          }
        })
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
  },
  getPsw(e){
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})