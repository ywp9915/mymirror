//获取商户订单交易列表
const OrderListApi = require('../../ddpay/order_list.js');
//退款列表数据
const refundListApi = require('../../ddpay/refund_list.js');
//今日交易统计
const orderCountTodayApi = require('../../ddpay/order_count_today.js');
//交易统计
const orderCountTotalApi = require('../../ddpay/order_count_total.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_class: '',
    operator_name: '',
    startTime: '',
    endTime: '',
    order_start_date: '',
    order_start_time: '',
    order_end_date: '',
    order_end_time: '',
    order_amt_count: '',
    refund_amt_count: '',
    amount: '',
    rep_date: '',
    trans_count: 0,
    total: 0,
    PageNum: 1,
    Feed: '../../resource/image/feed.png',
    nextPage: true,
    checkboxItems: [
      {name: '1', value: '含静态码', checked: false}
    ],
    isCode: true,
    isOperator:false,
    clickType: 'jymx',
    tabSelectStatus:true
  },
  checkboxChange: function(e) {
    let isCode;
    if(e.detail.value[0] == 1){
      isCode = true;
    }else{
      isCode = false;
    }
    this.setData({
      isCode: isCode,
      PageNum: 1,
      nextPage: true,
      OrderList: []
    })
    let op = {
      PageNum: this.data.PageNum,
      operator_name: this.data.operator_name,
      pay_class: this.data.pay_class,
      order_start_date: this.data.order_start_date,
      order_start_time: this.data.order_start_time,
      order_end_date: this.data.order_end_date,
      order_end_time: this.data.order_end_time,
      isCode: this.data.isCode
    }
    if(this.data.filter){
      new orderCountTotalApi(op).orderCountTotal(this);
    }else{
      new orderCountTodayApi(op).orderCountToday(this);
    }
    new OrderListApi(op).reqOrderList(this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    if (OperatorInfo) {
      if(OperatorInfo.operator_role == 'OPERATOR'){
        self.setData({
          OrderList: [],
          operator_name: 0,
          nextPage: true,
          checkboxShow: true,
          isOperator:true,
          isCode: false,
          tabSelectStatus:false
        })
      }
      let op = {
        PageNum: self.data.PageNum,
        operator_name: this.data.operator_name,
        pay_class: this.data.pay_class,
        order_start_date: this.data.order_start_date,
        order_start_time: this.data.order_start_time,
        order_end_date: this.data.order_end_date,
        order_end_time: this.data.order_end_time,
        isCode: self.data.isCode
      }
      new orderCountTodayApi(op).orderCountToday(self);
      new OrderListApi(op).reqOrderList(self).then((res)=>{
        //console.log(this.data.OrderList);
      })
      
    }
     else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
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
    let pages = getCurrentPages();
    let currPage = pages[pages.length-1];
    //console.log(currPage)
    if(this.data.filter){
      this.setData({
        rep_date: this.data.startTime+'至'+this.data.endTime,
        nextPage: true,
        OrderList: []
      })
      let sendData = {
        pay_class: this.data.pay_class,
        operator_name: this.data.operator_name,
        order_start_date: this.data.order_start_date,
        order_start_time: this.data.order_start_time,
        order_end_date: this.data.order_end_date,
        order_end_time: this.data.order_end_time,
        PageNum: this.data.PageNum,
        isCode: this.data.isCode
      }
      new orderCountTotalApi(sendData).orderCountTotal(this);
      if(this.data.clickType == 'jymx'){
        new OrderListApi(sendData).reqOrderList(this);
      }else{
        new refundListApi(sendData).reqRefundList(this);
      }
      
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
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let PageNum = this.data.PageNum;
    if (OperatorInfo) {
      let op = {
        PageNum: this.data.PageNum,
        operator_name: this.data.operator_name,
        pay_class: this.data.pay_class,
        order_start_date: this.data.order_start_date,
        order_start_time: this.data.order_start_time,
        order_end_date: this.data.order_end_date,
        order_end_time: this.data.order_end_time,
        isCode: this.data.isCode
      }
      if(this.data.nextPage){
        if(this.data.clickType == 'jymx'){
          new OrderListApi(op).reqOrderList(this).then((res)=>{
            //console.log(this.data.OrderList);
          })
        }else{
          new refundListApi(op).reqRefundList(this).then((res)=>{
            //console.log(this.data.OrderList);
          })
        }
      }
    }
    else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  orderDetail: function (res) {
    let OrderId = res.currentTarget.dataset.orderid;
    let OrderDetail = this.data.OrderList[OrderId];
    wx.setStorageSync("OrderDetail", OrderDetail);
    this.setData({
      filter: false
    })
    wx.navigateTo({
      url: `../receipts/receipt_detail/receipt_detail?OrderId=${OrderId}`,
    })
  },
  refundDetail:function(res){
    let refundDetailData = res.currentTarget.dataset;
    wx.setStorageSync("refundDetailData", refundDetailData);
    this.setData({
      filter: false
    })
    return wx.navigateTo({
      url: '../refund/refund_detail/refund_detail',
    })
  },
  clickJymx: function(e){
    if(this.data.clickType == e.currentTarget.dataset.type) return;
    this.setData({
      clickType: e.currentTarget.dataset.type,
      OrderList: [],
      nextPage: true,
      PageNum: 1
    })
    let sendData = {
      pay_class: this.data.pay_class,
      operator_name: this.data.operator_name,
      order_start_date: this.data.order_start_date,
      order_start_time: this.data.order_start_time,
      order_end_date: this.data.order_end_date,
      order_end_time: this.data.order_end_time,
      PageNum: this.data.PageNum,
      isCode: this.data.isCode
    }
    new OrderListApi(sendData).reqOrderList(this);
  },
  clickTklb: function(e){
    if(this.data.clickType == e.currentTarget.dataset.type) return;
    this.setData({
      clickType: e.currentTarget.dataset.type,
      OrderList: [],
      nextPage: true,
      PageNum: 1
    })
    let sendData = {
      pay_class: this.data.pay_class,
      operator_name: this.data.operator_name,
      order_start_date: this.data.order_start_date,
      order_start_time: this.data.order_start_time,
      order_end_date: this.data.order_end_date,
      order_end_time: this.data.order_end_time,
      PageNum: this.data.PageNum,
      isCode: this.data.isCode
    }
    new refundListApi(sendData).reqRefundList(this);
  }
})