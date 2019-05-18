import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage, AtLoadMore } from 'taro-ui'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from '../../interfaces/thread'
import { IAccount } from '../../interfaces/account'
import { ISectionThreadListItem } from '../../interfaces/respond'
import { initCredential } from '../../actions/account'

import './sectionThreadList.scss'

type PageStateProps = {
  auth: boolean,
  account: IAccount
}

type PageDispatchProps = {
  initCredential: () => void
}

type PageOwnProps = {
  fid: number,
  title: string
}

type PageState = {
  sectionThreadList: IThreadMeta[],
  pageNum: number,
  loadMoreVisibility: boolean,
  loadMoreStatus: 'more' | 'loading' | 'noMore' | undefined
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SectionThreadList {
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
class SectionThreadList extends Component {
  config: Config = {
    navigationBarTitleText: '板块',
    enablePullDownRefresh: true,
    onReachBottomDistance: 300
  }

  state = {
    sectionThreadList: Array<IThreadMeta>(),
    pageNum: 1,
    loadMoreVisibility: false,
    loadMoreStatus: 'loading'
  }

  constructor(props) {
    super(props)
    this.setState({
      pageNum: 1
    })
    this.props.fid = this.$router.params.fid
    this.props.title = this.$router.params.title
  }

  componentDidMount() {
    const { pageNum } = this.state
    Taro.showLoading({
      title: '努力加载中 💦'
    })
    this.fetchSection(this.$router.params.fid, pageNum)
  }

  onPullDownRefresh() {
    const { fid } = this.props
    Taro.showLoading({
      title: '努力加载中 💦'
    })
    this.setState({
      sectionThreadList: Array<IThreadMeta>(),
      pageNum: 1
    }, () => {
      const { pageNum } = this.state
      this.fetchSection(fid, pageNum)
    })
  }

  onReachBottom() {
    const { pageNum } = this.state
    const { fid } = this.props
    this.setState({
      pageNum: pageNum + 1,
      loadMoreVisibility: true
    }, () => {
      const { pageNum } = this.state
      this.fetchSection(fid, pageNum)
    })
  }

  fetchSection(fid: number, page: number) {
    const { account } = this.props
    Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/thread?fid=${fid}&page=${page}&orderby=dateline`,
      data: {},
      header: {
        authorization: account.accessToken
      },
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
        const { sectionThreadList } = this.state
        this.setState({
          sectionThreadList: sectionThreadList.concat(threadList),
          loadMoreVisibility: false
        }, () => {
          Taro.hideLoading()
          Taro.stopPullDownRefresh()
        })
      } else {
        const { auth } = this.props
        Taro.hideLoading()
        Taro.stopPullDownRefresh()
        if (auth) {
          Taro.atMessage({
            message: `登录凭据过期，请重新登录🥀`,
            type: 'error',
            duration: 3000
          })
        } else {
          let message = res.data.message as string
          message = message.replace('</p></div><div><p>', '')
          Taro.atMessage({
            message: `无法查看本板块😱，${message}`,
            type: 'error',
            duration: 3000
          })
        }
      }
    }, () => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 2000
      })
    })
  }

  render() {
    const { sectionThreadList, loadMoreStatus, loadMoreVisibility } = this.state
    const threadCards = sectionThreadList.map(item => {
      return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>
    })
    return (
      <View className='thread-list'>
        <AtMessage />
        {threadCards}
        {loadMoreVisibility &&
          <AtLoadMore
            status={loadMoreStatus as "loading" | "more" | "noMore" | undefined}
            loadingText='捕获更多帖子中~🤩'
            noMoreText='下面真的没有啦~😳'
          />}
      </View>
    )
  }
}

export default SectionThreadList as ComponentClass<PageOwnProps, PageState>
