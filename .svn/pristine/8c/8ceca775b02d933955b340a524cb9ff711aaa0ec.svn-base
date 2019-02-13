
const CanQrCode = require('../resource/js/qrcode.js');
//创建二维码
class CreateQrCode{

  convertLen(length){
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
  }

  createQr(id, Url, width, height) {
    let that=this;
  
    CanQrCode.api.draw(Url, {
      //取Dom的ID
      ctx: wx.createCanvasContext(id),
      width: that.convertLen(width),
      height: that.convertLen(height)
    })
    
  }

}

module.exports = new CreateQrCode()