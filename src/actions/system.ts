import Taro from '@tarojs/taro';
import { GET_SYSTEM_INFO } from '../constants/system';

export interface SystemInfo {
  statusBarHeight: number;
  menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect.Return;
}

// eslint-disable-next-line import/prefer-default-export
export const getSystemInfo = (): {
  type: string;
  payload: {
    statusBarHeight: number;
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect.Return;
  };
} => {
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight;
  const menuButtonBoundingClientRect = Taro.getMenuButtonBoundingClientRect();
  return {
    type: GET_SYSTEM_INFO,
    payload: { statusBarHeight, menuButtonBoundingClientRect }
  };
};
