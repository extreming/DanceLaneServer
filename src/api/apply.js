import request from '@/utils/request'

export function getApply(data) {
  return request({
    url: '/apply/queryApply',
    method: 'POST',
    data
  })
}

export function updateApply(data) {
  return request({
    url: '/apply/updateApply',
    method: 'POST',
    data
  })
}
