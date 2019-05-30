export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor((Math.random()*arr.length))
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 获取cookie
 */
export function getCookie (name) {
  var arr , reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  console.log('match:', document.cookie.match(reg))
  arr = document.cookie.match(reg)
  if (arr[2]) {
    return (arr[2])
  } else {
    return null
  }
}

/**
 * 设置cookie
 */
export function setCookie (name, value, expiredays = 1000 * 60 * 60) {
  console.log('cookiename:', name)
  const exdate = new Date()
  console.log('cookievalue:', value)
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ';expires=' + exdate.toGMTString() + ';path=/'
  console.log('setCookie:', document.cookie)
}

/**
 * 删除cookie
 */
export function delCookie (name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const val = getCookie(name)
  if (val != null) {
    document.cookie = name + '=' + val + ';expires' + exp.toGMTString()
  }
}
