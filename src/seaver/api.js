// 引入文件
import request from './request'

/**
 *  获取所有列表数据
 * @method getAllPermission
 * @return {[type]}         [description]
 */
export function getList() {
  return request({
    url: '/mock/list.json',
    method: 'get',
    params: {
      'page_size': 9999
    }
  })
}