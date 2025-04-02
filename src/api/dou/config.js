import request from '@/utils/request'
// 小程序配置
export function configRoutine(query={}) {
  return request({
    url: '/system/config/routine',
    method: 'get',
    params: query
  })
}
// 保存小程序配置
export function configRoutineSave(data) {
  return request({
    url: '/system/config/routine/save',
    method: 'post',
    data
  })
}