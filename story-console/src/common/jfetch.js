import superagent from 'superagent'
import { getSessionTokenOrLocal } from '../util'

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
]

class _JFetch {
  constructor(opts) {
    this.opts = opts || {}
    // if (!this.opts.baseURI) {
    //   throw new Error('baseURI option is required')
    // }
    methods.forEach(method =>
      (this[method] = (path, { params, data, timeout = 60000 } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](this.opts.baseURI + path)
        if (params) {
          request.query(params)
        }
        if (!this.opts.headers) {
          this.opts['headers'] = []
        }
        const token = getSessionTokenOrLocal()
        if (token) {
          this.opts.headers['Authorization'] = `Bearer ${token}`
        }
        request.set(this.opts.headers)
        if (data) {
          request.send(data)
        }
        if (timeout) {
          request.timeout(timeout)
        }
        request.then(function (res) {
          // let token = getToken()
          // if (token) {
          //   setToken(token)
          // }
          let data = res.body
          let { code = '', content = {} } = data
          const { errorCode = '' } = content
          if (code === 'SUCCESS') {
            resolve(data || '')
          } else {
           if (Object.getOwnPropertyNames(content).length === 0) {
              data['content'] = { message: '操作失败，请稍后再试！' }
            } else if (typeof content === 'string') {
              data['content'] = { message: content }
            }
            reject(data || '')
          }
        }).catch(err => {
          const { status, code } = err
          if (code === 'ECONNABORTED') {
            err = { content: { message: '请求超时,请联系管理员！' } }
          } else if (status === 403) {
            err = { content: { message: '没有操作权限！', status } }
          } else {
            err = { content: { message: err.toString() } }
          }
          console.log('jfecth', err)
          reject(err)
        })
      }))
    )
  }
}

const JFetch = _JFetch

export default JFetch
