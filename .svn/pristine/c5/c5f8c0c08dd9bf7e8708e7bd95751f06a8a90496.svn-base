//配置
const Config = require('../../config.js');

const dataApi = require('../../ddpay/mer_modify_role.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleItem: [
      {name: 'DIANZHANG', value: '店长'},
      {name: 'OPERATOR', value: '收银员'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataInfo = JSON.parse(options.data);
    this.setData({
      data:dataInfo,
      role: dataInfo.role,
      operator: dataInfo.operator_name,
      mercode: dataInfo.mercode
    })
    
  },
  radioChange: function(e) {
    this.setData({
      role: e.detail.value
    })
  },
  confirm(){
    let sData = {
      mercode:this.data.mercode,
      operator: this.data.operator,
      role: this.data.role
    }
    let loadApi = new dataApi(sData);
    loadApi.changeRole(this).then((res) => {
      if(res.result_code=="0000000"||res.result_code=="00000"){
        wx.showModal({
          title: '提示',
          content: '修改成功',
          showCancel:false,
          success:function(){
            wx.navigateBack({
              delta: 2
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