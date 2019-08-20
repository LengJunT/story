import JFetch from './jfetch'
export const API_SITE_URL = `__SITE_URL__`

// 解决ie 会缓存get请求问题
export const jFetch = new JFetch({
  baseURI: '/hub',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
})
