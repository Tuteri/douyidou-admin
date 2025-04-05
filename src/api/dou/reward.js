import request from '@/utils/request'

// 查询激励广告奖励列表
export function listReward(query) {
  return request({
    url: '/dou/reward/list',
    method: 'get',
    params: query
  })
}

// 查询激励广告奖励详细
export function getReward(id) {
  return request({
    url: '/dou/reward/' + id,
    method: 'get'
  })
}

// 删除激励广告奖励
export function delReward(id) {
  return request({
    url: '/dou/reward/' + id,
    method: 'delete'
  })
}
