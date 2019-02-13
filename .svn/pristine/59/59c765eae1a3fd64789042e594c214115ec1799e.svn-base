//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');

//查询商户订单退款列表
const GetrefundListApi = require('../../ddpay/order_refund_list.js');

let self;

Page({


  /**
   * 页面的初始数据
   */
  data: {
    
    "Feed": '../../resource/image/feed.png',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    /* wx.showLoading({
      title: '加载中',
      mask: true
    }) */
    self = this;  
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let query_no = options.query_no
    if (OperatorInfo) {
      // 获取
      let op = {
        query_no
      }

      //获取
      let GetrefundList = new GetrefundListApi(op);
      GetrefundList.reqrefundList(self).then(()=>{
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
    /* wx.showLoading({
      title: '加载中',
      mask: true
    }) */
    self = this;  
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let query_no = options.query_no

    if (OperatorInfo) {
      let op = {
        query_no: query_no
      }
      let GetrefundList = new GetrefundListApi(op);
      GetrefundList.reqrefundList(self).then(()=>{
        wx.hideLoading();
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
  refundDetail:function(res){
    let refundDetailData = res.currentTarget.dataset;
    wx.setStorageSync("refundDetailData", refundDetailData);
    return wx.redirectTo({
      url: './refund_detail/refund_detail',
    })
  }


});

