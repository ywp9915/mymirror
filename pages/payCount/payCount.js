//配置
const Config = require('../../config.js');

const Common = require('../../base/common.js');
//获取信用支付统计
const countListApi = require('../../ddpay/pay_count_list.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'page': 1,
    "Feed": '../../resource/image/feed.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let self = this;
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    if (OperatorInfo) {
      let BQDate, EQDate, toDay, sDay;
      let bDate = new Date();
      let eDate = new Date();
      let tDate = new Date();
      let sDate = new Date();
      bDate.setDate(bDate.getDate() - 7);
      eDate.setDate(eDate.getDate() - 1);
      tDate.setDate(tDate.getDate());
      sDate.setDate(sDate.getDate() - 90);
      let bMonth = bDate.getMonth()+1;
      let eMonth = eDate.getMonth()+1;
      let tMonth = tDate.getMonth()+1;
      let sMonth = sDate.getMonth()+1;
      BQDate = bDate.getFullYear()+'-'+self.formatDate(bMonth)+'-'+self.formatDate(bDate.getDate());
      EQDate = eDate.getFullYear()+'-'+self.formatDate(eMonth)+'-'+self.formatDate(eDate.getDate());
      toDay = tDate.getFullYear()+'-'+self.formatDate(tMonth)+'-'+self.formatDate(tDate.getDate());
      sDay = sDate.getFullYear()+'-'+self.formatDate(sMonth)+'-'+self.formatDate(sDate.getDate());
      self.setData({
        'bDate': BQDate,
        'eDate': EQDate,
        'today': toDay,
        'sDay': sDay
      });
      
      let op = {
        'page': self.data.page,
        'bDate': self.data.bDate,
        'eDate': self.data.eDate
      }
      let getList = new countListApi(op);
      getList.payCountList(self).then(()=>{
        wx.hideLoading();
        
      });

    }else {
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
    let self = this;
    let OperatorInfo = wx.getStorageSync('OperatorInfo');
    if (OperatorInfo) {
      
      let op = {
        'page': self.data.page,
        'bDate': self.data.bDate,
        'eDate': self.data.eDate
      }
      if(self.data.page > 0){
        let getList = new countListApi(op);
        getList.payCountList(self).then(()=>{

        });
      }
      

    }else {
      wx.clearStorageSync();
      return wx.reLaunch({
        url: '../login/login',
      });
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  formatDate: function (d){ 
    return d>9 ? d : '0'+d; 
  },
  bDateChange: function(e) {
    let DS = new Date(e.detail.value);
    let DE = new Date(this.data.eDate);
    let DT = new Date(this.data.today);
    if(DS > DE){
      wx.showModal({
        title: '提示',
        content: '开始日期不能大于结束日期，请重新选择查询日期',
        showCancel: false
      })
      return;
    }
		if((DT-DS) > 90*24*60*60*1000){
      wx.showModal({
        title: '提示',
        content: '只能查询90天内的数据，请重新选择',
        showCancel: false
      })
			return;
    }
    this.setData({
      bDate: e.detail.value,
      payCount_list: ''
    })
    let op = {
      'page': 1,
      'bDate': this.data.bDate,
      'eDate': this.data.eDate
    }
    let getList = new countListApi(op);
    getList.payCountList(this).then(()=>{
      
    });
  },
  eDateChange: function(e) {
    let DS = new Date(this.data.bDate);
    let DE = new Date(e.detail.value);
    let DT = new Date(this.data.today);
    if(DS > DE){
      wx.showModal({
        title: '提示',
        content: '开始日期不能大于结束日期，请重新选择查询日期',
        showCancel: false
      })
      return;
    }
		if((DT-DS) > 90*24*60*60*1000){
      wx.showModal({
        title: '提示',
        content: '只能查询90天内的数据，请重新选择',
        showCancel: false
      })
			return;
		}
    this.setData({
      eDate: e.detail.value,
      payCount_list: ''
    })
    let op = {
      'page': 1,
      'bDate': this.data.bDate,
      'eDate': this.data.eDate
    }
    let getList = new countListApi(op);
    getList.payCountList(this).then(()=>{
      
    });
  }
})