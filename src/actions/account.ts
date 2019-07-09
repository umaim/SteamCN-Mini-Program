import Taro from '@tarojs/taro';
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
import { IAccount } from '../interfaces/account';

export const initCredential = () => {
  return dispatch => {
    Taro.getStorage({
      key: 'auth'
    }).then(
      res => {
        const auth = res.data;
        if (auth) {
          Taro.getStorage({
            key: 'account'
          }).then(res => {
            const account = res.data;
            dispatch({
              type: INIT_CREDENTIAL,
              payload: {
                auth: true,
                account
              }
            });
          });
        } else {
          dispatch({
            type: INIT_CREDENTIAL,
            payload: {
              auth: false,
              account: {
                uid: 0,
                username: '',
                email: '',
                avatar: '',
                groupid: 0,
                createdAt: '',
                UpdatedAt: '',
                accessToken: ''
              }
            }
          });
        }
      },
      () => {
        Taro.setStorageSync('auth', false);
        dispatch({
          type: INIT_CREDENTIAL,
          payload: {
            auth: false,
            account: {
              uid: 0,
              username: '',
              email: '',
              avatar: '',
              groupid: 0,
              createdAt: '',
              UpdatedAt: '',
              accessToken: ''
            }
          }
        });
      }
    );
  };
};

export const invalidCredential = (): { type: string } => {
  return {
    type: INVALID_CREDENTIAL
  };
};

export const login = (): { type: string } => {
  return {
    type: LOGIN
  };
};

export const loginSuccess = (
  account: IAccount
): { type: string; payload?: { auth: boolean; account: IAccount } } => {
  Taro.setStorage({
    key: 'auth',
    data: true
  });
  Taro.setStorage({
    key: 'account',
    data: account
  });
  return {
    type: LOGIN_SUCCESS,
    payload: {
      auth: true,
      account
    }
  };
};

export const loginError = (): { type: string } => {
  return {
    type: LOGIN_ERROR
  };
};

export const logout = (): { type: string } => {
  return {
    type: LOGOUT
  };
};

export const logoutSuccess = (): { type: string } => {
  Taro.setStorage({
    key: 'auth',
    data: false
  });
  Taro.removeStorage({
    key: 'account'
  });
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (): { type: string } => {
  return {
    type: LOGOUT_ERROR
  };
};
