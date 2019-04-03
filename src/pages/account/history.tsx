import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'

import './history.scss'
import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from 'src/interfaces/thread';
import { AtMessage } from 'taro-ui';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  historyThreadList: IThreadMeta[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface History {
  props: IProps;
}

class History extends Component {
  config: Config = {
    navigationBarTitleText: '历史记录'
  }

  state = {
    historyThreadList: Array<IThreadMeta>()
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'history'
    }).then((res) => {
      this.setState({
        historyThreadList: res.data
      })
    }, () => {
      Taro.atMessage({
        message: '似乎没有留下你的足迹',
        type: 'info',
        duration: 1500
      })
    })
  }

  render() {
    const { historyThreadList } = this.state
    const threadCards = historyThreadList.reverse().map(item => {
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
