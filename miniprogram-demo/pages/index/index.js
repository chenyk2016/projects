Page({
  data: {
    pages: [
        "/pages/index/index",
        "/pages/keyboard-fix/index",
        // "/pages/web-view/index",
        "/pages/test-style/index"
    ],
  },
  openWebview(ev) {
    wx.navigateTo({
      url: '/pages/web-view/index?url=https://test.com:3000/index/',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'form/page/index'
        })
      }
    })
  },

  openPath(ev) {
    const path = ev.target.dataset.path;
    wx.navigateTo({
      url: path,
    })
  }
})