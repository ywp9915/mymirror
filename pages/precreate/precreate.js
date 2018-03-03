// pages/precreate/precreate.js
const PreCreateApi = require('../../ddpay/order_precreate.js')
const validateFuc = require('../../resource/js/validate.js');
const Common = require('../../base/common.js');
const Config = require('../../config.js');
let self;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
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

  },
  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let date = e.detail.value;
    let TotalAmt = date.TotalAmt;
    if (Common.checkAmount(TotalAmt)) {

      let ReMark = date.ReMark;

      let Info = {
        TotalAmt: TotalAmt * 100,
        ReMark: ReMark
      }
      let PreCreate = new PreCreateApi(Info);

      PreCreate.reqPreCreate()
        .then((QrData) => {

          delete QrData.result_code
          delete QrData.result_msg
          QrData.TotalAmt = TotalAmt
          QrData.ReMark = ReMark

          wx.setStorageSync("QrData", QrData)

          wx.navigateTo({
            url: `./precreate_detail/precreate_detail`,
          })
        })

        .catch((err) => {
          console.log(err)
          wx.clearStorageSync();
          wx.redirectTo({
            url: '../login/login',
          })
        })
    }

  },
  validate: function (e) {
    console.log(e.currentTarget.dataset)
    console.log(e)
    self.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
 
    let InputDataSet = e.currentTarget.dataset
    let DataSetName = InputDataSet.name;
    let Validator = InputDataSet.validator;
    let InputValue = e.detail.value
    validateFuc.validate(DataSetName, Validator, InputValue, self)
  },
})
