import { GET_SYSTEM_INFO } from '../constants/system';
import { SystemInfo } from '../actions/system';

const INITIAL_STATE = {
  statusBarHeight: 0,
  menuButtonBoundingClientRect: {
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

export default function system(
  state = INITIAL_STATE,
  action: { type: string; payload: SystemInfo }
): SystemInfo {
  switch (action.type) {
    case GET_SYSTEM_INFO:
      return action.payload;
    default:
      return state;
  }
}
