//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/switch_operator.js');
const WxLoginApi = require('../../wx/wx_login.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    state:0,
    new_state:"",
    old_state:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let operator_role = wx.getStorageSync("OperatorInfo").operator_role;
    
    var data = JSON.parse(options.data);
    this.setData({
      data:data,
      operator_role: operator_role
    })
    this.setData({
      name:data.operator_name
    })
    if(data.state==1){
       this.setData({
        state:data.state,
        new_state:data.state,
        old_state:0
      })
    }else{
      this.setData({
        state:data.state,
        new_state:data.state,
        old_state:1
      })
    }
  },
  switchChange(e){
    if(e.detail.value){
      this.setData({
        state:1,
        new_state:1,
        old_state:0
      })
    }else{
      this.setData({
        state:0,
        new_state:0,
        old_state:1
      })
    }
    let loadApi = new dataApi(this);
    loadApi.switch(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){

      }else{
        wx.showModal({
          title: '提示',
          content: res.result_msg
        })
      }
    })
    .catch((res) => {
      wx.showModal({
        title: '提示',
        content: res.data.AgwBody.result_msg
      })
    });
  },
  enterChangePsw(){
    wx.navigateTo({
      url: '../change_login_psw/change_login_psw?data='+JSON.stringify(this.data.data)
    })
  },
  enterChangeRole(){
    wx.navigateTo({
      url: '../change_login_role/change_login_role?data='+JSON.stringify(this.data.data)
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