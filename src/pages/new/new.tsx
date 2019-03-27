import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import './new.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface New {
  props: IProps;
}

class New extends Component {
  config: Config = {
    navigationBarTitleText: '最新回复'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return(
      <Text>New</Text>
    )
  }
}

export default New as ComponentClass<PageOwnProps, PageState>
