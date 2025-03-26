import request from '@/utils/request'

// 查询视频解析记录列表
export function listParse(query) {
  return request({
    url: '/dou/parse/list',
    method: 'get',
    params: query
  })
}

// 查询视频解析记录详细
export function getParse(id) {
  return request({
    url: '/dou/parse/' + id,
    method: 'get'
  })
}

// 新增视频解析记录
export function addParse(data) {
  return request({
    url: '/dou/parse',
    method: 'post',
    data: data
  })
}

// 修改视频解析记录
export function updateParse(data) {
  return request({
    url: '/dou/parse',
    method: 'put',
    data: data
  })
}

// 删除视频解析记录
export function delParse(id) {
  return request({
    url: '/dou/parse/' + id,
    method: 'delete'
  })
}
