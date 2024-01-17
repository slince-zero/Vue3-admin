import service from '../utlis/request'

// 登录
export const login = async (data) => {
  return service({
    url: '/user/login',
    method: 'post',
    data,
  })
}

// 退出登录
export const logout = () => {
  return service({
    url: '/api/logout',
    method: 'post',
  })
}

// 注册用户
export const register = (params) => {
  return service({
    url: '/user/register',
    method: 'post',
    data: params,
  })
}

// 获取验证码
export const getCaptcha = (params) => {
  return service({
    url: '/user/captcha',
    method: 'get',
  })
}

// 获取当前用户信息
export const getCurrentUserInfo = () => {
  return service({
    url: '/user/current',
    method: 'get',
  })
}
