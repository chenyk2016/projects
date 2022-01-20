import UA from '../utils/ua'
import qs from 'qs'
let MiniBridge = {}

/**
 * 小程序拦截返回按钮
 * @param {*} cb bind的函数，绑定之后，想要正常返回，需要手动调用返回
 *
 */
function bindBack(cb) {
  let hasBindBack = false

  return (cb) => {
    if(hasBindBack) return;
    hasBindBack = true

    const title = document.title
    console.log('bindBack')
    /**
     * 采用 hash 变化触发
     * 安卓需要用 hash变化才能生效
     * iso hash变化和query参数变化都可以生效
     * 用 history state 可以保留hash的通信功能。
     *
     * 有个BUG就是，需要页面被点击一下之后，pushState才会才会生效
     */
    window.history.replaceState({
      emitBack: 1,
      title: document.title
    }, title, `#event.back`)

    window.history.pushState({
      emitBack: 0,
      title: document.title
    }, title, `#event.back`)

    window.addEventListener('popstate',e => {
      if(e.state && e.state.emitBack === 1 && cb) {
        console.log('bindBack do cb')
        cb && cb()
      }
    },
    false
    )
  }

}

function bindBack2() {
  let bindBackCb = null

  return (cb) => {
    if(bindBackCb) return;

    bindBackCb = cb
    if (window.history && window.history.pushState) {
      try {
        var state = {
          title: document.title,
          url: "#event.back",
        }
        console.log(["push history", state])
        window.history.pushState(state, state.title, state.url)
        window.addEventListener(
          "popstate",
          e => {
            if(bindBackCb) {
              bindBackCb()
            }
          },
          false
        )
      } catch (e) {
        //
      }
    }
  }
}

export function onPageVisibilityChange(handler) {
  var hidden = 'hidden'

  if (hidden in document) {
    // Standards:
    document.addEventListener('visibilitychange', onchange)
  } else if ('mozHidden' in document) {
    hidden = 'mozHidden'
    document.addEventListener('mozvisibilitychange', onchange)
  } else if ('webkitHidden' in document) {
    hidden = 'webkitHidden'
    document.addEventListener('webkitvisibilitychange', onchange)
  } else if ('msHidden' in document) {
    hidden = 'msHidden'
    document.addEventListener('msvisibilitychange', onchange)
  } else if ('onfocusin' in document) {
    // IE 9 and lower:
    document.onfocusin = document.onfocusout = onchange
  } else {
    // All others:
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange
  }

  function onchange(evt) {
    let v = 'visible',
      h = 'hidden',
      evtMap = {
        focus: v,
        focusin: v,
        pageshow: v,
        blur: h,
        focusout: h,
        pagehide: h,
      }

    evt = evt || window.event

    let value = ''
    if (evt.type in evtMap) value = evtMap[evt.type]
    else value = document[hidden] ? 'hidden' : 'visible'

    handler(evt, value)
  }
}

export function initMsgMiniToH5(cb) {
  /**
   * 通过hash变化, miniProgram-web-view 向h5发送消息
   *
   *
   *
   **/
  window.addEventListener('hashchange', () => {
    // {
    //   times: index,
    //   type: 'mini_to_h5',
    //   data: JSON.stringify({
    //     action: str
    //     params: obj
    //   })
    // }
    try {
      const hashParams = qs.parse(decodeURIComponent(location.hash).slice(1))
      console.log('hashchange', location)

      if(hashParams.type === 'mini_to_h5') {

        hashParams.data = JSON.parse(hashParams.data)

        console.log('getMsg mini_to_h5', hashParams)
        history.back()

        cb && cb(hashParams.data)
      }
    } catch (error) {
      console.log(error);
      // 其他hash变化，不处理
    }
  })
}

/**
 * 向小程序发送消息，
 * 通过location.replace 触发web-view组件的 bindload
 * 会重新刷新页面
 *
 * @param {*} action
 * @param {*} params
 * @returns
 */
export function sendMsgToMini (action, params) {
  if(!action) return;
  let { origin, pathname, search = '?', hash = '#' } = location
  search = qs.parse(search.slice(1)) || {}
  search.t = Date.now()
  search = `?${qs.stringify(search)}`
  const data = {
    type: 'h5_to_mini',
    data: JSON.stringify({
      action,
      params
    })
  }

  hash = `#${qs.stringify(data)}`

  const url = `${origin + pathname + search + hash}`
  console.log('sendMsg', url, data);
  location.replace(url)
}


MiniBridge = {
  emit() {

  },
  goBack() {
    if(UA.isMiniProgram()) {
      window.wx.miniProgram.navigateBack()
    } else {
      history.go(-1)
    }
  },
  goto(url, params) {
    let method = 'navigateTo' // [navigateTo, redirectTo]

    if(params.__replace) {
      method = 'redirectTo'
    }

    if(UA.isMiniProgram()) {
      window.wx.miniProgram[method]({
        url: `/pages/web-view/index?url=${encodeURIComponent(url)}`,
        complete() {
          console.log(`bridge goto[${url}] complete`)
        },
        success() {
          console.log(`bridge goto[${url}] success`)
        },
        fail() {
          console.log('bridge goto: fail')
          alert(`bridge goto[${url}] fail`)
        },
      })
    } else {
      window.location = url
    }
  },
  bindBackCb: null,
  bindBack: bindBack(),
  // bindBack2: bindBack2(),
  onPageVisibilityChange,
  bindGetMsgFromMini (cb) {
    initMsgMiniToH5(cb)
  },
  sendMsgToMini,
}


export default MiniBridge