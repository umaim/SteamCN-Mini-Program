import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtMessage, AtButton, AtNavBar } from 'taro-ui';

import { IAccount } from '../../interfaces/account';
import {
  initCredential,
  logout,
  logoutSuccess,
  logoutError
} from '../../actions/account';

import './setting.scss';

interface Props {
  auth: boolean;
  account: IAccount;
  initCredential: () => void;
  logout: () => void;
  logoutSuccess: () => void;
  logoutError: () => void;
}

interface State {
  size: number;
  statusBarHeight: number;
}

@connect(
  ({ account }) => ({
    auth: account.auth,
    account: account.account
  }),
  dispatch => ({
    initCredential() {
      dispatch(initCredential());
    },
    logout() {
      dispatch(logout());
    },
    logoutSuccess() {
      dispatch(logoutSuccess());
    },
    logoutError() {
      dispatch(logoutError());
    }
  })
)
class Setting extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '设置'
  };

  public state = {
    size: 0,
    statusBarHeight: 20
  };

  public constructor(props: Props | undefined) {
    super(props);
    this.setState({
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
    });
  }

  public componentDidMount(): void {
    Taro.getStorageInfo({
      success: (res): void => {
        if (!res.keys.includes('history')) {
          this.setState({
            size: 0
          });
        } else {
          this.setState({
            size: res.currentSize
          });
        }
      }
    });

    this.props.initCredential();
  }

  private clearHistory(): void {
    Taro.removeStorage({
      key: 'history'
    }).then((): void => {
      this.setState({
        size: 0
      });
    });
  }

  private logout(): void {
    Taro.showModal({
      title: '提示',
      content: '确认退出登录？',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#E64340'
    }).then((res): void => {
      if (res.confirm) {
        this.doLogout();
      }
    });
  }

  private doLogout(): void {
    const { account } = this.props;
    this.props.logout();
    Taro.showLoading({
      title: '正在登出 💦'
    });
    Taro.request({
      url: 'https://vnext.steamcn.com/v1/auth/logout',
      data: {},
      header: {
        authorization: account.accessToken
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text'
    }).then(
      (res): void => {
        if (res.statusCode === 200 || res.statusCode === 401) {
          this.props.logoutSuccess();
          Taro.hideLoading();
          Taro.atMessage({
            message: '已退出登录ヾ(•ω•`)o',
            type: 'success',
            duration: 2000
          });
        } else {
          this.props.logoutError();
          const data = res.data.message;
          Taro.hideLoading();
          Taro.atMessage({
            message: `登出失败😱，${data}`,
            type: 'error',
            duration: 3000
          });
        }
      },
      (): void => {
        this.props.logoutError();
        Taro.hideLoading();
        Taro.atMessage({
          message: '网络连接中断😭',
          type: 'error',
          duration: 2000
        });
      }
    );
  }

  public render(): JSX.Element {
    const { auth } = this.props;
    const { size, statusBarHeight } = this.state;
    return (
      <View>
        <AtMessage />

        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title="设置"
          color="#FFF"
          leftIconType="chevron-left"
          onClickLeftIcon={(): void => {
            Taro.navigateBack({ delta: 1 });
          }}
          border={false}
        />

        <View className="content">
          <AtList>
            <AtListItem
              title="清除历史"
              extraText={`${size} KB`}
              onClick={this.clearHistory.bind(this)}
            />
          </AtList>
        </View>

        {auth && (
          <AtButton
            className="logout-button"
            type="secondary"
            circle
            onClick={this.logout.bind(this)}
          >
            退出登录 ヾ(•ω•`)o
          </AtButton>
        )}
      </View>
    );
  }
}

export default Setting as Taro.ComponentClass;
