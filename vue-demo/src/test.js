import router from './router'

const result = {
  popstate: false,
  hashchange: false,
  about: false,
  'router.push': false
}
let time = 0
let linkEls = []

setTimeout(() => {
  linkEls = [...document.querySelector('#nav').children]
}, 200)

function doTest (cbs) {
  cbs.forEach(cb => {
    time += 500
    setTimeout(cb, time)
  })
}

function about () {
  linkEls[1].click()
  setTimeout(() => {
    result.about = document.querySelector('#view').innerText === 'about'
    linkEls[0].click()
  }, 100)
}

function push () {
  const key = 'test1'
  router.push(`/${key}`)
  setTimeout(() => {
    result['router.push'] = document.querySelector('#view').innerText === key
    linkEls[0].click()
  }, 100)
}

function popstate () {
  window.addEventListener('popstate', () => {
    result.popstate = true
  }, { once: true })

  window.addEventListener('hashchange', () => {
    result.hashchange = true
  }, { once: true })

  const key = 'test1'
  window.location.hash = '/#/test1'
  setTimeout(() => {
    linkEls[0].click()
  }, 100)
}


export default function run(cb) {
  doTest([about, push, popstate, () => {
    cb && cb(result)
  }])
}
