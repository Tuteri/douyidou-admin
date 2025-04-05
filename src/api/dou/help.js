import request from '@/utils/request'

// 查询使用说明列表
export function listHelp(query) {
  return request({
    url: '/dou/help/list',
    method: 'get',
    params: query
  })
}

// 查询使用说明详细
export function getHelp(id) {
  return request({
    url: '/dou/help/' + id,
    method: 'get'
  })
}

// 新增使用说明
export function addHelp(data) {
  return request({
    url: '/dou/help',
    method: 'post',
    data: data
  })
}

// 修改使用说明
export function updateHelp(data) {
  return request({
    url: '/dou/help',
    method: 'put',
    data: data
  })
}

// 删除使用说明
export function delHelp(id) {
  return request({
    url: '/dou/help/' + id,
    method: 'delete'
  })
}
