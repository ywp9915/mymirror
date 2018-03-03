//语音播报，调用百度语音
/**
 * @params PayAmT 金额
 * @params Page 全局对象
 * @params PayAmT 菜单页路径
 */
module.exports = (PayAmT, Page) => {
  console.log(PayAmT);
  let AudioSrc = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&vol=15&text=收款${PayAmT}元`;

  // if (wx.createInnerAudioContext) {
  //   console.log('兼容')
  //   const innerAudioContext = wx.createInnerAudioContext();
  //   innerAudioContext.autoplay = true;
  //   innerAudioContext.src = AudsioSrc;
  //   innerAudioContext.onPlay(() => {
  //     console.log('开始播放');
  //   })
  //   innerAudioContext.onError((res) => {
  //     console.log('播放错误')
  //     console.log(res.errMsg);
  //     console.log(res.errCode);
  //   })
  //   innerAudioContext.onEnded((res) => {
  //     console.log('播放结束')
  //     return wx.redirectTo({
  //       url: MenuUrl,
  //     })
  //   })
  // } 

    Page.audioCtx = wx.createAudioContext('myAudio');
    Page.audioCtx.setSrc(AudioSrc);
    Page.audioCtx.play();

}