//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const getToken = require('../../ddpay/getToken.js');
const WxLoginApi = require('../../wx/wx_login.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');
// pages/choose_store/choose_store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:"",
    list:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data:wx.getStorageSync("operatorList"),
      list:wx.getStorageSync("operatorList").merchants
    })
  },
  chooseOperator:function(e){
    var data = e.currentTarget.dataset.item;
    
    this.setData({
      operator:data.operator,
      auth_token:this.data.data.auth_token
    })

    let loadApi = new getToken(this);
    loadApi.get_token(this).then((res) => {
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

        wx.reLaunch({
          url: '../menu/menu'
        })
      }else{
        wx.showToast({
          title: '提示',
          content: res.result_msg
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