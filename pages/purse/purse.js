//配置
const Config = require('../../config.js');
const Common = require('../../base/common.js');

//获取商户订单交易列表
const GetPruseSumApi = require('../../ddpay/purse_Sum.js');

const GetPruseListApi = require('../../ddpay/purse_list.js');

let self;

Page({


  /**
   * 页面的初始数据
   */
  data: {
    "cashable_balance":0,
    "stop_balance":0,
    "PageNum":1,
    "Feed": '../../resource/image/feed.png',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    self = this;  
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let PageNum = self.data.PageNum;
    let cashable_balance;
    let stop_balance;
    if (OperatorInfo) {
      // 获取流水钱包余额
      let op = {
        PageNum,
      }
      let GetPruseSum = new GetPruseSumApi();
      GetPruseSum.reqPurseSum().then((data) => { 
        cashable_balance = Common.number_format(parseInt(data.cashable_balance),2, ".", ",");
        stop_balance = Common.number_format(parseInt(data.stop_balance), 2, ".", ",");
        self.setData({
            cashable_balance:cashable_balance,
            stop_balance:stop_balance
        }); 
      })
        .catch((err) => {
          console.log(err);
          console.log('pruse_err');
      });

      //获取钱包流水
      let GetPruseList = new GetPruseListApi(op);
      GetPruseList.reqPurseList(self).then(()=>{
        wx.hideLoading();
      });

    }else {
      console.log("没有缓存信息");
      wx.clearStorageSync();
      return wx.redirectTo({
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    self = this;  
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    let PageNum = self.data.PageNum;
    let GetPruseListRB;

    if (OperatorInfo) {
      let op = {
        PageNum: PageNum
      }
      let GetPruseList = new GetPruseListApi(op);
      GetPruseList.reqPurseList(self).then(()=>{
        wx.hideLoading();
      });

    }else {
      wx.clearStorageSync();
      return wx.redirectTo({
        url: '../login/login',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  pruseDetail:function(res){
    let purseDetailData = res.currentTarget.dataset;
    console.log(purseDetailData);
    wx.setStorageSync("purseDetailData", purseDetailData);
    wx.navigateTo({
      url: './purse_detail/purse_detail',
    })
  }


});

