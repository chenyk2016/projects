const qs = require('../../utils/qs')

Page({
  initLoad: false,
  h5Ready: false,
  toH5State: {
    runTimes: 0,
    queue: [],
    queueTimer: null,
    isDoingPost: false,
  },
  data: {
    url: '',
    key: '',
    hash: '',
  },
  setWebUrl(url, hash = '') {
    hash = `#${encodeURIComponent(hash)}`
    url = `${decodeURIComponent(url)}${hash}`
    console.log('setWebUrl', url);

    this.setData({
      url,
    })
  },
  onLoad: function(option){
    console.log('page onLoad:', option)
    this.initLoad = true
    this.setWebUrl(option.url)
  },
  onUnload() {
    console.log('page onUnload:')
  },
  onReady: function() {
    this.initLoad = false
    console.log('page onReady:')
  },
  onHide() {
    console.log('page onHide:')
  },
  onShow() {
    console.log('page onShow:')
  },

  // page
  onPageLoad (ev) {
    this.h5Ready = true
    // h5里面url地址变化的时候触发，包含query参数，但是不包含hash变化
    // 但是在小程序里面，通过改变url的方式，会触发变化
    console.log('onH5Load', ev, ev.detail)
    let src = ev.detail.src;
    if(src) {
      this.parseMsgFromH5(src)
    }
  },
  onPageLoadError(ev) {
    console.log('onH5LoadError', ev, ev.detail)
  },
  onPageMessage(ev) {
    // 关闭web-view或者用户点击分享等，才会触发
    console.log('onH5Message', ev, ev.detail)
  },

  touchstart(ev) {
    console.log(ev);

  },

  onResize(res) {
    console.log(res.size.windowWidth, res.size.windowHeight);
  },

  keyboard(event) {
    console.log(event);
  }
})