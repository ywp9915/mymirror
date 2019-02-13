//配置
const Config = require('../../../config.js');

const Common = require('../../../base/common.js');
//获取信用支付日志
const logListApi = require('../../../ddpay/pay_log_list.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'page': 1,
    "Feed": '../../../resource/image/feed.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let self = this;
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    if (OperatorInfo) {
      /* let is_creditcard = options.is_creditcard;
      self.setData({
        'is_creditcard': is_creditcard
      }) */
      let op = {
        'page': self.data.page
      }
      let getList = new logListApi(op);
      getList.payLogList(self).then(()=>{
        wx.hideLoading();
        
      });

    }else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
      });
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
    let self = this;
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    if (OperatorInfo) {
      let op = {
        'page': self.data.page
      }
      if(self.data.page > 0){
        let getList = new logListApi(op);
        getList.payLogList(self).then(()=>{
          
        });
      }
    }else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})