import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ComponentClass } from 'react';

import './WxparseRichText.scss'

var WxParse = require('./wxParse/wxParse');

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface WxparseRichText {
  props: IProps;
}

class WxparseRichText extends Component {
  state = {
    html: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      html: ''
    }
  }

  componentWillReceiveProps(nextProps: { html: string; }) {
    this.setState({
      html: nextProps.html
    })
  }

  componentDidUpdate() {
    if(this.state.html) {
      const article = this.state.html
      WxParse.wxParse('article', 'html', article, this.$scope, 15)
    }
  }

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
