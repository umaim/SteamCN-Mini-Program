import {
  FETCH_THREAD,
  REQUEST_THREAD,
  // RECEIVE_THREAD,
  PARSE_THREAD,
  FETCH_THREAD_ERROR
} from '../constants/thread'
import {
  IThreadMeta
} from '../interfaces/thread'

export const fetchThread = (meta: IThreadMeta) => {
  return {
    type: FETCH_THREAD,
    meta: meta
  }
}

export const requestThread = (meta: IThreadMeta) => {
  return {
    type: REQUEST_THREAD,
    meta: meta
  }
}

export const parseThread = (data: string) => {
  return {
    type: PARSE_THREAD,
    data: data
  }
}

export const fetchThreadError = (msg: string) => {
  return {
    type: FETCH_THREAD_ERROR,
    msg: msg
  }
}
