import request from '@/utils/request'

// 查询应用用户列表
export function listUser(query) {
  return request({
    url: '/dou/user/list',
    method: 'get',
    params: query
  })
}

// 查询应用用户详细
export function getUser(id) {
  return request({
    url: '/dou/user/' + id,
    method: 'get'
  })
}


// 修改应用用户
export function updateUser(data) {
  return request({
    url: '/dou/user',
    method: 'put',
    data: data
  })
}

// 删除应用用户
export function delUser(id) {
  return request({
    url: '/dou/user/' + id,
    method: 'delete'
  })
}
