// pages/receipt_detail/receipt_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      illustrate_type: "说明",
      illustrate_detail : "您可以查询指定账户三个月内的所有交易流水，如超出时间请到订点河源官方网站查询。",
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (res) {
      //console.log(res)
      let purseDetailData = wx.getStorageSync('purseDetailData');
        //console.log(purseDetailData);
        this.setData({
          'purseDetail': purseDetailData.purseid
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