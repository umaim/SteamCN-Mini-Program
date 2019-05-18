import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Picker } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'

import './login.scss'
import { initCredential, login, loginSuccess, loginError } from '../../actions/account'
import { IAccount } from 'src/interfaces/account';

type PageStateProps = {}

type PageDispatchProps = {
  initCredential: () => void,
  login: () => void,
  loginSuccess: (account: IAccount) => void,
  loginError: () => void
}

type PageOwnProps = {}

type PageState = {
  username: string,
  password: string,
  background: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Login {
  props: IProps;
}

@connect(() => ({}), (dispatch) => ({
  initCredential() {
    dispatch(initCredential())
  },
  login() {
    dispatch(login())
  },
  loginSuccess(account: IAccount) {
    dispatch(loginSuccess(account))
  },
  loginError() {
    dispatch(loginError())
  }
}))
class Login extends Component {
  config: Config = {
    navigationBarTitleText: '登录'
  }

  state = {
    username: '',
    password: '',
    background: '',
    questions: ['未设置', '母亲的名字', '爷爷的名字', '父亲出生的城市', '您其中一位老师的名字', '您个人计算机的型号', '您最喜欢的餐馆名称', '驾驶执照最后四位数字'],
    questionid: 0,
    answer: ''
  }

  componentDidShow() {
    this.setState({
      background: `cloud://steamcn.7374-steamcn/assets/img/login/background${Math.floor(Math.random() * 9)}.jpg`
    })
  }

  componentDidMount() { }

  handleUsernameChange(value: string) {
    this.setState({
      username: value
    })
    return value
  }

  handleUsernameBlur(value: string) {
    this.setState({
      username: value
    })
    return value
  }

  handlePasswordChange(value: string) {
    this.setState({
      password: value
    })
    return value
  }

  handleQuestionsChange(e) {
    this.setState({
      questionid: parseInt(e.detail.value)
    })
  }

  handleAnswerChange(value: string) {
    this.setState({
      answer: value
    })
    return value
  }

  handleAnswerBlur(value: string) {
    this.setState({
      answer: value
    })
    return value
  }

  login() {
    const {
      username,
      password,
      questionid,
      answer
    } = this.state

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
    } else if (questionid !== 0 && answer.trim() === '') {
      Taro.atMessage({
        message: `请输入安全问题答案😟`,
        type: 'error',
        duration: 1500
      })
      return
    }

    this.props.login()
    Taro.showLoading({
      title: '正在登录 💦'
    })

    Taro.request({
      url: 'https://vnext.steamcn.com/v1/auth/login',
      data: {
        username: username,
        password: password,
        loginfield: username,
        questionid: questionid,
        answer: answer
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
        this.props.loginSuccess(account)
        Taro.hideLoading()
        Taro.navigateBack()
      } else {
        const data = res.data
        this.props.loginError()
        Taro.hideLoading()
        Taro.atMessage({
          message: `登录失败😱，${data.message}`,
          type: 'error',
          duration: 2000
        })
      }
    }, () => {
      this.props.loginError()
      Taro.hideLoading()
      Taro.atMessage({
        message: '网络连接中断😭',
        type: 'error',
        duration: 2000
      })
    })
  }

  render() {
    const {
      username,
      password,
      background,
      questions,
      questionid,
      answer
    } = this.state
    return (
      <View className='wrapper'>
        <AtMessage />
        <View className='content'>
          <View className='background'>
            <Image
              className='backgroundImage'
              src={background}
              mode='aspectFill'
            ></Image>
          </View>
          <AtInput
            clear
            name='username'
            title='用户名：'
            type='text'
            placeholder='请输入用户名'
            value={username}
            onChange={this.handleUsernameChange.bind(this)}
            onBlur={this.handleUsernameBlur.bind(this)}
          />
          <AtInput
            clear
            name='password'
            title='密码：'
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={this.handlePasswordChange.bind(this)}
          />
          <Picker mode='selector' range={questions} value={questionid} onChange={this.handleQuestionsChange}>
            <View className='list-item'>
              <View className='list-item__label'>安全问题：</View>
              <View className='list-item__value'>{questions[questionid]}</View>
            </View>
          </Picker>
          {questionid !== 0 &&
            <AtInput
              clear
              name='answer'
              title='答案：'
              type='text'
              placeholder='安全问题答案'
              value={answer}
              onChange={this.handleAnswerChange.bind(this)}
              onBlur={this.handleAnswerBlur.bind(this)}
            />
          }
          <AtButton
            className='login'
            type='primary'
            size='normal'
            circle={true}
            onClick={this.login.bind(this)}
          >登录</AtButton>
        </View>
        <View className='footer'>蒸汽动力 · SteamCN.com</View>
      </View>
    )
  }
}

export default Login as ComponentClass<PageOwnProps, PageState>
