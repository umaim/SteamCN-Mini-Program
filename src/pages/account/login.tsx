import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'

import './login.scss'
import { IAccount } from 'src/interfaces/account';

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  username: string,
  password: string,
  background: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Setting {
  props: IProps;
}

class Setting extends Component {
  config: Config = {
    navigationBarTitleText: '登录'
  }

  state = {
    username: '',
    password: '',
    background: ''
  }

  componentDidShow() {
    this.setState({
      background: `cloud://steamcn.7374-steamcn/assets/img/background${Math.floor(Math.random() * 9)}.jpg`
    })
  }

  componentDidMount() { }

  handleUsernameChange(value: string) {
    this.setState({
      username: value
    }, () => {
      console.log(this.state)
    })
  }

  handlePasswordChange(value: string) {
    this.setState({
      password: value
    }, () => {
      console.log(this.state)
    })
  }

  login() {
    const username = this.state.username
    const password = this.state.password

    if (username.length === 0) {
      Taro.atMessage({
        message: `请输入用户名😟`,
        type: 'error',
        duration: 1500
      })
      return
    } else if (password.length === 0) {
      Taro.atMessage({
        message: `请输入密码😟`,
        type: 'error',
        duration: 1500
      })
      return
    }

    Taro.request({
      url: 'https://vnext.steamcn.com/v1/auth/login',
      data: {
        username: username,
        password: password,
        loginfield: username
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text'
    }).then(res => {
      if (res.statusCode === 200) {
        const account: IAccount = res.data
        console.log(account)

        Taro.setStorageSync('auth', true)
        Taro.setStorageSync('account', account)
        Taro.navigateBack()

      } else {
        const data = res.data
        Taro.atMessage({
          message: `登录失败😱，${data.message}`,
          type: 'error',
          duration: 2000
        })
      }
    }, () => {
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 2000
      })
    })
  }

  render() {
    return (
      <View className='wrapper'>
        <AtMessage />
        <View className='background'>
          <Image
            className='backgroundImage'
            src={this.state.background}
            mode='aspectFill'
          ></Image>
        </View>
        <AtInput
          clear
          name='username'
          title='用户名：'
          type='text'
          placeholder='请输入用户名'
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />
        <AtInput
          clear
          name='password'
          title='密码：'
          type='password'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
        />
        <AtButton
          className='login'
          type='primary'
          size='normal'
          circle={true}
          onClick={this.login.bind(this)}
        >登录</AtButton>

        <View className='footer'>蒸汽动力 · SteamCN.com</View>
      </View>
    )
  }
}

export default Setting as ComponentClass<PageOwnProps, PageState>
