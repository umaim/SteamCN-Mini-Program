import Taro from '@tarojs/taro';

import {
  REQUEST_HOME,
  PARSE_HOME,
  FETCH_HOME_ERROR
} from '../constants/home'
import { homeParser } from '../utils/parser'

export const requestHome = () => {
  return {
    type: REQUEST_HOME
  }
}

export const parseHome = (html: string) => {
  const payload = homeParser(html)
  return {
    type: PARSE_HOME,
    payload: payload
  }
}

export const fetchHomeError = (err: string) => {
  return {
    type: FETCH_HOME_ERROR,
    payload: err
  }
}

export const fetchHome = () => {
  return dispatch => {
    dispatch(requestHome())
    return Taro.request({
      url: 'https://steamcn.com/forum.php?mobile=no',
      data: {},
      header: {},
      method: 'GET',
      dataType: 'html',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const html = res.data as string
        dispatch(parseHome(html))
        Taro.hideLoading()
        Taro.stopPullDownRefresh()
      } else {
        dispatch(fetchHomeError(`Fail to fetch homepage with statusCode: ${res.statusCode}`))
      }
    })
  }
}
