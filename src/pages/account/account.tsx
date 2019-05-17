import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar, AtButton, AtModal, AtMessage } from 'taro-ui'

import { IAccount } from '../../interfaces/account'
import { initCredential, logout, logoutSuccess, logoutError } from '../../actions/account'
import empty_avatar_user from './assets/empty_avatar_user.png'

import './account.scss'

type PageStateProps = {
  auth: boolean,
  account: IAccount,
}

type PageDispatchProps = {
  initCredential: () => void,
  logout: () => void,
  logoutSuccess: () => void,
  logoutError: () => void
}

type PageOwnProps = {}

type PageState = {
  history: number,
  logoutConfirmModal: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Account {
  props: IProps;
}

@connect(({ account }) => ({
  auth: account.auth,
  account: account.account
}), (dispatch) => ({
  initCredential() {
    dispatch(initCredential())
  },
  logout() {
    dispatch(logout())
  },
  logoutSuccess() {
    dispatch(logoutSuccess())
  },
  logoutError() {
    dispatch(logoutError())
  }
}))
class Account extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  state = {
    history: 0,
    logoutConfirmModal: false
  }

  componentDidShow() {
    Taro.getStorage({
      key: 'history'
    }).then((res) => {
      this.setState({
        history: res.data.length
      })
    }, () => {
      this.setState({
        history: 0
      })
    })

    this.props.initCredential()
  }

  navigator(addr: string) {
    Taro.navigateTo({
      url: `/pages/account/${addr}`
    })
  }

  handleProfile() {
    if (this.props.auth) {
      // this.navigator('profile')
    } else {
      this.navigator('login')
    }
  }

  logout() {
    this.setState({
      logoutConfirmModal: true
    })
    this.props.logout()
  }

  closeLogoutModal() {
    this.setState({
      logoutConfirmModal: false
    })
  }

  closeLogoutModalConfirm() {
    this.setState({
      logoutConfirmModal: false
    })
    this.doLogout()
  }

  doLogout() {
    this.props.logout()
    Taro.request({
      url: 'https://vnext.steamcn.com/v1/auth/logout',
      data: {},
      header: {
        authorization: this.props.account.accessToken
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200 || res.statusCode === 401) {
        this.props.logoutSuccess()
        Taro.atMessage({
          message: '已退出登录ヾ(•ω•`)o',
          type: 'success',
          duration: 2000
        })
      } else {
        this.props.logoutError()
        const data = res.data.message
        Taro.atMessage({
          message: `登出失败😱，${data}`,
          type: 'error',
          duration: 3000
        })
      }
    }, () => {
      this.props.logoutError()
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 2000
      })
    })
  }

  joking() {
    Taro.showToast({
      title: '这里还没抛瓦 QAQ',
      icon: 'none',
      duration: 1500
    })
  }

  render() {
    const { auth, account } = this.props
    return (
      <View className='wrapper'>
        <AtMessage />
        <View className='profile' onClick={this.handleProfile}>
          <View className='info'>
            <AtAvatar
              className='avatar'
              circle
              image={auth ? account.avatar : empty_avatar_user}
              size='normal'
            ></AtAvatar>
            <View className='text'>
              <View className='name'>{auth ? account.username : '登录'}</View>
              {auth
                ? <View>充满抛瓦！(๑•̀ㅂ•́)و✧</View>
                : <View>一直未登录你怎么变强？w(ﾟДﾟ)w</View>}
            </View>
          </View>

          <View className='more at-icon at-icon-chevron-right'></View>
        </View>

        <View className='forum-area'>
          <AtList>
            <AtListItem
              title='消息中心'
              iconInfo={{ value: 'bell', color: '#ABB4BF' }}
              onClick={this.joking}
            />
            <AtListItem
              title='我的收藏'
              extraText='0 个'
              iconInfo={{ value: 'star', color: '#ABB4BF' }}
              onClick={this.joking}
            />
            <AtListItem
              title='浏览历史'
              extraText={`${this.state.history} 篇`}
              iconInfo={{ value: 'clock', color: '#ABB4BF' }}
              onClick={this.navigator.bind(this, 'history')}
            />
          </AtList>
        </View>

        <View className='program-area'>
          <AtList>
            <AtListItem
              title='设置'
              iconInfo={{ value: 'settings', color: '#ABB4BF' }}
              onClick={this.navigator.bind(this, 'setting')}
            />
            <AtListItem
              title='关于'
              iconInfo={{ value: 'lightning-bolt', color: '#ABB4BF' }}
              onClick={this.navigator.bind(this, 'about')}
            />
          </AtList>
        </View>

        {auth &&
          <AtButton
            className='logout'
            type='secondary'
            onClick={this.logout}
          >退出登录 ヾ(•ω•`)o</AtButton>}

        <AtModal
          isOpened={this.state.logoutConfirmModal}
          cancelText='点错啦 QAQ'
          confirmText='不渴望了'
          content='少年，你真的不渴望抛瓦么？'
          onClose={this.closeLogoutModal.bind(this)}
          onCancel={this.closeLogoutModal.bind(this)}
          onConfirm={this.closeLogoutModalConfirm.bind(this)}
        />
      </View>
    )
  }
}

export default Account as ComponentClass<PageOwnProps, PageState>
