// pages/receipt_detail/receipt_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    "MerInfoName": [
      {
        Desc: "商户编号",
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
        Key: "main_order_no"
      },
      {
        Desc: "退款单号",
        Key: "refund_order_no"
      },
      {
        Desc: "退款方式",
        Key: "pay_class"
      },
      {
        Desc: "退款创建时间",
        Key: "create_time"
      },
      {
        Desc: "退款完成时间",
        Key: "refund_finish_time"
      }


    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (OrderData) {
    let OrderId = OrderData.OrderId;
    let GroupId = OrderData.GroupId;
    let refundDetail = wx.getStorageSync('refundDetailData');
    console.log(refundDetail.refundid)
    this.setData({
      'refundDetail': refundDetail.refundid,
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
      wx.removeStorageSync('refundDetail')
    } catch (err) {
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