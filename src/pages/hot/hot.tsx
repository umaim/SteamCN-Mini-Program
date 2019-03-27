import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import './hot.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Hot {
  props: IProps;
}

class Hot extends Component {
  config: Config = {
    navigationBarTitleText: '热门主题'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return(
      <Text>Hot</Text>
    )
  }
}

export default Hot as ComponentClass<PageOwnProps, PageState>
