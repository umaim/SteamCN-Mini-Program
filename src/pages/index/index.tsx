import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Text, Image } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from '../../interfaces/thread'
import { HotThreadItem } from '../../interfaces/respond'

import './index.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  bannerThreadList: IThreadMeta[]
  indexThreadList: IThreadMeta[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'SteamCN 蒸汽动力',
    enablePullDownRefresh: true
  }

  state = {
    bannerThreadList: Array<IThreadMeta>(),
    indexThreadList: Array<IThreadMeta>()
  }

  componentDidMount() {
    this.initHome()
  }

  onPullDownRefresh() {
    this.initHome()
  }

  initHome() {
    this.requestBannerThreadList()
    this.requestIndexThreadList()
  }

  requestBannerThreadList() {
    this.requestHot(431).then(res => {
      if (res) {
        this.setState({
          bannerThreadList: res
        }, this.isFinish)
      }
    })
  }

  requestIndexThreadList() {
    this.requestHot(432).then(res => {
      if (res) {
        this.setState({
          indexThreadList: res
        }, this.isFinish)
      }
    })
  }

  requestHot(bid: number) {
    return Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/hot/${bid}`,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        console.log(res.data)
        const itemlist = res.data.itemlist as Array<HotThreadItem>
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
    if (this.state.bannerThreadList.length > 0
      && this.state.indexThreadList.length > 0) {
      Taro.stopPullDownRefresh()
      Taro.atMessage({
        message: `刷新成功😁`,
        type: 'success',
        duration: 1500
      })
    }
  }

  onShareAppMessage() {
    return {
      title: 'SteamCN 蒸汽动力',
      path: '/pages/index/index'
    }
  }

  toThread(tid: number) {
    Taro.navigateTo({
      url: `/pages/thread/thread?tid=${tid}`
    })
  }

  render() {
    const { bannerThreadList, indexThreadList } = this.state
    const swiperItems = bannerThreadList.map(item => {
      return <SwiperItem key={item.tid} onClick={this.toThread.bind(this, item.tid)}>
        <Image src={item.image || ''} className='swiper-item-image' mode='scaleToFill'></Image>
        <Text className='swiper-item-title'>{item.title}</Text>
      </SwiperItem>
    })
    const threadCards = indexThreadList.map(item => {
      return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>
    })

    return (
      <View className='index'>
        <AtMessage />
        <Swiper
          className='index-swiper'
          autoplay
          interval={2500}
          duration={500}
          circular
        >
          {swiperItems}
        </Swiper>
        <View className='thread-list'>
          {threadCards}
        </View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
