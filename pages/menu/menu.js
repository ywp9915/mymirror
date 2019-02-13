const Config = require('../../config.js');
const OrderListApi = require('../../ddpay/order_list.js');
const LoginOutApi = require('../../ddpay/operator_logout.js');

const TodayListApi = require('../../ddpay/getToday_info.js');

//验证Session
const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');

const audio = require('../../wx/wx_createaudio');
//商户列表
const merList = require('../../ddpay/mer_list.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receipts: '../../resource/image/be_qrcode.png',
    form: '../../resource/image/to_qrcode.png',
    be_qrcode: '../../resource/image/be_qrcode.png',
    to_qrcode: '../../resource/image/to_qrcode.png',
    request: '../../resource/image/request.png',
    wallet: '../../resource/image/wallet.png',
    friend: '../../resource/image/friend.png',
    setting: '../../resource/image/setting.png',
    name:'',
    count:'0',
    money_amount:'0',
    check: false, 
    funList: [
      {
        name: '交易明细',
        img_url: '../../resource/image/gathing.png',
        navigateurl: '../orderList/orderList',
        operation: '',
        storeShow: false
      },
      {
        name: '入账流水',
        img_url: '../../resource/image/wallet.png',
        navigateurl: './../account/account',
        operation: 'account',
        storeShow: true
      },
      {
        name: '店员管理',
        img_url: '../../resource/image/store_manage.png',
        navigateurl: './../clerk_manage/clerk_manage',
        operation: 'clerkManage',
        storeShow: true
      },
      {
        name: '信用支付统计',
        img_url: '../../resource/image/request.png',
        navigateurl: './../payCount/payCount',
        operation: 'payCount',
        storeShow: false
      },
      {
        name: '修改密码',
        img_url: '../../resource/image/change_psw.png',
        navigateurl: './../replace_psw/replace_psw',
        operation: 'replacePsw',
        storeShow: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    if(OperatorInfo){
      this.reload();
      new merList(this).merListFun(this).then(()=>{
        let operator_role = OperatorInfo.operator_role;
        if(this.data.merList.length>1 && operator_role == 'MANAGER'){
          this.setData({
            changeStore: true,
            changeStoreUrl: './../change_store/change_store'
          })
        }
      })
    }else{
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
    let operatorInfo = wx.getStorageSync("OperatorInfo");
    this.setData({
      operatorInfo: operatorInfo
    })
    if (operatorInfo.operator_role == "OPERATOR") {
      this.setData({
        name:"本收银员",
        operator_role: "收银员",
        store:"0"
      });
    }else if (operatorInfo.operator_role == "DIANZHANG") {
      this.setData({
        name:"本商户",
        operator_role: "店长",
        store:"1"
      });
    }else{
      this.setData({
        name:"本商户",
        operator_role: "老板",
        store:"1"
      });
    }
    
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

  getOrderList: function () {
    wx.navigateTo({
      //url: '../receipts/receipts',
      url: '../orderList/orderList'
    });

  },

  preCreate: function () {
    wx.navigateTo({
      url: './../precreate/precreate'
    })
  },
  create:function(){
    wx.navigateTo({
      url: './../create/create'
    })
  },
  present:function(){
  },
  purse:function(){
  },

  loginout: function () {
    let LoginOut = new LoginOutApi();
    wx.showModal({
      title: '提示',
      content: '是否退出？',
      success: function (res) {
        if (res.confirm) {
          LoginOut.logOut();
        } else {
          
        }
      }
    })
  },

  reload: function(){
    if(this.data.check) return
    let GetTodayList = new TodayListApi();
    GetTodayList.reqTodayInfo().then((todayList) => {
      let that = this;
      that.setData({
        check: true
      })
      setTimeout(function(){
        that.setData({
          check: false
        })
      },3000);
      if(todayList.count == 0){
        that.setData({
          count: 0,
          money_amount: this.formatPrice(0),

        });

      }else{
        that.setData({
          count: todayList.data_list[0].trans_count,
          money_amount: this.formatPrice((todayList.data_list[0].order_amt_count/100)-(todayList.data_list[0].refund_amt_count/100)),

        });
      }

    });
  },
  formatPrice: function(price){
    return price.toFixed(2);
  }

})

