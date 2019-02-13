//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');
const validateFuc = require('../../resource/js/validate.js');
//获取验证码
const getAuth = require('../../ddpay/refundGetAuth.js');
//验证验证码
const checkAuth = require('../../ddpay/refundCheckAuth.js');
const refundApi = require('../../ddpay/refundSubmit.js');
const checkAmt = require('../../ddpay/refundCheckAmt.js');
let self;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RefundAmt:"",
    MerCode: "",
    AuthKey: "",
    refund_reason: "",
    btnText: "确定退款",
    countdown: 60,
    is_hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let main_order_no = options.main_order_no;
    let Amt = options.Amt;
    self.setData({
      main_order_no: main_order_no,
      RefundAmt: Amt,
      Amt: Amt,
      MerCode: OperatorInfo.mercode
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

  },
  validate: function (e) {
    self.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },

  getAuthKey: function () {
    
    if ('' !== self.data.MerCode && '' !== self.data.RefundAmt) {
      let refundamtnum = Math.round(self.data.RefundAmt*100);//输入的退款金额
      let amtnum = Math.round(self.data.Amt*100);//未退款金额
      
      if ('0.01'>parseFloat(self.data.RefundAmt)){
        wx.showToast({
          title: '金额格式有误',
          icon: 'loading',
          image: '/resource/image/warn.png',
          duration: 2000,
          mask: false
        })
        return
      }
      if(refundamtnum > amtnum) {
        wx.showModal({
          title: '提示',
          content: '退款金额不能超出未退款金额，请重新填写',
          showCancel: false
        })
        return
      }
      let callData = {
        main_order_no: self.data.main_order_no,
        mercode: self.data.MerCode,
        refund_amt: refundamtnum
      }
      
      let amtCheck = new checkAmt(callData).reqrefundCheckAmt(this).then((res)=>{
        let result_code = res.result_code;
        if(result_code == '0000000' || result_code == '00000'){  
          let params={
            refundAmt: self.data.RefundAmt
          }
          let Info = {
            mercode:self.data.MerCode,
            params: params
          }
          wx.setStorageSync("countdown", Common.setResultQueryDeadLine(1));
          Common.setCountDown(self);
          let Auth = new getAuth(Info);
          Auth.reqrefundGetAuth(this).then((res) => {
            let result_code = res.result_code;
            if(result_code == '0000000' || result_code == '00000'){
              self.setData({
                "random": self.data.resCb.AgwBody.random,
                "mobile": res.mobile,
                "checkAmt": self.data.resCb.AgwBody.params.refundAmt
              })
            }else{
              wx.showToast({
                title: res.result_msg,
                icon: 'loading',
                image: '/resource/image/warn.png',
                duration: 2000,
                mask: false
              })
              self.setData({
                is_hidden: false
              })
              wx.removeStorageSync("countdown");
            }
          })
          .catch((err) => {
            wx.showToast({
              title: err.data.AgwBody.result_msg,
              image: '/resource/image/warn.png',
              duration: 2000,
              mask: false
            })
            self.setData({
              is_hidden: false
            })
            wx.removeStorageSync("countdown");
            return err
          })
        } 
      }).catch((err)=>{
        wx.showModal({
          title: '提示',
          content: err.data.AgwBody.result_msg,
          showCancel: false
        })
      }) 
      
    } else {
      wx.showToast({
          title: '必填项不能为空',
          icon: 'loading',
          image: '/resource/image/warn.png',
          duration: 2000,
          mask: false
        })
    }
  },
  formSubmit: function (e) {
    if ('' !== self.data.MerCode && '' !== self.data.RefundAmt) {
      if(e.detail.value.AuthKey == ''){
        wx.showModal({
          title: '提示',
          content: "请输入短信验证码",
          showCancel: false
        })
        return;
      }
      if(self.data.RefundAmt !== self.data.checkAmt) {
        wx.showModal({
          title: '提示',
          content: '退款金额与发送短信申请退款金额不一致，请重新获取验证码',
          success: function (res) {
            self.setData({
              is_hidden: false
            })
            wx.removeStorageSync("countdown");
          }
        })
        return;
      }
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      let OperatorInfo = {
        mercode:self.data.MerCode,
        mobile: self.data.mobile,
        random: self.data.random,
        otp: e.detail.value.AuthKey,
        operation_type: 'order_refund'
      }
      
      let auCheck = new checkAuth(OperatorInfo).reqrefundCheckAuth(this).then((res)=>{
        let result_code = res.result_code
        if(result_code == '0000000' || result_code == '00000'){
          let auth_token = res.auth_token
          let timestamp=new Date().getTime()
          let ext_refund_no = Math.floor(Math.random()*timestamp)
          let refundInfo = {
            main_order_no:self.data.main_order_no,
            ext_refund_no: ext_refund_no,
            mercode: self.data.MerCode,
            auth_token: auth_token,
            refund_amt: self.data.RefundAmt,
            refund_reason:self.data.refund_reason
          }
          let refundAl = new refundApi(refundInfo).reqrefundSubmit(this).then((res)=>{
            wx.hideLoading()
            let result_code = res.result_code;
            if(result_code == '0000000' || result_code == '00000'){
              let refund_status = res.refund_status;
              let status_text;
              if(refund_status == 'S'){
                status_text = '退款成功';
              }else if(refund_status == 'F'){
                status_text = '退款失败';
              }else if(refund_status == 'P'){
                status_text = '退款申请已受理，到账时间以银行处理为准';
              }
              wx.showModal({
                title: '提示',
                content: status_text,
                success: function (res) {
                  if (res.confirm) {
                    return wx.navigateBack({
                      delta: 1
                    })
                  } else {
                    return wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            }
          }).catch((err)=>{
            wx.hideLoading();
            wx.showToast({
              title: err.data.AgwBody.result_msg,
              icon: 'loading',
              image: '/resource/image/warn.png',
              duration: 2000,
              mask: false
            })
            self.setData({
              is_hidden: false
            })
            wx.removeStorageSync("countdown");
          })
        }
      }).catch((err)=>{
        wx.hideLoading();
        wx.showToast({
          title: err.data.AgwBody.result_msg,
          icon: 'loading',
          image: '/resource/image/warn.png',
          duration: 2000,
          mask: false
        })
        
        self.setData({
          is_hidden: false
        })
        wx.removeStorageSync("countdown");
      })
    } else {
      wx.showToast({
        title: '必填项不能为空',
        icon: 'loading',
        image: '/resource/image/warn.png',
        duration: 2000,
        mask: false
      })
    }

  },
  
  TotalAmtInput:function(e){
    let Amt = e.detail.value
    self.setData({
      RefundAmt:(Amt.match(/\d{1,7}(\.\d{0,2})?/)||[''])[0]
    })
  },
})

