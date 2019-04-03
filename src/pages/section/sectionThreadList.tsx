import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { IThreadMeta } from '../../interfaces/thread'
import ThreadCard from '../../components/ThreadCard/threadCard'
import { sectionParser } from '../../utils/parser'

import './sectionThreadList.scss'
import { AtMessage } from 'taro-ui';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  fid: string,
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
    fid: '',
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

  componentWillReceiveProps(nextProps: { fid: string, title: string }) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    Taro.showLoading({
      title: '正在加载'
    })
    this.fetchSection(this.$router.params.fid, this.state.pageNum)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

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

  fetchSection(fid: string, page: number) {
    Taro.request({
      url: `https://steamcn.com/${fid}-${page}?mobile=no&orderby=dateline`,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'html',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const html = res.data as string

        if (html.indexOf('您必须注册并登录后才能访问此版块') > -1) {
          Taro.hideLoading()
          Taro.showToast({
            title: '本板块需要登录才可查看😦',
            icon: 'none',
            duration: 3500
          })
        } else {
          const threadList = sectionParser(html, this.props.title)
          this.setState({
            sectionThreadList: this.state.sectionThreadList.concat(threadList)
          })
          Taro.hideLoading()
          Taro.stopPullDownRefresh()
          Taro.atMessage({
            message: '刷新成功😀',
            type: 'success',
            duration: 1500
          })
        }
      } else {
        Taro.atMessage({
          message: '刷新失败😱',
          type: 'error',
          duration: 1500
        })
      }
    }, () => {
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 1500
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
