const Common = require('../../../base/common.js');
const Config = require('../../../config.js');
const ResultQueryApi = require('../../../ddpay/order_result_query.js');
const CreateQrCode = require('../../../base/create_qrcode.js');
const CreateAudio = require('../../../wx/wx_createaudio.js');
let self;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StopTimeout: false,
    mer_name :" "
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    self = this;
    let QrData = wx.getStorageSync("QrData");
    let QrUrl = QrData.pay_url;
    QrData.TotalAmt = Common.fomatAmount(QrData.TotalAmt);
    console.log(QrUrl);
    CreateQrCode.createQr('qrcode', QrUrl, 500, 500);

    self.setData({
      "QrData": QrData,
      mer_name :" "
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

    let QrData = wx.getStorageSync("QrData");
    let QrToken = QrData.qrcode_token;
    let ResultQuery = new ResultQueryApi({ QueryNo: QrToken, QueryType: "qrcode_token" });
    let DeadLine = Common.setResultQueryDeadLine();
    ResultQuery.queryOrderResult(self);
    let Mer_name = wx.getStorageSync("OperatorInfo").mername;
    console.log(Mer_name);
    self.setData({
      mer_name :Mer_name
    });

    // function queryOrderResult() {
    //   let StopTimeout = self.data.StopTimeout

    //   if (new Date().getTime() <= DeadLine && !StopTimeout) {

    //     ResultQuery.queryOrderResult()
    //       .then((ResAgwBody) => {
    //         let OrderStatus = ResAgwBody.order_status;
    //         if (OrderStatus == "SUCCESS") {
    //           let PayAmT = ResAgwBody.pay_info.pay_amt / 100
    //           let MenuUrl = '../../menu/menu'
    //           CreateAudio(PayAmT, self, MenuUrl)
    //         } else if (OrderStatus == "WAITPAY") {
    //           setTimeout(queryOrderResult
    //             , 3500)

    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err)

    //       })
    //   }
    // }

    // setTimeout(queryOrderResult, 4000)

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
    wx.removeStorageSync('QrData')
    self.data.StopTimeout = true;

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

  },

  endVoice: function () {
    console.log("endvoice")
    return wx.redirectTo({
      url: '../../menu/menu',
    })
  }
})