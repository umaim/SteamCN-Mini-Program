import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text } from '@tarojs/components'

import './section.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Section {
  props: IProps;
}

class Section extends Component {
  config: Config = {
    navigationBarTitleText: '板块'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return(
      <Text>Section</Text>
    )
  }
}

export default Section as ComponentClass<PageOwnProps, PageState>
