import {
  INIT_CREDENTIAL,
  INVALID_CREDENTIAL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../constants/account';

const INITIAL_STATE = {
  auth: false,
  account: {
    uid: 0,
    username: '',
    email: '',
    avatar: '',
    groupid: 0,
    createAt: '',
    updatedAt: '',
    accessToken: ''
  }
};

export default function account(
  state = INITIAL_STATE,
  action
): {
    auth: boolean;
    account: {
      uid: number;
      username: string;
      email: string;
      avatar: string;
      groupid: number;
      createAt: string;
      updatedAt: string;
      accessToken: string;
    };
  } {
  switch (action.type) {
    case INIT_CREDENTIAL:
      return {
        ...state,
        auth: action.payload.auth,
        account: action.payload.account
      };
    case INVALID_CREDENTIAL:
      return INITIAL_STATE;
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload.auth,
        account: action.payload.account
      };
    case LOGIN_ERROR:
      return state;
    case LOGOUT:
      return state;
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case LOGOUT_ERROR:
      return state;
    default:
      return state;
  }
}
