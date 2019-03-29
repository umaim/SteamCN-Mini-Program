import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import ThreadCard from '../../components/ThreadCard/threadCard'
import { IThreadMeta } from '../../interfaces/thread'
import { fetchHome } from '../../actions/home'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  bannerThreadList: IThreadMeta[]
  indexThreadList: IThreadMeta[]
}

type PageDispatchProps = {
  fetchHome: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ home }) => ({
  bannerThreadList: home.bannerThreadList,
  indexThreadList: home.indexThreadList
}), (dispatch) => ({
  fetchHome() {
    dispatch(fetchHome())
  }
}))
class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: 'SteamCN 蒸汽动力',
    enablePullDownRefresh: true
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    Taro.showLoading({ title: '正在加载' })
    this.props.fetchHome()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onPullDownRefresh() {
    this.props.fetchHome()
  }

  toThread(tid: number) {
    Taro.navigateTo({
      url: `/pages/thread/thread?tid=${tid}`
    })
  }

  render() {
    const { bannerThreadList, indexThreadList } = this.props
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

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
