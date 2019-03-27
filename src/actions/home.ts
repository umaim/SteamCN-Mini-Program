import Taro from '@tarojs/taro';
import { parse, HTMLElement } from 'node-html-parser'

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

export const parseHome = (dom: HTMLElement) => {
  const payload = homeParser(dom)
  Taro.hideLoading()
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
        const dom = parse(res.data as string)
        dispatch(parseHome(dom as HTMLElement))
      } else {
        dispatch(fetchHomeError(`Fail to fetch homepage with statusCode: ${res.statusCode}`))
      }
    })
  }
}
