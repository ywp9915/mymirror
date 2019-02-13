//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/boss_change_opt_psw.js');
const WxLoginApi = require('../../wx/wx_login.js');

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
      data:JSON.parse(options.data)
    })
  },
  getPsw(e){
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
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

    let loadApi = new dataApi(this);
    loadApi.changePsw(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
        wx.showModal({
          title: '提示',
          content: '修改成功',
          showCancel:false,
          success:function(){
            wx.navigateBack({
              delta: 2
            })
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