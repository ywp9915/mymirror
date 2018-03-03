const Config = require('../../config.js');
const OrderListApi = require('../../ddpay/order_list.js');
const LoginOutApi = require('../../ddpay/operator_logout.js');

const TodayListApi = require('../../ddpay/getToday_info.js');

//验证Session
const CheckLoginApi = require('../../ddpay/wxms_checklogin.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    receipts: '../../resource/image/receipts_icon@2x.png',
    form: '../../resource/image/form_icon@2x.png',
    be_qrcode: '../../resource/image/be_qrcode.png',
    to_qrcode: '../../resource/image/to_qrcode.png',
    request: '../../resource/image/request.png',
    wallet: '../../resource/image/wallet.png',
    friend: '../../resource/image/friend.png',
    setting: '../../resource/image/setting.png',
    name:'',
    count:'0',
    money_amount:'0',

    funList: [
      [
        {
          name: '收款二维码',
          img_url: '../../resource/image/be_qrcode.png',
          navigateurl: './../precreate/precreate',
          operation: 'preCreate',
        },
        {
          name: '扫码收款',
          img_url: '../../resource/image/to_qrcode.png',
          navigateurl: './../create/create',
          operation: 'create'
        },
      ],
      [
        {
          name: '钱包流水',
          img_url: '../../resource/image/wallet.png',
          navigateurl: './../purse/purse',
          operation: 'purse'
        },
        {
          name: '提现申请',
          img_url: '../../resource/image/request.png',
          navigateurl: './../present/present',
          operation: 'present'
        }
      ],
      [
        {
          name: '',
          img_url: '',
          navigateurl: '',
          operation: ''
        },
        {
          name: '',
          img_url: '',
          navigateurl: '',
          operation: ''
        },
      ],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let GetTodayList = new TodayListApi();
    // GetTodayList.reqTodayInfo();
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
      this.reload();
    if (wx.getStorageSync("OperatorInfo").operator_role == "OPERATOR") {
      this.setData({
        name:"本操作员",
      });
    }else{
      this.setData({
        name:"本商户",
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
    //console.log(1223)
    wx.navigateTo({
      url: '../receipts/receipts',
    });

  },

  preCreate: function () {
    //console.log(12212)

  },
  create:function(){

  },
  present:function(){
    console.log("提现");
  },
  purse:function(){
    console.log("钱包流水");
  },

  loginout: function () {
    let LoginOut = new LoginOutApi();
    LoginOut.logOut();
  },

  reload: function(){
    let GetTodayList = new TodayListApi();
    GetTodayList.reqTodayInfo().then((todayList) => {
        
      //console.log(todayList);
      let that = this;
      if(todayList.count == 0){
        that.setData({
          count: 0,
          money_amount: this.formatPrice(0),

        });

      }else{
        that.setData({
          count: todayList.data_list[0].trans_count,
          money_amount: this.formatPrice(todayList.data_list[0].order_amt_count/100),

        });
      }

    });
  },
  formatPrice: function(price){
    return price.toFixed(2);
  }

})

