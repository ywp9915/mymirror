//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');

//获取提现记录列表
const GetPresentApi = require('../../ddpay/getPresent_info.js');

let self;

Page({


  /**
   * 页面的初始数据
   */
  data: {
    "PageNum": 1,
    "Feed": '../../resource/image/feed.png',

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    self = this;
    
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let PageNum = self.data.PageNum;
    let OrderListAgw;
    if (OperatorInfo) {
      let op = {
        PageNum,
      }
      let GetPresentList = new GetPresentApi(op);
      GetPresentList.reqPresent(self).then((data) => {
        wx.hideLoading();
      })
      .catch((err) => {
      });

    }
     else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
      })
    }

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

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    self = this;  
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let PageNum = self.data.PageNum;

    if (OperatorInfo) {
      let op = {
        PageNum: PageNum
      }
      let GetPresentList = new GetPresentApi(op);
      GetPresentList.reqPresent(self).then((data) => {
        wx.hideLoading();
      })
      .catch((err) => {
      });

    }else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})

