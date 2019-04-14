import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar, AtButton } from 'taro-ui'

import { IAccount } from '../../interfaces/account'
import emptyAvatar from '../../assets/images/empty_avatar_user.png'

import './account.scss'


type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  history: number,
  auth: boolean,
  account: IAccount
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
    }
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
      </View>
    )
  }
}

export default Account as ComponentClass<PageOwnProps, PageState>
