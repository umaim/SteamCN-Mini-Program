import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import { IThreadMeta } from '../../interfaces/thread'
import { ISectionThreadListItem } from '../../interfaces/respond'
import ThreadCard from '../../components/ThreadCard/threadCard'

import './sectionThreadList.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  fid: number,
  title: string
}

type PageState = {
  sectionThreadList: IThreadMeta[],
  pageNum: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SectionThreadList {
  props: IProps;
}

class SectionThreadList extends Component {
  config: Config = {
    navigationBarTitleText: '板块',
    enablePullDownRefresh: true,
    onReachBottomDistance: 150
  }

  static defaultProps = {
    fid: 0,
    title: ''
  }

  state = {
    sectionThreadList: Array<IThreadMeta>(),
    pageNum: 1
  }

  constructor(props) {
    super(props)
    this.state.pageNum = 1
    this.props.fid = this.$router.params.fid
    this.props.title = this.$router.params.title
  }

  componentDidMount() {
    Taro.showLoading({
      title: '正在加载'
    })
    this.fetchSection(this.$router.params.fid, this.state.pageNum)
  }

  onPullDownRefresh() {
    this.setState({
      sectionThreadList: Array<IThreadMeta>(),
      pageNum: 1
    }, () => {
      this.fetchSection(this.props.fid, this.state.pageNum)
    })
  }

  onReachBottom() {
    console.log('Reach Bottom')
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => {
      Taro.showLoading({
        title: '正在加载'
      })
      this.fetchSection(this.props.fid, this.state.pageNum)
    })
  }

  fetchSection(fid: number, page: number) {
    Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/thread?fid=${fid}&page=${page}&orderby=dateline`,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const threadListRespond = res.data as Array<ISectionThreadListItem>

        let threadList = Array<IThreadMeta>()
        for (let i = 0; i < threadListRespond.length; i++) {
          const sectionThreadListItem = threadListRespond[i]

          // 跳过置顶帖
          if (sectionThreadListItem.displayorder !== '0') {
            continue
          }

          const title = sectionThreadListItem.subject
          const tid = parseInt(sectionThreadListItem.tid)
          const url = `https://steamcn.com/t${tid}-1-1`
          const image = sectionThreadListItem.coverpath
          const section = sectionThreadListItem.forumname
          const timestamp = parseInt(sectionThreadListItem.dbdateline)
          const username = sectionThreadListItem.author
          const uid = parseInt(sectionThreadListItem.authorid)
          const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`
          const viewed = sectionThreadListItem.views
          const replied = parseInt(sectionThreadListItem.replies)

          threadList.push({
            title,
            tid,
            url,
            image,
            section,
            timestamp,
            author: {
              username,
              uid,
              avatar
            },
            stats: {
              viewed,
              replied
            }
          })
        }
        this.setState({
          sectionThreadList: this.state.sectionThreadList.concat(threadList)
        }, () => {
          Taro.hideLoading()
          Taro.stopPullDownRefresh()
          Taro.atMessage({
            message: '刷新成功😀',
            type: 'success',
            duration: 1500
          })
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

  render() {
    const { sectionThreadList } = this.state
    const threadCards = sectionThreadList.map(item => {
      return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>
    })
    return (
      <View className='thread-list'>
        <AtMessage />
        {threadCards}
      </View>
    )
  }
}

export default SectionThreadList as ComponentClass<PageOwnProps, PageState>
