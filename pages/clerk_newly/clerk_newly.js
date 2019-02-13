//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const Validate = require('../../resource/js/validate.js');

const dataApi = require('../../ddpay/add_operator.js');
const scanApi = require('../../ddpay/scan.js');
const WxLoginApi = require('../../wx/wx_login.js');

const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');
//商户列表
const merList = require('../../ddpay/mer_list.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleItem: [
      {name: 'DIANZHANG', value: '店长'},
      {name: 'OPERATOR', value: '收银员', checked: 'true'}
    ],
    merItem: 0,
    scanCode:''
  },
  bindPickerChange: function(e) {
    let index = e.detail.value;
    let mercode = this.data.merList[index].mercode
    this.setData({
      merItem: index,
      mercode: mercode
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let operator_role = wx.getStorageSync("OperatorInfo").operator_role;
    let mercode = wx.getStorageSync("OperatorInfo").mercode;
    let role = 'OPERATOR';
    /* if(operator_role == 'MANAGER'){
        role = 'DIANZHANG';
    }else if(operator_role == 'DIANZHANG'){
        role = 'OPERATOR';
    } */
    self.setData({
      operator_role: operator_role,
      mercode: mercode,
      role: role
    })
    new merList(self).merListFun(self).then(()=>{
      let dataList = self.data.merList;
      for(let i = 0; i < dataList.length; i++){
        if(mercode==dataList[i].mercode){
          self.setData({
            merItem: i
          })
        }
      }
    })
  },
  getInput(e){
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },
  scan(){
    var self = this;
    wx.scanCode({
      success:function (res) {
        var token = Common.getUrlParam('code',res.result);
        if(!token){
          wx.showModal({
            title: '提示',
            content: '二维码凭证号信息不存在'
          })
          return false;
        }
        let loadApi = new scanApi(token);
        loadApi.scan(this).then((res) => {
          if(res.result_code=="0000000"||res.result_code=="00000"){
            var OperatorInfo = wx.getStorageSync("OperatorInfo");
              if(res.status==0){
                self.setData({
                  scanCode: res.voucher_no
                })
              }else if(res.status==1){
                wx.showModal({
                  title: '提示',
                  content: '该二维码凭证号已激活'
                })
              }else if(res.status==2){
                wx.showModal({
                  title: '提示',
                  content: '该二维码凭证号未激活'
                })
              }else if(res.status==-1){
                wx.showModal({
                  title: '提示',
                  content: '该二维码凭证号已解绑'
                })
              }
          }else{
            wx.showModal({
              title: '提示',
              content: res.result_msg
            })
          }
        }).catch((res) => {
          wx.showModal({
            title: '提示',
            content: res.data.AgwBody.result_msg
          })
        })
      }
    })
  },
  confirm(){
    if(this.data.account==""){
      wx.showModal({
        title: '提示',
        content: '请先输入登录账号',
        showCancel:false
      })
      return false;
    }

    if(this.data.psw&&this.data.psw.length>=6){
      
    }else{
      wx.showModal({
        title: '提示',
        content: '请先输入不小于6位的新密码',
        showCancel:false
      })
      return false;
    }

    let loadApi = new dataApi(this);
    loadApi.add_operator(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
        wx.showModal({
          title: '提示',
          content: '新增成功',
          showCancel:false,
          success:function(){
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.result_msg
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
  radioChange: function(e) {
    this.setData({
      role: e.detail.value
    })
  }
})