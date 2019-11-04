import request from '@/utils/request'

export function getApply(params) {
  return request({
    url: '/apply/findApply',
    method: 'POST',
    params
  })
}
