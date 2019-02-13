const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/operator_list.js');
const WxLoginApi = require('../../wx/wx_login.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');
// pages/clerk_manage/clerk_manage.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let loadApi = new dataApi(this);
    // loadApi.load_list(this).then((res) => {
    //   if(res.result_code=="0000000"||res.result_code=="00000"){
    //     this.setData({
    //       list:res.rows
    //     })
    //   }else{
    //     wx.showModal({
    //       title: '提示',
    //       content: res.result_msg
    //     })
    //   }
    // })
    // .catch((res) => {
    //   wx.showModal({
    //     title: '提示',
    //     content: res.data.AgwBody.result_msg
    //   })
    // });
  },

  enterNewly(){
    wx.navigateTo({
      url: '../clerk_newly/clerk_newly'
    })
  },
  enterDetail(e){
    var data = e.currentTarget.dataset.data;
    data = JSON.stringify(data);
    wx.navigateTo({
      url: '../clerk_message/clerk_message?data='+data
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
    let loadApi = new dataApi(this);
    loadApi.load_list(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
        this.setData({
          list:res.rows
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