Page({
    openWebview(ev) {
        wx.navigateTo({
            url: '/pages/web-view/index?url=https://test.com:3000/',
            success: function(res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'form/page/index' })
            }
        })
    },
    openKeyboardFix(ev) {
        wx.navigateTo({
            url: '/pages/keyboard-fix/index',
            success: function(res) {
                // 通过eventChannel向被打开页面传送数据
                // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'form/page/index' })
            }
        })
    }
})
