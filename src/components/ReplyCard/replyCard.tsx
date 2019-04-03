import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';
import { AtAvatar, AtDivider } from 'taro-ui'

import './replyCard.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  reply: {
    user: {
      username: string;
      uid: number;
      avatar: string;
    };
    content: string;
    time: string;
    floor: number;
  }
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
    time: '',
    floor: 0
  }

  render() {
    return (
      <View className='reply'>
        <View className='at-row at-row__justify--between'>
          <View className='user'>
            <AtAvatar circle image={this.props.reply.user.avatar} size='small'></AtAvatar>
            <View className='info'>
              <Text className='name'>{this.props.reply.user.username}</Text>
              <Text className='time'>{this.props.reply.time}</Text>
            </View>
          </View>
          <Text className='floor'>{`#${this.props.reply.floor}`}</Text>
        </View>
        <View className='content'>
          <wxparse data={this.props.reply.content} type='html' padding='5'></wxparse>
        </View>
      </View>
    )
  }
}

export default ReplyCard as ComponentClass<PageOwnProps, PageState>
