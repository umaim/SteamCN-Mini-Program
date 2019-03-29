import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ComponentClass } from 'react';

var WxParse = require('./wxParse/wxParse');

import './wxparseRichText.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  html: string
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface WxparseRichText {
  props: IProps;
}

class WxparseRichText extends Component {
  static defaultProps = {
    html: ''
  }
  state = {
    html: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      html: props.html
    }
  }

  componentWillReceiveProps() { }

  componentWillUpdate() { }

  componentDidUpdate() { }

  componentWillMount() {
    console.log('componentWillMount::', this.state.html)
    const article = this.state.html
    WxParse.wxParse('article', 'html', article, this.$scope, 0)
  }

  componentDidMount() { }

  componentWillUnmout() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    return (
      <View>
        <import src='./wxParse/wxParse.wxml' />
        <template is='wxParse' data='{{wxParseData:article.nodes}}' />
      </View>
    )
  }
}

export default WxparseRichText as ComponentClass<PageOwnProps, PageState>
