import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from '../../interfaces/thread'
import { IHotThreadItemRespond } from '../../interfaces/respond'
import { IAccount } from '../../interfaces/account'
import { initCredential } from '../../actions/account'

import './new.scss'

type PageStateProps = {
  auth: boolean,
  account: IAccount
}

type PageDispatchProps = {
  initCredential: () => void
}

type PageOwnProps = {}

type PageState = {
  newThreadList: IThreadMeta[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface New {
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
class New extends Component {
  config: Config = {
    navigationBarTitleText: '最新回复',
    enablePullDownRefresh: true
  }

  state = {
    newThreadList: Array<IThreadMeta>()
  }

  onShareAppMessage() {
    return {
      title: 'SteamCN 蒸汽动力 - 最新回复',
      path: 'pages/new/new'
    }
  }

  componentDidShow() {
    this.props.initCredential()
  }

  componentDidMount() {
    this.initNew()
  }

  onPullDownRefresh() {
    this.initNew()
  }

  initNew() {
    Taro.showLoading({
      title: '努力加载中 💦'
    })
    this.requestNewThreadList()
  }

  requestNewThreadList() {
    this.requestHot(433).then(res => {
      if (res) {
        this.setState({
          newThreadList: res
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
    const { newThreadList } = this.state
    if (newThreadList.length > 0) {
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
    const { newThreadList } = this.state
    const threadCards = newThreadList.map(item => {
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

export default New as ComponentClass<PageOwnProps, PageState>
