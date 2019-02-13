//配置
const Config = require('../../config.js');
const validateFuc = require('../../resource/js/validate.js');
// const validateRequired=
//验证Session
const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');
//密码登陆
const LoginApi = require('../../ddpay/operator_login.js');

const WxLoginApi = require('../../wx/wx_login.js');


let self = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*icon图标*/
    Logo: '../../resource/image/logoNew.jpg',
    MerCode: "",
    UserName: "",
    PassWord: "",
    loginText: "登录",
    InputGroup: [
      {
        Name: "MerCode",
        Placeholder: "输入商户编号",
        ImgSrc: '../../resource/image/seller_no_icon@2x.png',
        DefaultValue: "",
        InputType: "number",
        IsPwd: false
      },
      {
        Name: "UserName",
        Placeholder: "用户登录名",
        ImgSrc: '../../resource/image/username_icon@2x.png',
        DefaultValue: "",
        InputType: "text",
        IsPwd: false
      },
      {
        Name: "PassWord",
        Placeholder: "登录密码",
        ImgSrc: '../../resource/image/pwd_icon@2x.png',
        DefaultValue: "",
        InputType: "text",
        IsPwd: true
      }
    ],

    /*验证码登陆URL*/
    AuthUrl: '../authlogin/authlogin',

    form: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    self = this
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    if (OperatorInfo) {
      return wx.redirectTo({
        url: '../menu/menu',
      })
    }
    else {

      let WxLogin;
      WxLogin = new WxLoginApi();
      WxLogin.reqWxLogin()
        .then((WxCode) => {
          let CheckLogin = new CheckLoginApi({ "WxCode": WxCode })
          CheckLogin.reqCheckLogin()
            .then((CheckLoginResBody) => {
              console.log(CheckLoginResBody)
              let ResultCode = CheckLoginResBody.result_code;
              if (ResultCode == '0000000' || ResultCode == '00000') {
                wx.setStorageSync("OperatorInfo", CheckLoginDataBody)
                return wx.redirectTo({
                  url: '../menu/menu',
                })
              }
              else if (ResultCode == 'auth.wxms_not_login') {
              }
            })
            .catch((err) => {
              // wx.clearStorage();
            })
        })
        .catch((err) => {
          // wx.clearStorage();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
    validateFuc.validateRequired(['MerCode'], self)
    validateFuc.validateRequired(['UserName'], self)
    validateFuc.validateRequired(['PassWord'], self)
    let LoginForm = self.data.form
    if (!self.data.form.$invalidMsg) {
      let MerCode = self.data.MerCode.trim();
      let Operator = self.data.UserName.trim();
      let PassWord = self.data.PassWord.trim();
      let WxLogin;
      let ResultCode;
      let OperatorInfo;
      let SessionKey;
      WxLogin = new WxLoginApi();
      WxLogin.reqWxLogin()
        .then((WxCode) => {
          self.setData({
            loginText: '登录中，请稍后...'
          })
          OperatorInfo =
            {
              MerCode: MerCode,
              Operator: Operator,
              PassWord: PassWord,
              WxCode: WxCode,
              wxmsId: "wxms_appid_grcb_cs",
              loginText: '登录中，请稍后...'
            }
          let Login = new LoginApi(OperatorInfo);
          Login.reqLogin(this)
        })
        .catch((err) => {
          // wx.clearStorage();
        })
    } else {
      let valid = self.data.form.$invalidMsg
      wx.showToast({
        title: valid,
        icon: 'loading',
        image: '/resource/image/warn.png',  
        duration: 2000,
        mask: false
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
  },

  switchLogin: function () {
    wx.redirectTo({
      url: this.data.AuthUrl,
    })
  }
})