import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar, AtButton, AtModal, AtMessage } from 'taro-ui'

import { IAccount } from '../../interfaces/account'
import emptyAvatar from '../../assets/images/empty_avatar_user.png'

import './account.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  history: number,
  auth: boolean,
  account: IAccount,
  logoutConfirmModal: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Account {
  props: IProps;
}

class Account extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  state = {
    history: 0,
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
    },
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

    Taro.getStorage({
      key: 'auth'
    }).then(res => {
      const auth = res.data
      if (auth) {
        Taro.getStorage({
          key: 'account'
        }).then(res => {
          const account = res.data
          this.setState({
            auth,
            account
          })
        })
      } else {
        this.setState({
          auth
        })
      }
    }, () => {
      Taro.setStorageSync('auth', false)
    })
  }

  navigator(addr: string) {
    Taro.navigateTo({
      url: `/pages/account/${addr}`
    })
  }

  handleProfile() {
    if (this.state.auth) {
      // this.navigator('profile')
    } else {
      this.navigator('login')
    }
  }

  logout() {
    this.setState({
      logoutConfirmModal: true
    })
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
    Taro.request({
      url: 'https://vnext.steamcn.com/v1/auth/logout',
      data: {},
      header: {
        authorization: this.state.account.accessToken
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const isSuccessful = res.data.success
        if (isSuccessful) {
          this.setState({
            auth: false
          })
          Taro.setStorage({
            key: 'auth',
            data: false
          })
          Taro.removeStorage({
            key: 'account'
          })
          Taro.atMessage({
            message: '已退出登录ヾ(•ω•`)o',
            type: 'success',
            duration: 2000
          })
        }
      } else {
        const data = res.data
        Taro.atMessage({
          message: `登出失败😱，${data}`,
          type: 'error',
          duration: 2000
        })
      }
    }, () => {
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
    return (
      <View className='wrapper'>
        <AtMessage />
        <View className='profile' onClick={this.handleProfile}>
          <View className='info'>
            <AtAvatar
              className='avatar'
              circle
              image={this.state.auth ? this.state.account.avatar : emptyAvatar}
              size='normal'
            ></AtAvatar>
            <View className='text'>
              <View className='name'>{this.state.auth ? this.state.account.username : '登录'}</View>
              {this.state.auth
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

        {this.state.auth &&
          <AtButton
            className='logout'
            type='secondary'
            onClick={this.logout}
          >退出登录 ヾ(•ω•`)o</AtButton>}

        <AtModal
          isOpened={this.state.logoutConfirmModal}
          cancelText='我再想想'
          confirmText='不需要了'
          content='少年，你真的不渴望力量么？'
          onClose={this.closeLogoutModal.bind(this)}
          onCancel={this.closeLogoutModal.bind(this)}
          onConfirm={this.closeLogoutModalConfirm.bind(this)}
        />
      </View>
    )
  }
}

export default Account as ComponentClass<PageOwnProps, PageState>
