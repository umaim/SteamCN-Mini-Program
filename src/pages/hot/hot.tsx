import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IAccount } from '../../interfaces/account'
import { IThreadMeta } from '../../interfaces/thread'
import { IHotThreadItemRespond } from '../../interfaces/respond'
import { initCredential } from '../../actions/account'

import './hot.scss'

type PageStateProps = {
  auth: boolean,
  account: IAccount
}

type PageDispatchProps = {
  initCredential: () => void
}

type PageOwnProps = {}

type PageState = {
  hotThreadList: IThreadMeta[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Hot {
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
class Hot extends Component {
  config: Config = {
    navigationBarTitleText: '热门主题',
    enablePullDownRefresh: true
  }

  state = {
    hotThreadList: Array<IThreadMeta>()
  }

  onShareAppMessage() {
    return {
      title: 'SteamCN 蒸汽动力 - 热门主题',
      path: 'pages/hot/hot'
    }
  }

  componentDidShow() {
    this.props.initCredential()
  }

  componentDidMount() {
    this.initHot()
  }

  onPullDownRefresh() {
    this.initHot()
  }

  initHot() {
    Taro.showLoading({
      title: '努力加载中 💦'
    })
    this.requestHotThreadList()
  }

  requestHotThreadList() {
    this.requestHot(434).then(res => {
      if (res) {
        this.setState({
          hotThreadList: res
        }, this.isFinish)
      }
    })
  }

  requestHot(bid: number) {
    const { account } = this.props
    return Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/hot/${bid}`,
      data: {},
      header: {
        authorization: account.accessToken
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        console.log(res.data)
        const itemlist = res.data.itemlist as Array<IHotThreadItemRespond>
        let thraedList = Array<IThreadMeta>()
        itemlist.forEach(item => {
          const title = item.title
          const tid = parseInt(item.id)
          const url = `https://steamcn.com/t${tid}-1-1`
          const image = item.coverpath
          const section = item.fields.forumname
          const timestamp = parseInt(item.fields.dateline)
          const username = item.fields.author
          const uid = parseInt(item.fields.authorid)
          const avatar = item.fields.avatar_middle
          const viewed = parseInt(item.fields.views)
          const replied = parseInt(item.fields.replies)
          thraedList.push({
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
        })
        return thraedList
      } else {
        Taro.atMessage({
          message: `刷新失败😱`,
          type: 'error',
          duration: 2000
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

  isFinish() {
    const { hotThreadList } = this.state
    if (hotThreadList.length > 0) {
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
      Taro.atMessage({
        message: `刷新成功😁`,
        type: 'success',
        duration: 1500
      })
    }
  }

  render() {
    const { hotThreadList } = this.state
    const threadCards = hotThreadList.map(item => {
      return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>
    })
    return (
      <View>
        <AtMessage />
        <View className='thread-list'>
          {threadCards}
        </View>
      </View>
    )
  }
}

export default Hot as ComponentClass<PageOwnProps, PageState>
