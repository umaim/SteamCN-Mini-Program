import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components';

import './sectionGroupList.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {
  list: Array<{
    title: string,
    desc: string,
    fid: string
  }>
}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SectionGroupList {
  props: IProps;
}

class SectionGroupList extends Component {
  static defaultProps = {
    list: [{
      title: '',
      desc: '',
      fid: ''
    }]
  }

  render() {
    const sections = this.props.list.map(item => {
      return (
        <View className='item card' key={item.fid}>
          <View className='section'>
            <View className='icon'>
              <Image mode='aspectFill' src={`./assets/${item.fid}.png`}></Image>
            </View>
            <View className='info'>
              <View className='title'>{item.title}</View>
              <View className='others'>
                <Text className='desc'>{item.desc}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    })
    return (
      <View>{sections}</View>
    )
  }
}

export default SectionGroupList as ComponentClass<PageOwnProps, PageState>
