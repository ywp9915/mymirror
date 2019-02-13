//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/replace_old_psw.js');

const WxLoginApi = require('../../wx/wx_login.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    old_psw:"",
    new_psw:"",
    confirm_psw:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  confirm(){
    if (this.data.old_psw == "") {
      wx.showModal({
        title: '提示',
        content: '请先输入旧密码',
        showCancel: false
      })
      return false;
    }

    if (this.data.new_psw == "" || this.data.new_psw.length<6){
        wx.showModal({
          title: '提示',
          content: '请先输入不小于6位的新密码',
          showCancel:false
        })
        return false;
      }

    if(this.data.old_psw==this.data.new_psw||this.data.old_psw==this.data.confirm_psw){
      wx.showModal({
        title: '提示',
        content: '新密码不能与旧密码相同',
        showCancel: false
      })
      return false;
    }

    if (this.data.new_psw != this.data.confirm_psw) {
      wx.showModal({
        title: '提示',
        content: '新密码与确认密码不一致',
        showCancel: false
      })
      return false;
    }
    let loadApi = new dataApi(this);
    loadApi.changePsw(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
        wx.showModal({
          title: '提示',
          content: '修改密码成功',
          showCancel:false,
          success:function(){
            wx.reLaunch({
              url: '../menu/menu'
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