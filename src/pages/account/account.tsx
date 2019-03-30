import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'

import emptyAvatar from '../../assets/images/empty_avatar_user.png'

import './account.scss'
import { AtList, AtListItem } from 'taro-ui';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Account {
  props: IProps;
}

class Account extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='wrapper'>
        <View className='profile'>

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
            />
            <AtListItem
              title='我的收藏'
              extraText='0个'
              iconInfo={{ value: 'star-2', color: '#ABB4BF' }}
            />
            <AtListItem
              title='浏览历史'
              extraText='0篇'
              iconInfo={{ value: 'clock', color: '#ABB4BF' }}
            />
          </AtList>
        </View>

        <View className='program-area'>
          <AtList>
            <AtListItem
              title='设置'
              iconInfo={{ value: 'settings', color: '#ABB4BF' }}
            />
            <AtListItem
              title='关于'
              iconInfo={{ value: 'lightning-bolt', color: '#ABB4BF' }}
            />
          </AtList>
        </View>
      </View>
    )
  }
}

export default Account as ComponentClass<PageOwnProps, PageState>
