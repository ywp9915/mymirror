//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');

//获取商户订单交易列表
const OrderListApi = require('../../ddpay/order_list.js');
//获取商户交易统计
// const MerCountApi = require('../../ddpay/order_mer_count.js');
//获取商户及操作员商户交易统计
const TradeCountApi = require('../../ddpay/order_operator_count.js');

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
        PageNum: PageNum
      }
      OrderListAgw = new OrderListApi(op);
      OrderListAgw.reqOrderList(self).then(() => {
        let GroupArr = Object.keys(self.data.OrderList);
        let TradeCount = new TradeCountApi({ PageSize: GroupArr.length });
        TradeCount.reqTradeCount(self, GroupArr);

      })
        .catch((err) => {
          console.log(err);
          console.log('order_list err');
        })

    }
     else {
      console.log("没有缓存信息");
      wx.clearStorageSync();
      return wx.redirectTo({
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

    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let PageNum = self.data.PageNum;
    let OrderListAgw;

    if (OperatorInfo) {
      let op = {
        PageNum: PageNum
      }
      OrderListAgw = new OrderListApi(op);
      OrderListAgw.reqOrderList(self).then(() => {
        let GroupArr = Object.keys(self.data.OrderList);
        let TradeCount = new TradeCountApi({ PageSize: GroupArr.length });
        TradeCount.reqTradeCount(self, GroupArr);
      })
        .catch((err) => {
          console.log(err)
          console.log('order_list err')
        })

    }
    else {
      wx.clearStorageSync();
      return wx.redirectTo({
        url: '../login/login',
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  receiptDetail: function (res) {
    let OrderData = res.currentTarget.dataset;
    let OrderId = OrderData.orderid
    let GroupId = OrderData.groupid
    console.log(OrderData);
    let OrderDetail = this.data.OrderList[GroupId][OrderId]
    console.log(OrderDetail)
    wx.setStorageSync("OrderDetail", OrderDetail)
    wx.navigateTo({
      url: `./receipt_detail/receipt_detail?OrderId=${OrderId}&GroupId=${GroupId}&`,
    })
  }
})

