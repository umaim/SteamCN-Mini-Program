import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDivider, AtIcon, AtAvatar, AtMessage, AtLoadMore } from 'taro-ui'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

import { IThread, IReply } from '../../interfaces/thread'
import { IThreadRespond } from '../../interfaces/respond'
import { IAccount } from '../../interfaces/account'
import ReplyCard from '../../components/ReplyCard/replyCard'
import { contentCleaner } from '../../utils/cleaner'
import { initCredential } from '../../actions/account'

import './thread.scss'

type PageStateProps = {
  auth: boolean,
  account: IAccount
}

type PageDispatchProps = {
  initCredential: () => void
}

type PageOwnProps = {
  tid: number
}

type PageState = {
  pageNum: number,
  loadedPosition: number,
  thread: IThread,
  loadMoreVisibility: boolean,
  loadMoreStatus: 'more' | 'loading' | 'noMore' | undefined
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Thread {
  props: IProps;
}

@connect(({ account }) => ({
  auth: account.auth,
  account: account.account
}), (dispatch) => ({
  initCredential() {
    dispatch(initCredential())
  }
}))
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
    loadedPosition: 0,
    loadMoreVisibility: false,
    loadMoreStatus: 'loading',
    thread: {
      title: '',
      tid: 0,
      timestamp: 0,
      viewed: 0,
      replied: 0,
      content: '',
      maxPosition: 0,
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
        timestamp: 0,
        position: 0
      }]
    }
  }

  componentWillReceiveProps() { }

  componentDidMount() {
    Taro.showLoading({
      title: '努力加载中 💦'
    })
    this.props.tid = this.$router.params.tid as number
    this.fetchThread(this.props.tid, this.state.pageNum)
  }

  componentDidShow() {
    this.props.initCredential()
  }

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
    if (this.state.loadedPosition < this.state.thread.maxPosition) {
      this.setState({
        pageNum: this.state.pageNum + 1,
        loadMoreVisibility: true,
        loadMoreStatus: 'loading'
      }, () => {
        this.fetchThread(this.props.tid, this.state.pageNum)
      })
    } else {
      this.setState({
        loadMoreVisibility: true,
        loadMoreStatus: 'noMore'
      })
    }
  }

  fetchThread(tid: number, pageNum: number) {
    Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/thread/${tid}?page=${pageNum}`,
      data: {},
      header: {
        authorization: this.props.account.accessToken
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const threadData = res.data as IThreadRespond

        if (this.state.pageNum === 1) {
          const floors = threadData.floors
          const title = threadData.thread.subject
          const tid = parseInt(threadData.thread.tid)
          const timestamp = parseInt(threadData.thread.dateline)
          const viewed = threadData.thread.views
          const replied = threadData.thread.replies
          const content = contentCleaner(threadData.floors[0].message)
          const maxPosition = parseInt(threadData.thread.maxposition)
          const username = threadData.thread.author
          const uid = parseInt(threadData.thread.authorid)
          const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`

          console.log(content)

          let replies = Array<IReply>()
          for (let i = 1; i < floors.length; i++) {
            const floor = floors[i]
            const username = floor.author
            const uid = parseInt(floor.authorid)
            const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`
            const content = contentCleaner(floor.message)
            const timestamp = parseInt(floor.dbdateline)
            const position = parseInt(floor.position)
            replies.push({
              user: {
                username,
                uid,
                avatar
              },
              content,
              timestamp,
              position
            })
          }
          this.setState({
            loadedPosition: this.state.loadedPosition + floors.length,
            thread: {
              title,
              tid,
              timestamp,
              viewed,
              replied,
              content,
              maxPosition,
              author: {
                username,
                uid,
                avatar
              },
              replies
            }
          })
          Taro.hideLoading()
        } else {
          const floors = threadData.floors

          let replies = Array<IReply>()
          for (let i = 0; i < floors.length; i++) {
            const floor = floors[i]
            const username = floor.author
            const uid = parseInt(floor.authorid)
            const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`
            const content = contentCleaner(floor.message)
            const timestamp = parseInt(floor.dbdateline)
            const position = parseInt(floor.position)
            replies.push({
              user: {
                username,
                uid,
                avatar
              },
              content,
              timestamp,
              position
            })
          }
          this.setState({
            loadedPosition: this.state.loadedPosition + floors.length,
            loadMoreVisibility: false,
            loadMoreStatus: 'more',
            thread: {
              ...this.state.thread,
              replies: this.state.thread.replies.concat(replies)
            }
          })
        }
      } else {
        Taro.hideLoading()
        if (this.props.auth) {
          Taro.atMessage({
            message: `登录凭据过期，请重新登录🥀`,
            type: 'error',
            duration: 3000
          })
        } else {
          let message = res.data.message as string
          message = message.replace('</p></div><div><p>', '')
          Taro.atMessage({
            message: `无法查看帖子😱，${message}`,
            type: 'error',
            duration: 3000
          })
        }
      }
    }, () => {
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 2000
      })
    })
  }

  render() {
    dayjs.locale('zh-cn')
    dayjs.extend(relativeTime)
    const repliesArea = this.state.thread.replies.map(reply => {
      return (
        <View key={reply.position}>
          <ReplyCard reply={reply}></ReplyCard>
        </View>
      )
    })
    return (
      // <WxmlifyRichText html={this.state.thread.content}></WxmlifyRichText> // 组件报错，不可用
      // <WxparseRichText html={this.state.thread.content}></WxparseRichText> // 效果挺好
      // <RichText nodes={this.state.thread.content}></RichText> //最方便，没有任何排版，样式原始，没有表格，图片不自适应
      <View>
        <AtMessage />
        <View className='header'>
          <Text className='title'>{this.state.thread.title}</Text>
        </View>

        <View className='author'>
          <AtAvatar circle image={this.state.thread.author.avatar} size='small' className='avatar'></AtAvatar>
          <View className='info'>
            <Text className='name'>{this.state.thread.author.username}</Text>
            <View className='others'>
              <Text className='time'>{dayjs.unix(this.state.thread.timestamp as number).fromNow()}</Text>
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

        {this.state.loadMoreVisibility &&
          <AtLoadMore
            status={this.state.loadMoreStatus as "loading" | "more" | "noMore" | undefined}
            loadingText='捕获更多回复中~🤩'
            noMoreText='下面真的没有啦~😳'
          />}
      </View>
    )
  }
}

export default Thread as ComponentClass<PageOwnProps, PageState>
