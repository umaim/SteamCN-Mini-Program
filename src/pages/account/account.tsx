import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import './account.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Account {
  props: IProps;
}

class Account extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return(
      <Text>Account</Text>
    )
  }
}

export default Account as ComponentClass<PageOwnProps, PageState>
