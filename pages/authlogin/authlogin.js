//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const validateFuc = require('../../resource/js/validate.js');
//获取验证码
const LoginReqOtpApi = require('../../ddpay/operator_login_reqotp.js');
//获取SessionKey
const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');
//获取验证码登陆
const LoginAuthOtpApi = require('../../ddpay/operator_login_authotp.js');

const WxLoginApi = require('../../wx/wx_login.js');
let self;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Logo: '../../resource/image/logoNew.jpg',
    MerCode: "",
    Mobile: "",
    AuthKey: "",
    loginText: "登录",
    InputGroup: [
      {
        Name: "MerCode",
        Placeholder: "输入商户编号",
        ImgSrc: '../../resource/image/seller_no_icon@2x.png',
        DefaultValue: "",
        InputType: "number"
      },
      {
        Name: "Mobile",
        Placeholder: "商户预留手机号",
        ImgSrc: '../../resource/image/phone_icon@2x.png',
        DefaultValue: "",
        InputType: "number"
      },
    ],
    AuthKeyInp: {
      Name: "AuthKey",
      Placeholder: "输入验证码",
      ImgSrc: '../../resource/image/authkey_icon@2x.png',
      DefaultValue: "",
      InputType: "number"
    },

    /*验证码登陆URL*/
    AuthUrl: '../login/login',
    AuthkeyMes: "获取验证码",
    // is_hidden: true,

    is_hidden: false,
    countdown: 60,

    form: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    // let StopTime = wx.getStorageSync("countdown");
    let IsHidden = wx.getStorageSync("IsHidden");
    if (IsHidden) {
      let StopTime = wx.getStorageSync("countdown");
      // self.data.is_hidden = IsHidden
      let Now = new Date().getTime();
      if (Now < StopTime) {
        Common.setCountDown(self);
      }

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  getAuthKey: function () {
    let MerCode;
    let Mobile;
    
    validateFuc.validateRequired(['MerCode'], self)
    validateFuc.validateRequired(['Mobile'], self)

    let LoginForm = self.data.form
    if ('' === self.data.form.MerCode && '' === self.data.form.Mobile) {
      // wx.setStorageSync("IsHidden", true);
      wx.setStorageSync("countdown", Common.setResultQueryDeadLine(1));
      MerCode = self.data.MerCode.trim();
      Mobile = self.data.Mobile.trim();
      let OperatorInfo = {
        MerCode: MerCode,
        Mobile: Mobile
      }
      let LoginReqOtp = new LoginReqOtpApi(OperatorInfo);
      LoginReqOtp.reqLoginReqOtp(this).then((err)=>{
        wx.showToast({
          title: err.data.AgwBody.result_msg,
          icon: 'loading',
          image: '/resource/image/warn.png',
          duration: 2000,
          mask: false
        })
      });
    } else {
      
      wx.showToast({
          title: self.data.form.$invalidMsg,
          icon: 'loading',
          image: '/resource/image/warn.png',
          duration: 2000,
          mask: false
        })
    }
  },


  formSubmit: function (e) {

    let MerCode;
    let Mobile;
    let AuthKey;

    validateFuc.validateRequired(['MerCode'], self)
    validateFuc.validateRequired(['Mobile'], self)
    validateFuc.validateRequired(['AuthKey'], self)

    if ('' === self.data.form.$invalidMsg) {
      let WxLogin;
      WxLogin = new WxLoginApi();
      WxLogin.reqWxLogin()
        .then((WxCode) => {
         
          self.setData({
            loginText: '登录中，请稍后...'
          })
          
          MerCode = self.data.MerCode.trim()
          Mobile = self.data.Mobile.trim()
          AuthKey = self.data.AuthKey.trim()
          let OperatorInfo = {
            MerCode: MerCode,
            Mobile: Mobile,
            WxCode: WxCode,
            AuthKey: AuthKey,
            wxmsId: "wxms_appid_grcb_cs",
            loginText: '登录中，请稍后...'
          }
          let LoginAuthOtp = new LoginAuthOtpApi(OperatorInfo);
          LoginAuthOtp.reqLoginAuthOtp(this)
            .then((err)=>{
              wx.showModal({
                title: '提示',
                content: err.data.AgwBody.result_msg,
                showCancel: false
              })
            })
        })
        .catch((err) => {
          
        })
    } else {
      
      let valid = self.data.form.$invalidMsg
      
      wx.showModal({
        title: '提示',
        content: valid,
        showCancel: false
      })
    }

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
    // validateFuc.validate(e, self)

  },

  switchLogin: function () {
    wx.redirectTo({
      url: this.data.AuthUrl,
    })
  }


})

