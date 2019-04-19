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
    fid: number
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
      fid: 0
    }]
  }

  toSectionThreadList(fid: number, title: string) {
    Taro.navigateTo({
      url: `/pages/section/sectionThreadList?fid=${fid}&title=${title}`
    })
  }

  render() {
    const sections = this.props.list.map(item => {
      return (
        <View key={item.fid} onClick={this.toSectionThreadList.bind(this, item.fid, item.title)}>
          <View className='section at-row at-row__align--center'>
            <View className='icon'>
              <Image mode='aspectFill' src={`./assets/f${item.fid}.png`}></Image>
            </View>
            <View className='info at-row'>
              <Text className='title'>{item.title}</Text>
              <Text className='desc'>{item.desc}</Text>
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
