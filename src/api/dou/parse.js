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


// 删除视频解析记录
export function delParse(id) {
  return request({
    url: '/dou/parse/' + id,
    method: 'delete'
  })
}
