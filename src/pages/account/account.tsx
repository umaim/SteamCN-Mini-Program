import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'

import emptyAvatar from '../../assets/images/empty_avatar_user.png'

import './account.scss'
import { AtList, AtListItem } from 'taro-ui';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  history: number
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
    history: 0
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
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
  }

  navigator(addr) {
    Taro.navigateTo({
      url: `/pages/account/${addr}`
    })
  }

  joking() {
    Taro.showToast({
      title: '暂时无法变强 QAQ',
      icon: 'none',
      duration: 1500
    })
  }

  render() {
    return (
      <View className='wrapper'>
        <View className='profile' onClick={this.joking}>

          <View className='info'>
            <Image className='avatar' src={emptyAvatar}></Image>
            <View className='text'>
              <View className='name'>{'' || '登录'}</View>
              <View>一直未登录你怎么变强？</View>
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
