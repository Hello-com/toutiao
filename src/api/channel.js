/**
 * 频道相关请求模块
 */
import request from "@/utlis/request";

/**
 * 获取所有频道列表
 */

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/channels',
    })
}