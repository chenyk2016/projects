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
    console.log('webview onLoad:', option)
    this.initLoad = true
    this.setWebUrl(option.url)
  },
  onUnload() {
    console.log('webview onUnload:')
  },
  onReady: function() {
    this.initLoad = false
    console.log('webview onReady:')
  },
  onHide() {
    console.log('webview onHide:')
  },
  onShow() {
    console.log('webview onShow:')
  },

  // page
  onPageLoad (ev) {
    this.h5Ready = true
    // h5里面url地址变化的时候触发，包含query参数，但是不包含hash变化
    // 但是在小程序里面，通过改变url的方式，会触发变化
    console.log('onPageLoad', ev, ev.detail)
    let src = ev.detail.src;
    if(src) {
      this.parseMsgFromH5(src)
    }
  },
  onPageLoadError(ev) {
    console.log('onPageLoadError', ev, ev.detail)
  },
  onPageMessage(ev) {
    // 关闭web-view或者用户点击分享等，才会触发
    console.log('onPageMessage', ev, ev.detail)
  },


  reloadWebview() {

  },


  // addPostH5Queue(data) {
  //   const timer = this.toH5State.queueTimer
  //   if (timer) {
  //     clearTimeout(timer)
  //   }
  //   this.toH5State.queue.push[data]

  //   timer = setTimeout(() => {
  //     this.toH5State.isDoingPost = true
  //     this.doPostMessageToH5(this.toH5State.queue)
  //     this.toH5State.isDoingPost = false
  //     this.toH5State.queue = []
  //   }, 500)
  // },
  // /**
  //  * 等页面准备完成之后, 批量发送信息
  //  */
  // postMessageToH5({action, params = {}}) {
  //   const { isDoingPost, queue }
  //   if(!this.isReady || queue.length > 0) {
  //     this.addPostH5Queue({action, params})
  //   }
  // },
  /**
   *
   * @param {arr|obj} data
   */
  postMessageToH5(action, params) {
    this.toH5State.runTimes++
    const index = this.toH5State.runTimes
    const strData = qs.stringify({
      times: index,
      type: 'mini_to_h5',
      data: JSON.stringify({
        action,
        params
      })
    })

    console.log('postMessageToH5 data', strData);

    this.setWebUrl(this.options.url, strData)
  },
  parseMsgFromH5(src) {
    // {
    //   type: 'mini_to_h5',
    //   data: JSON.stringify({
    //     action,
    //     params
    //   })
    // }
    try {
      let hash = (src.match(/#(.*)/) || ['', ''])[1]

      if(!hash) return;

      hash = decodeURIComponent(hash)
      const hashParams = qs.parse(hash)
      hashParams.data = JSON.parse(hashParams.data)

      if(hashParams.type === 'h5_to_mini') {
        this.getMessageFromH5(hashParams.data.action, hashParams.data.params)
      }
    } catch (error) {
      console.log(error);
    }
  },
  getMessageFromH5(action, params) {
    // alert(`${action + JSON.stringify(params)}`)
    console.log('h5_to_mini',action, params);
  }
})