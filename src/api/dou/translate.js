import request from '@/utils/request'

// 查询视频转码列表
export function listTranslate(query) {
  return request({
    url: '/dou/translate/list',
    method: 'get',
    params: query
  })
}

// 查询视频转码详细
export function getTranslate(id) {
  return request({
    url: '/dou/translate/' + id,
    method: 'get'
  })
}



// 删除视频转码
export function delTranslate(id) {
  return request({
    url: '/dou/translate/' + id,
    method: 'delete'
  })
}
