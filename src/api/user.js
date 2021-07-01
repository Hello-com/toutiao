/**
 * 用户相关请求模块
 */
import request from "@/utlis/request";
//
// import store from '@/store/'

/**
 * 登陆/注册
 */
export const login = data => {
    return request({
        method: 'POST',
        url: 'app/v1_0/authorizations',
        data
    })
}
/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `app/v1_0/sms/codes/${mobile}`,

    })
}

/**
 * 获取登陆用户信息
 */
export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: `app/v1_0/user`
        // headers: {
        //     ContentType: 'application/json',
        //     Authorization: `Bearer ${store.state.user.token}`
        // }

    })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `app/v1_0/user/channels`

    })
}