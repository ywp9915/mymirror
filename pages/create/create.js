// pages/create/create.js
const CreateAndPayAPi = require('../../ddpay/order_create_and_pay.js');
const ResultQueryApi = require('../../ddpay/order_result_query.js');
const validateFuc = require('../../resource/js/validate.js');
const Common = require('../../base/common.js');
const Config = require('../../config.js');
const CreateAudio = require('../../wx/wx_createaudio.js');
let self;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    TotalAmt: "",
    firstCol: [1, 2, 3, '../../resource/image/del_icon@2x.png'],
    secondCol: [4, 5, 6, 'done'],
    thirdCol: [7, 8, 9, 'done'],
    form: {},
    StopTimeout: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    self = this;
    let MerName = wx.getStorageSync("OperatorInfo").mername;
    self.setData({
      MerName
    })
    console.log(self.data.StopTimeout, "self.data.StopTimeout")
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

  setTotalAmt: function (data) {

    let TotalAmt = self.data.TotalAmt + data.currentTarget.dataset.num
    self.setData({
      "TotalAmt": TotalAmt
    })
  },

  delete: function () {
    let TotalAmt = self.data.TotalAmt.substring(0, self.data.TotalAmt.length - 1)
    self.setData({
      "TotalAmt": TotalAmt
    })
  },

  done: function () {

    let TotalAmt = self.data.TotalAmt;
    let DataSetName = "TotalAmt";
    let Validator = "required,TotalAmt"
    let InputValue = TotalAmt;
    let CreateAndPay;
    let ResultQuerySign;
    let ResultQuery;
    validateFuc.validate(DataSetName, Validator, InputValue, self)
    if ('' === self.data.form.$invalidMsg) {
      console.log('valid')
      let DeadLine = Common.setResultQueryDeadLine()
      wx.scanCode({
        success: function (res) {
          console.log(res)
          let AuthCode = res.result

          let PayInfo = {
            AuthCode: AuthCode,
            TotalAmt: TotalAmt
          }
          CreateAndPay = new CreateAndPayAPi(PayInfo)
          console.log(CreateAndPay, "CreateAndPay")
          ResultQuery = new ResultQueryApi({
            QueryNo: CreateAndPay.AgwBody.ext_order_no,
            QueryType: "ext_order_no"
          })

          CreateAndPay.reqCreateAndPay()
            .then((CreateAndPayBody) => {
              console.log(CreateAndPayBody, "CreateAndPayDataBody")
              let ResultCode = CreateAndPayBody.result_code;
              let OrderStatus = CreateAndPayBody.order_status;
              if (OrderStatus == "S") {
                console.log("语音播报123312")
                console.log(CreateAndPayBody)

                let PayAmT = CreateAndPayBody.total_amt / 100
                let MenuUrl = '../menu/menu'
                CreateAudio(PayAmT, self, MenuUrl)

              }
              else {
                console.log('else')
                let MenuUrl = '../menu/menu'
                ResultQuery.queryOrderResult(self, MenuUrl)
              }


            })
            .catch((err) => {
              console.log("errrrrrrrrrr111")
              console.log(err)
            })



        },
        fail: function (err) {
          console.log("errrrrrrrrrr")
          console.log(err)
        }
      })
    } else {

      console.log(self.data.form.$invalidMsg)
      console.log('invalid')
    }

  },



  endVoice: function () {
    console.log("endvoice")
    return wx.redirectTo({
      url: '../menu/menu',
    })
  }

})

