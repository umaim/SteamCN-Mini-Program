import {
  REQUEST_HOME,
  PARSE_HOME,
  FETCH_HOME_ERROR
} from '../constants/home'
import { IThreadMeta } from '../interfaces/thread'

const INITIAL_STATE = {
  bannerThreadList: [] as IThreadMeta[],
  indexThreadList: [] as IThreadMeta[],
  newThreadList: [] as IThreadMeta[],
  hotThreadList: [] as IThreadMeta[]
}

export default function home (state = INITIAL_STATE, action: { type: string; payload}) {
  switch (action.type) {
    case REQUEST_HOME :
      return state
    case PARSE_HOME:
      return {
        ...state,
        bannerThreadList: action.payload.bannerThreadList,
        indexThreadList: action.payload.indexThreadList,
        newThreadList: action.payload.newThreadList,
        hotThreadList: action.payload.hotThreadList
      }
    case FETCH_HOME_ERROR:
      return {
        ...state,
        err: action.payload
      }
    default:
      return state
  }
}
