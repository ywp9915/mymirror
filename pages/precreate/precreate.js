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
    Amt:'',
  
    check: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    if (OperatorInfo) {

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
    self.setData({
      check: true
    })
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
    self.setData({
      check: true
    })
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
  TotalAmtInput:function(e){
    let Amt = e.detail.value
    self.setData({
      Amt:(Amt.match(/\d{1,7}(\.\d{0,2})?/)||[''])[0]
    })
  },
  formSubmit: function (e) {
    if(!self.data.check) return;
    let data = e.detail.value;
    let TotalAmt = data.TotalAmt;
    let ReMark = data.ReMark;
    
    Common.checkAmount(TotalAmt).then((data) =>{
      if(data.judge){
        let Info = {
          TotalAmt: Math.round(TotalAmt * 100),
          ReMark: ReMark
        }
        let PreCreate = new PreCreateApi(Info);

        PreCreate.reqPreCreate()
          .then((QrData) => {
            self.setData({
              check: false
            })
            delete QrData.result_code
            delete QrData.result_msg
            QrData.TotalAmt = TotalAmt
            QrData.ReMark = ReMark
            wx.setStorageSync("QrData", QrData)

            return wx.redirectTo({
              url: `./precreate_detail/precreate_detail`,
            })
          })

          .catch((err) => {
            wx.showToast({
              title: '金额格式不正确',
              icon: 'loading',
              image: '/resource/image/warn.png',  
              duration: 2000,
              mask: false
            })
            self.setData({
              check: true
            })
          })
      }else{
        wx.showModal({
          title: '提示',
          content: data.message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
                //console.log('用户点击确定')
            }
          }
          
        })
      }
    })
    


  },
  validate: function (e) {
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
