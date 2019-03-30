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
    this.props.html = props.html
  }

  componentWillReceiveProps(nextProps: { html: string; }) {
    this.setState({
      html: nextProps.html
    }, () => {
      const article = this.state.html
      WxParse.wxParse('article', 'html', article, this.$scope, 15)
    })
  }

  componentDidMount() {
    const article = this.props.html
    WxParse.wxParse('article', 'html', article, this.$scope, 15)
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
