import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux';
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from '../../interfaces/thread'
import { fetchHome } from '../../actions/home'

import './hot.scss'

type PageStateProps = {
  hotThreadList: IThreadMeta[]
}

type PageDispatchProps = {
  fetchHome: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Hot {
  props: IProps;
}
@connect(({ home }) => ({
  hotThreadList: home.hotThreadList
}), (dispatch) => ({
  fetchHome() {
    dispatch(fetchHome())
  }
}))
class Hot extends Component {
  config: Config = {
    navigationBarTitleText: '热门主题',
    enablePullDownRefresh: true
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onPullDownRefresh() {
    this.props.fetchHome()
  }

  render() {
    const { hotThreadList } = this.props
    const threadCards = hotThreadList.map(item => {
      return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>
    })
    return (
      <View className='thread-list'>
        {threadCards}
      </View>
    )
  }
}

export default Hot as ComponentClass<PageOwnProps, PageState>
