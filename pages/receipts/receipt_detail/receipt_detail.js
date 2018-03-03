// pages/receipt_detail/receipt_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    "MerInfoName": [
      {
        Desc: "商户账号",
        Key: "mercode"
      },
      {
        Desc: "商户名称",
        Key: "mername"
      }

    ],
    "OrderInfoName": [
      {
        Desc: "订单号",
        Key: "channel_order_no"
      },
      {
        Desc: "支付流水号",
        Key: "pay_no"
      },
      {
        Desc: "支付方式",
        Key: "pay_type"
      },
      {
        Desc: "支付时间",
        Key: "pay_time_HMS"
      }


    ],
    "FeeInfoName": [
      {
        Desc: "优惠金额",
        Key: "discount_amt"
      },
      {
        Desc: "支付金额",
        Key: "pay_amt"
      },
      {
        Desc: "订单金额",
        Key: "total_amt"
      },
      {
        Desc: "手续费",
        Key: "fee"
      },


    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (OrderData) {
    //console.log(OrderData)
    let OrderId = OrderData.OrderId;
    let GroupId = OrderData.GroupId;
    let OrderDetail = wx.getStorageSync('OrderDetail');

    this.setData({
      'OrderDetail': OrderDetail,
      "GroupId": GroupId
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
    try {
      wx.removeStorageSync('OrderDetail')
    } catch (err) {
      console.log(err);
    }
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