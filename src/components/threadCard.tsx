import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';

import { IThreadMeta } from '../interfaces/thread'

import './threadCard.scss'
import see from '../assets/images/components/see.png'
import reply from '../assets/images/components/reply.png'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  threadMeta: IThreadMeta
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ThreadCard {
  props: IProps;
}

class ThreadCard extends Component {
  static defaultProps = {
    threadMeta: {
      title: '',
      tid: 0,
      url: '',
      section: '',
      author: { username: '' },
      stats: {
        viewed: 0,
        replied: 0
      }
    }
  }
  render() {
    const { title, url, section, author, stats } = this.props.threadMeta
    return <View className='item card'>
      <View className='header'>
        <View className='author'>
          {author.avatar && <Image src={author.avatar} mode='aspectFill'></Image>}
          <Text>{author.username}</Text>
        </View>
        <Text className='type'>{section}</Text>
      </View>
      <View className='content'>
        <View className='text'>
          <Text className='title'>{title}</Text>
        </View>
      </View>
      <View className='footer'>
        <View className='label'>
          <Image src={see}></Image>
          <Text>{stats.viewed}</Text>
        </View>
        <View className='label'>
          <Image src={reply}></Image>
          <Text>{stats.replied}</Text>
        </View>
      </View>
    </View>
  }
}

export default ThreadCard as ComponentClass<PageOwnProps, PageState>
