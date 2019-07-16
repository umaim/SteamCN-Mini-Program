import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtAvatar, AtNavBar } from 'taro-ui';

import { IAccount } from '../../interfaces/account';
import { initCredential } from '../../actions/account';
import EmptyAvatar from './assets/empty_avatar_user.png';

import './account.scss';

interface Props {
  auth: boolean;
  account: IAccount;
  initCredential: () => void;
}

interface State {
  history: number;
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
    }
  })
)
class Account extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '我的'
  };

  public state = {
    history: 0,
    statusBarHeight: 20
  };

  public constructor(props: Props | undefined) {
    super(props);
    this.setState({
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
    });
  }

  public componentDidShow(): void {
    Taro.getStorage({
      key: 'history'
    }).then(
      (res): void => {
        this.setState({
          history: res.data.length
        });
      },
      (): void => {
        this.setState({
          history: 0
        });
      }
    );

    this.props.initCredential();
  }

  private navigator(addr: string): void {
    Taro.navigateTo({
      url: `/pages/account/${addr}`
    });
  }

  private handleProfile(): void {
    const { auth } = this.props;
    if (auth) {
      // this.navigator('profile')
    } else {
      this.navigator('login');
    }
  }

  private joking(): void {
    Taro.showToast({
      title: '这里还没抛瓦 QAQ',
      icon: 'none',
      duration: 1500
    });
  }

  public render(): JSX.Element {
    const { auth, account } = this.props;
    const { history, statusBarHeight } = this.state;
    return (
      <View>
        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title="我的"
          border={false}
        />

        <View className="wrapper">
          <View className="profile" onClick={this.handleProfile}>
            <View className="info">
              <AtAvatar
                className="avatar"
                circle
                image={auth ? account.avatar : EmptyAvatar}
                size="normal"
              ></AtAvatar>
              <View className="text">
                <View className="name">{auth ? account.username : '登录'}</View>
                {auth ? (
                  <View>充满抛瓦！(๑•̀ㅂ•́)و✧</View>
                ) : (
                  <View>一直未登录你怎么变强？w(ﾟДﾟ)w</View>
                )}
              </View>
            </View>

            <Text className="more at-icon at-icon-chevron-right"></Text>
          </View>

          <View className="forum-area">
            <AtList>
              <AtListItem
                title="消息中心"
                iconInfo={{ value: 'bell', color: '#ABB4BF' }}
                onClick={this.joking}
              />
              <AtListItem
                title="我的收藏"
                extraText="0 个"
                iconInfo={{ value: 'star', color: '#ABB4BF' }}
                onClick={this.joking}
              />
              <AtListItem
                title="浏览历史"
                extraText={`${history} 篇`}
                iconInfo={{ value: 'clock', color: '#ABB4BF' }}
                onClick={this.navigator.bind(this, 'history')}
              />
            </AtList>
          </View>

          <View className="program-area">
            <AtList>
              <AtListItem
                title="设置"
                iconInfo={{ value: 'settings', color: '#ABB4BF' }}
                onClick={this.navigator.bind(this, 'setting')}
              />
              <AtListItem
                title="关于"
                iconInfo={{ value: 'lightning-bolt', color: '#ABB4BF' }}
                onClick={this.navigator.bind(this, 'about')}
              />
            </AtList>
          </View>
        </View>
      </View>
    );
  }
}

export default Account as Taro.ComponentClass;
