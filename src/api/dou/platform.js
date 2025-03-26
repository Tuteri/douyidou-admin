import request from '@/utils/request'

// 查询支持的平台列表
export function listPlatform(query) {
  return request({
    url: '/dou/platform/list',
    method: 'get',
    params: query
  })
}

// 查询支持的平台详细
export function getPlatform(id) {
  return request({
    url: '/dou/platform/' + id,
    method: 'get'
  })
}

// 新增支持的平台
export function addPlatform(data) {
  return request({
    url: '/dou/platform',
    method: 'post',
    data: data
  })
}

// 修改支持的平台
export function updatePlatform(data) {
  return request({
    url: '/dou/platform',
    method: 'put',
    data: data
  })
}

// 删除支持的平台
export function delPlatform(id) {
  return request({
    url: '/dou/platform/' + id,
    method: 'delete'
  })
}
