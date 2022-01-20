import qs from 'qs'
import UA from '../../utils/ua'
import bridge from '../../utils/wx_bridge'

document.querySelector('#root').innerHTML = `
  <h2>web-view bridge功能测试</h2>

  <h3 id="bind-back">绑定back按钮1</h3>

  <h3 id="send-msg">向小程序发送消息</h3>

  <h3 id="to-test">跳转其他H5</h3>

  <h3 id="back-btn">小程序回退</h3>
`

const state = {
  hashTimes: 0
}

document.querySelector('#bind-back').addEventListener('click', () => {
  bridge.bindBack(() => {
    bridge.goto('https://test.com:3000/test/index.html', { __replace: true })
    // return true
  })
})

// document.querySelector('#bind-back2').addEventListener('click', () => {
//   bridge.bindBack(() => {
//     bridge.goto('https://test.com:3000/test/index.html', { __replace: true })
//     // return true
//   })
// })

document.querySelector('#send-msg').addEventListener('click', () => {
  bridge.sendMsgToMini('btn-click', '我被点击了')
})

document.querySelector('#back-btn').addEventListener('click', () => {
  console.log('#back-btn')
  bridge.goBack()
})

document.querySelector('#to-test').addEventListener('click', () => {
  bridge.goto('https://test.com:3000/test/index.html')
})


window.onload = () => {
  bridge.onPageVisibilityChange((ev, v) => {
    console.log(`: ${ev.type}, ${v}`)
  })

  bridge.bindGetMsgFromMini((data) => {
    console.log('getMsgFromMini', data);
  })

  window.addEventListener('popstate',e => {
    console.log('popstate 1111', e)
  },
  false
  )
}
