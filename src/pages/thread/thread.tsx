import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import { AtDivider, AtIcon, AtAvatar } from 'taro-ui'

import { IThread } from 'src/interfaces/thread';
import ReplyCard from '../../components/ReplyCard/replyCard'
import { threadParser, replyParser } from '../../utils/parser'

import './thread.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  tid: number
}

type PageState = {
  pageNum: number,
  thread: IThread
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Thread {
  props: IProps;
}

class Thread extends Component {
  config: Config = {
    navigationBarTitleText: '主题',
    usingComponents: {
      wxparse: '../../components/wxParse/wxParse'
    },
    onReachBottomDistance: 300
  }

  state = {
    pageNum: 1,
    thread: {
      title: '',
      tid: 0,
      time: '',
      viewed: 0,
      replied: 0,
      content: '',
      maxPage: 0,
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
        floor: 0,
        hash: 0
      }]
    }
  }

  componentWillReceiveProps() { }

  componentDidMount() {
    Taro.showLoading({
      title: '正在加载'
    })
    this.props.tid = this.$router.params.tid as number
    this.fetchThread(this.props.tid, this.state.pageNum)
  }

  componentDidShow() { }

  componentDidHide() { }

  componentWillUnmount() { }

  onShareAppMessage() {
    return {
      title: `${this.state.thread.title} - SteamCN 蒸汽动力`,
      path: `/pages/thread/thread?tid=${this.$router.params.tid}`
    }
  }

  onReachBottom() {
    console.log('Reach Bottom')
    if (this.state.pageNum < this.state.thread.maxPage) {
      this.setState({
        pageNum: this.state.pageNum + 1
      }, () => {
        this.fetchThread(this.props.tid, this.state.pageNum)
      })
    }
  }

  fetchThread(tid: number, pageNum: number) {
    Taro.request({
      url: `https://steamcn.com/forum.php?mod=viewthread&tid=${tid}&page=${pageNum}&mobile=1`,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'html',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const html = res.data as string

        if (html.indexOf('您必须注册并登录后才能访问此版块') > -1
          || html.indexOf('抱歉，本帖要求阅读权限高于') > -1
          || html.indexOf('您必须同时满足以下条件才能访问此版块') > -1) {
          Taro.hideLoading()
          Taro.showToast({
            title: '本帖需要登录才可查看😦',
            icon: 'none',
            duration: 10000
          })
        } else {
          if (this.state.pageNum === 1) {
            const thread = threadParser(html)
            console.log(thread)
            this.setState({
              thread: thread
            })
            Taro.hideLoading()
          } else {
            const replies = replyParser(html)
            console.log(replies)
            this.setState({
              thread: {
                ...this.state.thread,
                replies: this.state.thread.replies.concat(replies)
              }
            })
          }
        }
      } else {
        Taro.atMessage({
          message: '获取帖子失败😱',
          type: 'error',
          duration: 1500
        })
      }
    }, () => {
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 1500
      })
    })
  }

  render() {
    const repliesArea = this.state.thread.replies.map(reply => {
      return (
        <View key={reply.hash}>
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

        <View className='author'>
          <AtAvatar circle image={this.state.thread.author.avatar} size='small' className='avatar'></AtAvatar>
          <View className='info'>
            <Text className='name'>{this.state.thread.author.username}</Text>
            <View className='others'>
              <Text className='time'>{this.state.thread.time}</Text>
              <Text>阅读 {this.state.thread.viewed} · 回复 {this.state.thread.replied}</Text>
            </View>
          </View>
        </View>

        <View className='content'>
          <wxparse data={this.state.thread.content} type='html' padding='15'></wxparse>
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
