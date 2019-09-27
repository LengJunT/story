export function setUserNameAndToken(token: string, username: string) {
    setExpiredValue('story_login_token', token)
    setValue('story_login_username', username)
}
export function logout() {
    window.localStorage.clear()
    window.location.href = '/console/login'
  }
export function getSessionTokenOrLocal() {
    const local = getExpiredValue('story_login_token') || ''
    const session = getValueSession('story_login_token')
    if (session) {
        return session
    }
    return local
}
function getExpiredValue(key: string) {
    const expiredTime = parseFloat(getValue('__expiredTime_'))
    const currentTime = new Date().getTime()
    if (currentTime < expiredTime) {
        const token = getValue(key)
        setExpiredValue(key, token)
        return token
    } else {
        clear()
    }
    return ''
}

export function setValue(key: string, value: string) {
    window.localStorage.setItem(key, value)
}

export function getValue(key: string): string {
    return window.localStorage.getItem(key) || ''
}

export function setValueSession(key: string, value: string) {
    window.sessionStorage.setItem(key, value)
}

export function getValueSession(key: string) {
    return window.sessionStorage.getItem(key)
}
function setExpiredValue(key: string, value: string, duration = 3600000) {
    window.localStorage.setItem('__expiredTime_', (new Date().getTime() + duration).toString())
    window.localStorage.setItem(key, value)
}

export function clear() {
    window.localStorage.clear()
}


export function isEmpty(val:any) {
    return (
      val === undefined ||
      val === null ||
      val === false ||
      val.length <= 0 || (typeof val === 'object' && !Object.getOwnPropertySymbols(val).length && !Object.getOwnPropertyNames(val).length)
    )
  }