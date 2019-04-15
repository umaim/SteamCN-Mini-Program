import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import './replyCard.scss'
import { IReply } from 'src/interfaces/thread'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  reply: IReply
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ReplyCard {
  props: IProps;
}

class ReplyCard extends Component {
  config: Config = {
    usingComponents: {
      wxparse: '../wxParse/wxParse'
    }
  }

  static defaultProps = {
    user: {
      username: '',
      uid: 0,
      avatar: ''
    },
    content: '',
    timestamp: 0,
    position: 0
  }

  render() {
    dayjs.locale('zh-cn')
    dayjs.extend(relativeTime)
    return (
      <View className='reply'>
        <View className='at-row at-row__justify--between'>
          <View className='user'>
            <AtAvatar circle image={this.props.reply.user.avatar} size='small'></AtAvatar>
            <View className='info'>
              <Text className='name'>{this.props.reply.user.username}</Text>
              <Text className='time'>{dayjs.unix(this.props.reply.timestamp).fromNow()}</Text>
            </View>
          </View>
          <Text className='floor'>{`#${this.props.reply.position}`}</Text>
        </View>
        <View className='content'>
          <wxparse data={this.props.reply.content} type='html' padding='5'></wxparse>
        </View>
      </View>
    )
  }
}

export default ReplyCard as ComponentClass<PageOwnProps, PageState>
