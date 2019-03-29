import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';

import Wxmlify from './wxmlify/wxmlify'
//var Wxmlify = require('./wxmlify/wxmlify')

import './wxmlifyRichText.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  html: string
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface WxmlifyRichText {
  props: IProps;
}

class WxmlifyRichText extends Component {
  static defaultProps = {
    html: ''
  }

  componentWillMount() {
    const html = this.props.html
    console.log(html)
    var wxmlify = new Wxmlify(html, this.$scope, {
      dataKey: 'nodes',
      onImageTap: (e) => {
        console.log(e)
      }
    })
    console.log(wxmlify.getFullNodes())
  }

  render() {
    return <View>
      <import src='./wxmlify/wxmlify.wxml' />
      <template is='wxmlify' data={nodes}></template>
    </View>
  }
}

export default WxmlifyRichText as ComponentClass<PageOwnProps, PageState>
