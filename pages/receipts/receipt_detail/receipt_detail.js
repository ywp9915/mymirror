// pages/receipt_detail/receipt_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOperator:false,
    "MerInfoName": [
      {
        Desc: "商户编号",
        Key: "mercode"
      },
      {
        Desc: "商户名称",
        Key: "mername"
      }

    ],
    "OrderInfoName": [
      {
        Desc: "订单类型",
        Key: "order_type"
      },
      {
        Desc: "订单号",
        Key: "main_order_no"
      },
      {
        Desc: "支付流水号",
        Key: "pay_no"
      },
      {
        Desc: "渠道订单号",
        Key: "channel_order_no"
      },
      {
        Desc: "外部订单号",
        Key: "ext_order_no"
      },
      {
        Desc: "支付方式",
        Key: "pay_type"
      },
      {
        Desc: "下单时间",
        Key: "order_time_HMS"
      },
      {
        Desc: "支付时间",
        Key: "pay_time_HMS"
      }


    ],
    "FeeInfoName": [
      {
        Desc: "订单金额",
        Key: "total_amt"
      },
      {
        Desc: "优惠金额",
        Key: "discount_amt"
      },
      {
        Desc: "支付金额",
        Key: "pay_amt"
      },
      {
        Desc: "手续费",
        Key: "fee"
      }
    ],
    "RefundInfoName": [
      {
        Desc: "退款状态",
        Key: "refund_status"
      },
      {
        Desc: "已退款金额",
        Key: "total_refund_amt"
      },
      {
        Desc: "退款中金额",
        Key: "total_refunding_amt"
      },
      {
        Desc: "退款次数",
        Key: "refund_count"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (OrderData) {
    //let OrderId = OrderData.OrderId;
    //let GroupId = OrderData.GroupId;
    let OperatorInfo = wx.getStorageSync("OperatorInfo");
    if (OperatorInfo.operator_role == "OPERATOR") {//收银员登录
        this.setData({
          isOperator:true
        })
    }
    let OrderDetail = wx.getStorageSync('OrderDetail');
    if(OrderDetail.order_type == 'CASHIER'){
      OrderDetail.order_type = '线下收银台'
    }else if(OrderDetail.order_type == 'BPAY'){
      OrderDetail.order_type = '非税缴费'
    }else if(OrderDetail.order_type == 'MALL'){
      OrderDetail.order_type = '商城'
    }else if(OrderDetail.order_type == 'CF'){
      OrderDetail.order_type = '众筹'
    }else if(OrderDetail.order_type == 'BCOM'){
      OrderDetail.order_type = '小区缴费'
    }else if(OrderDetail.order_type == 'RECHARGE'){
      OrderDetail.order_type = '充值'
    }else if(OrderDetail.order_type == 'CATERING'){
      OrderDetail.order_type = '餐饮'
    }else if(OrderDetail.order_type == 'BILL'){
      OrderDetail.order_type = '缴费通'
    }else if(OrderDetail.order_type == 'ESHOP'){
      OrderDetail.order_type = 'e订点社区超市'
    }

    this.setData({
      'OrderDetail': OrderDetail
    })
    let detail = this.data.OrderDetail
    let pay_amt = detail.pay_amt*100
    let refundamt = detail.total_refunding_amt*100+detail.total_refund_amt*100
    let Amt =  (pay_amt-refundamt)/100
    this.setData({
      "Amt": Amt
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
    try {
      wx.removeStorageSync('OrderDetail')
    } catch (err) {
    }
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
  refundList:function(){
    return wx.redirectTo({
      url: '../../refund/refund?query_no='+this.data.OrderDetail.main_order_no
    })
  },
  refundApply:function(){
    return wx.navigateTo({
      url: '../../order_refund/order_refund?main_order_no='+this.data.OrderDetail.main_order_no+'&Amt='+this.data.Amt
    })
  }
})