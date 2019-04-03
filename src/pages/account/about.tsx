import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View, Image } from '@tarojs/components'

import logo from '../../assets/images/logo.jpg'
import qrcode from '../../assets/images/qrcode.jpg'
import github from '../../assets/images/github.png'
import steam from '../../assets/images/steam.png'
import steamcn from '../../assets/images/steamcn.png'

import './about.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface About {
  props: IProps;
}

class About extends Component {
  config: Config = {
    navigationBarTitleText: '关于'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='container'>
        <View className='item header'>
          <Image src={logo} className='logo'></Image>
          <View style='text-align: center;'>蒸汽动力 SteamCN.com</View>
          <View style='text-align: center;'>Version 0.2.1</View>
        </View>

        <View className='item'>
          <View className='title'>项目地址</View>
          <View className='i'>
            <View className='icon'>
              <Image src={github}></Image>
            </View>
            <View className='text'>
              <View>GayHub</View>
              <View>https://github.com/xPixv/SteamCN-Mini-Program</View>
            </View>
          </View>
        </View>

        <View className='item'>
          <View className='title'>反馈建议</View>

          <View className='i'>
            <View className='icon'>
              <Image src={steamcn}></Image>
            </View>
            <View className='text'>
              <View>SteamCN</View>
              <View>https://steamcn.com/t477292-1-1</View>
            </View>
          </View>

          <View className='i'>
            <View className='icon'>
              <Image src={steam}></Image>
            </View>
            <View className='text'>
              <View>Steam</View>
              <View>https://s.team/p/cdcc-dnbw</View>
            </View>
          </View>
        </View>

        <View className='item'>
          <View className='title'>小程序二维码</View>
          <Image src={qrcode} className='qrcode'></Image>
        </View>
        <View className='footer'>蒸汽动力 · SteamCN</View>
      </View>
    )
  }
}

export default About as ComponentClass<PageOwnProps, PageState>
