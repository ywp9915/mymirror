const operator_list_data = require('../../ddpay/operator_list.js');
const dateTimePicker = require('../../resource/js/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    sDateArr: null,
    sTime: null,
    eDateArr: null,
    eTime: null,
    startYear: 2018,
    startTime:'',
    endTime:'',
    pay_class: '',
    operator_name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    let operator_role = wx.getStorageSync("OperatorInfo").operator_role;//获取当前登录角色
    self.setData({
      pay_class: options.pay_class,
      operator_name: options.operator_name,
      startTime: options.startTime,
      endTime: options.endTime,
      operator_role: operator_role
    })
    if(options.startTime == ''){
      options.startTime = this.getNewDateArry()+' 00:00:00';
    }
    if(options.endTime == ''){
      options.endTime = this.getNewDateArry()+' 23:59:59';
    }
    // 获取完整的年月日 时分秒，以及默认显示的数组
    let sobj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.startYear+1, options.startTime);
    let eobj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.startYear+1, options.endTime);
    
    this.setData({
      sDateArr: sobj.dateTimeArray,
      sTime: sobj.dateTime,
      eDateArr: eobj.dateTimeArray,
      eTime: eobj.dateTime
    });
  },
  //收款方式
  setPayClass: function (e){
    let pay_class = e.target.dataset.class;
    if(this.data.pay_class == pay_class) return;
    this.setData({
      pay_class: pay_class
    })
    
  },
  //收款对象
  cashierobj: function (e){
    let operator = e.target.dataset.operator;
    if(this.data.operator_name == operator) return;
    this.setData({
      operator_name: operator
    })
    
  },
  reset: function (){
    this.setData({
      pay_class: '',
      operator_name: ''
    })
  },
  confirm: function (){
    let sDateArr = this.data.sDateArr;
    let sTime = this.data.sTime;
    let sCurrTime = `${sDateArr[0][sTime[0]]}-${sDateArr[1][sTime[1]]}-${sDateArr[2][sTime[2]]} ${sDateArr[3][sTime[3]]}:${sDateArr[4][sTime[4]]}:${sDateArr[5][sTime[5]]}`;
    let eDateArr = this.data.eDateArr;
    let eTime = this.data.eTime;
    let eCurrTime = `${eDateArr[0][eTime[0]]}-${eDateArr[1][eTime[1]]}-${eDateArr[2][eTime[2]]} ${eDateArr[3][eTime[3]]}:${eDateArr[4][eTime[4]]}:${eDateArr[5][eTime[5]]}`;
    
    if(this.data.startTime == ''){
      this.setData({
        startTime:sCurrTime
      })
    }
    if(this.data.endTime == ''){
      this.setData({
        endTime:eCurrTime
      })
    }
    let DT = new Date();
    let DS = new Date(this.data.startTime);
    let DE = new Date(this.data.endTime);
    if(DS > DE){
      wx.showModal({
        title: '提示',
        content: '开始时间不能大于结束时间，请重新选择',
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
    if((DE-DS) > 7*24*60*60*1000){
      wx.showModal({
        title: '提示',
        content: '查询时间跨度不能超过7天，请重新选择',
        showCancel: false
      })
			return;
    }
    let order_start_date = this.data.startTime.substring(0,10).replace(/-/g,'');
		let order_start_time = this.data.startTime.substring(11).replace(/:/g,''); 
		let order_end_date = this.data.endTime.substring(0,10).replace(/-/g,'');
    let order_end_time = this.data.endTime.substring(11).replace(/:/g,''); 
   
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      pay_class: this.data.pay_class,  
      operator_name: this.data.operator_name,
      order_start_date: order_start_date,
      order_start_time: order_start_time,
      order_end_date: order_end_date,
      order_end_time: order_end_time,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      OrderList: [],
      PageNum: 1,
      nextPage: true,
      filter: true
    })
    //回到上一个页面
    wx.navigateBack({
      delta: 1
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
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    if(OperatorInfo.operator_role != 'OPERATOR'){
      let operator_list = new operator_list_data({'state':1});
      operator_list.load_list(this).then((res) => {
        if(res.result_code=="0000000"||res.result_code=="00000"){
          this.setData({
            operator_list:res.detail
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
  
  changeDateTime: function (e){
    if(e.currentTarget.dataset.id == 'start'){
      this.setData({
        sTime: e.detail.value 
      });
      let sDateArr = this.data.sDateArr;
      let sTime = this.data.sTime;
      let currTime = `${sDateArr[0][sTime[0]]}-${sDateArr[1][sTime[1]]}-${sDateArr[2][sTime[2]]} ${sDateArr[3][sTime[3]]}:${sDateArr[4][sTime[4]]}:${sDateArr[5][sTime[5]]}`;
      this.setData({
        startTime: currTime
      })
    }else if(e.currentTarget.dataset.id == 'end'){
      this.setData({
        eTime: e.detail.value 
      });
      let eDateArr = this.data.eDateArr;
      let eTime = this.data.eTime;
      let currTime = `${eDateArr[0][eTime[0]]}-${eDateArr[1][eTime[1]]}-${eDateArr[2][eTime[2]]} ${eDateArr[3][eTime[3]]}:${eDateArr[4][eTime[4]]}:${eDateArr[5][eTime[5]]}`;
      this.setData({
        endTime: currTime
      })
    }
  },
  
  changeDateTimeColumn: function (e){
    /* let arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr
    }); */
    
  },
  getNewDateArry: function (){
    // 当前时间的处理
    var newDate = new Date();
    var year = this.withData(newDate.getFullYear()),
        mont = this.withData(newDate.getMonth() + 1),
        date = this.withData(newDate.getDate()),
        hour = this.withData(newDate.getHours()),
        minu = this.withData(newDate.getMinutes()),
        seco = this.withData(newDate.getSeconds());
  
    return `${year}-${mont}-${date}`;
  },
  withData: function (param){
    return param < 10 ? '0' + param : '' + param;
  }
})