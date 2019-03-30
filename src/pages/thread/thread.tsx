import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import { AtDivider, AtIcon, AtAvatar } from 'taro-ui'

import { IThread } from 'src/interfaces/thread';
import WxparseRichText from '../../components/WxParseRichText/wxParseRichText'
import ReplyCard from '../../components/ReplyCard/replyCard'
import { threadParser } from '../../utils/parser'

import './thread.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  thread: IThread
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Thread {
  props: IProps;
}

class Thread extends Component {
  config: Config = {
    navigationBarTitleText: '主题'
  }

  state = {
    thread: {
      title: '',
      tid: 0,
      time: '',
      viewed: 0,
      replied: 0,
      content: '',
      author: {
        username: '',
        uid: 0,
        avatar: ''
      },
      replies: [{
        user: {
          username: '',
          uid: 0,
          avatar: ''
        },
        content: '',
        time: '',
        floor: 0
      }]
    }
  }

  componentWillReceiveProps() { }

  componentDidMount() {
    Taro.showLoading({
      title: '正在加载'
    })
    this.fetchThread(this.$router.params.tid)
  }

  componentDidShow() { }

  componentDidHide() { }

  componentWillUnmount() { }

  fetchThread(tid: number) {
    Taro.request({
      url: `https://steamcn.com/forum.php?mod=viewthread&tid=${tid}&mobile=1`,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'html',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const html = res.data
        const data = threadParser(html)
        this.setState({
          thread: data
        })
        console.log(data)
        Taro.hideLoading()
      } else {

      }
    })
  }

  render() {
    const repliesArea = this.state.thread.replies.map(reply => {
      return (
        <View key={reply.floor}>
          <ReplyCard reply={reply}></ReplyCard>
        </View>
      )
    })
    return (
      // <WxmlifyRichText html={this.state.thread.content}></WxmlifyRichText> // 组件报错，不可用
      // <WxparseRichText html={this.state.thread.content}></WxparseRichText> // 效果挺好
      // <RichText nodes={this.state.thread.content}></RichText> //最方便，没有任何排版，样式原始，没有表格，图片不自适应
      <View>
        <View className='header'>
          <Text className='title'>{this.state.thread.title}</Text>
        </View>

        <View className='user'>
          <AtAvatar circle image={this.state.thread.author.avatar} size='small'></AtAvatar>
          <View className='info'>
            <Text className='name'>{this.state.thread.author.username}</Text>
            <View className='others'>
              <Text className='time'>{this.state.thread.time}</Text>
              <View>阅读 {this.state.thread.viewed} · 回复 {this.state.thread.replied}</View>
            </View>
          </View>
        </View>

        <View className='content'>
          <WxparseRichText html={this.state.thread.content}></WxparseRichText>
        </View>

        <AtDivider>
          <AtIcon value='check-circle'></AtIcon>
        </AtDivider>

        {repliesArea}
      </View>
    )
  }
}

export default Thread as ComponentClass<PageOwnProps, PageState>
