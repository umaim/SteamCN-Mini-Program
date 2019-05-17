import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './history.scss'
import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from 'src/interfaces/thread';
import { AtMessage } from 'taro-ui';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  historyThreadList: IThreadMeta[],
  history: IThreadMeta[],
  page: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface History {
  props: IProps;
}

class History extends Component {
  config: Config = {
    navigationBarTitleText: '历史记录',
    onReachBottomDistance: 300
  }

  state = {
    historyThreadList: Array<IThreadMeta>(),
    history: Array<IThreadMeta>(),
    page: 1
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'history'
    }).then((res) => {
      const history = res.data as unknown as Array<IThreadMeta>
      this.setState({
        history: history.reverse()
      }, () => {
        this.showMoreHistory()
      })
    }, () => {
      Taro.atMessage({
        message: '似乎没有留下你的足迹',
        type: 'info',
        duration: 1500
      })
    })
  }

  onReachBottom() {
    this.showMoreHistory()
  }

  showMoreHistory() {
    const {
      history,
      historyThreadList,
      page
    } = this.state
    if ((page - 1) * 10 >= history.length) {
      return
    } else if (page * 10 < history.length) {
      this.setState({
        historyThreadList: historyThreadList.concat(history.slice((page - 1) * 10, page * 10)),
        page: page + 1
      })
    } else {
      this.setState({
        historyThreadList: historyThreadList.concat(history.slice((page - 1) * 10, history.length)),
        page: page + 1
      })
    }
  }

  render() {
    const { historyThreadList } = this.state
    const threadCards = historyThreadList.map(item => {
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

export default History as ComponentClass<PageOwnProps, PageState>
