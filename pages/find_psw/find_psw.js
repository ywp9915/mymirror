//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const getAuth = require('../../ddpay/find_psw_getcode.js');
const checkAuth = require('../../ddpay/find_psw_checkcode.js');
const dataApi = require('../../ddpay/to_find_psw.js');


const WxLoginApi = require('../../wx/wx_login.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');

var time = 60;
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    random_num:"",
    mobile:"",
    captcha:"",
    code:"",
    psw:"",
    countDown:false,
    second:"获取验证码",
    hasGetCode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var random="";
    for(var i=0;i<4;i++){
      random+=Math.floor(Math.random()*10)
    }
    this.setData({
      random_num:random
    })
  },
  getCode(){
    this.setData({
      mercode:wx.getStorageSync("OperatorInfo").mercode,
      params:""
    })
    
    if(time<60){
      return false;
    }

    if (this.data.mobile==""||this.data.mobile.length<11){
        wx.showModal({
          title: '提示',
          content: '请先输入完整的手机号',
          showCancel:false
        })
        return false;
      }

      if (this.data.captcha == ""||this.data.captcha.length<4){
        wx.showModal({
          title: '提示',
          content: '请先输入图形验证码',
          showCancel:false
        })
        return false;
      }

      if(this.data.captcha!=this.data.random_num){
        wx.showModal({
          title: '提示',
          content: '输入图形验证码错误',
          showCancel:false
        })
        return false;
      }

    let getAuthApi = new getAuth(this);
    getAuthApi.reqrefundGetAuth(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){

        time--;
        this.setData({
          second:time+"s",
          countDown:true,
          hasGetCode:true
        })

        timer = setInterval(() =>{
          if(time==0){
            this.setData({
              second:"重新获取",
              countDown:false
            })
            clearInterval(timer);
            time = 60;
            return false;
          }
          time--;
          this.setData({
            second:time+"s"
          })
        },1000)
      }else{
        wx.showModal({
          title: '提示',
          content: res.result_msg,
          showCancel:false
        })
      }
    })
    .catch((res) => {
      wx.showModal({
        title: '提示',
        content: res.data.AgwBody.result_msg,
        showCancel:false
      })
    });
  },
  refreshImg(){
    var random="";
    for(var i=0;i<4;i++){
      random+=Math.floor(Math.random()*10)
    }
    this.setData({
      random_num:random
    })
  },
  confirm(){
    if(!this.data.hasGetCode){
      wx.showModal({
        title: '提示',
        content: '请先获取短信验证码',
        showCancel:false
      })
      return false;
    }

    if (this.data.mobile==""||this.data.mobile.length<11){
        wx.showModal({
          title: '提示',
          content: '请先输入完整的手机号',
          showCancel:false
        })
        return false;
      }

      if (this.data.code == ""||this.data.code.length<4){
        wx.showModal({
          title: '提示',
          content: '请先输入短信验证码',
          showCancel:false
        })
        return false;
      }

      if (this.data.psw == ""||this.data.psw.length<6){
        wx.showModal({
          title: '提示',
          content: '请先输入不小于6位的新密码',
          showCancel:false
        })
        return false;
      }

    let checkAuthApi = new checkAuth(this);
    checkAuthApi.reqrefundCheckAuth(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
          this.setData({
            auth_token:res.auth_token
          })
          let loadApi = new dataApi(this);
          loadApi.changePsw(this).then((res) => {
            if(res.result_code=="0000000"||res.result_code=="00000"){
              wx.showModal({
                title: '提示',
                content: '找回密码成功',
                showCancel:false,
                success:function(){
                  wx.reLaunch({
                    url: '../login/login',
                  })
                }
              })
              
            }else{
              wx.showModal({
                title: '提示',
                content: res.result_msg,
                showCancel:false
              })
            }
          })
          .catch((res) => {
            wx.showModal({
              title: '提示',
              content: res.data.AgwBody.result_msg,
              showCancel:false
            })
          });
      }else{
        wx.showModal({
          title: '提示',
          content: res.result_msg,
          showCancel:false
        })
      }
    })
    .catch((res) => {
      wx.showModal({
        title: '提示',
        content: res.data.AgwBody.result_msg,
        showCancel:false
      })
    });
  },
  getInput(e){
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
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