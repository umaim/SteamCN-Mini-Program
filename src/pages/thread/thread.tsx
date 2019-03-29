import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'

import { IThreadMeta, IThread } from 'src/interfaces/thread';
import WxmlifyRichText from '../../components/WxmlifyRichText/wxmlifyRichText'
import WxparseRichText from '../../components/WxParseRichText/wxParseRichText'
import './thread.scss'
import { View, RichText } from '@tarojs/components';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  threadMeta: IThreadMeta
}

type PageState = {
  thread: IThread
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Thread {
  props: IProps;
}

class Thread extends Component {
  config: Config = {
    navigationBarTitleText: '主题'
  }

  state = {
    thread: {
      meta: {} as IThreadMeta,
      content: '',
      replies: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      //<WxmlifyRichText html='<h1>Thread Test</h1>'></WxmlifyRichText>
      // <WxparseRichText html='<h1>Thread Test</h1>'></WxparseRichText>
      // <RichText nodes='<h1>Thread Test</h1>'></RichText>
      <View>

      </View>
    )
  }
}

export default Thread as ComponentClass<PageOwnProps, PageState>
