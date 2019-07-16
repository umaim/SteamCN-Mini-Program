import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View, Image, Picker } from '@tarojs/components';
import { AtInput, AtButton, AtMessage, AtNavBar } from 'taro-ui';

import './login.scss';
import {
  initCredential,
  login,
  loginSuccess,
  loginError
} from '../../actions/account';
import { IAccount } from '../../interfaces/account';

interface Props {
  initCredential: () => void;
  login: () => void;
  loginSuccess: (account: IAccount) => void;
  loginError: () => void;
}

interface State {
  username: string;
  password: string;
  background: string;
  questions: string[];
  questionid: number;
  answer: string;
  statusBarHeight: number;
}

@connect(
  () => ({}),
  dispatch => ({
    initCredential() {
      dispatch(initCredential());
    },
    login() {
      dispatch(login());
    },
    loginSuccess(account: IAccount) {
      dispatch(loginSuccess(account));
    },
    loginError() {
      dispatch(loginError());
    }
  })
)
class Login extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '登录'
  };

  public state = {
    username: '',
    password: '',
    background: '',
    questions: [
      '未设置',
      '母亲的名字',
      '爷爷的名字',
      '父亲出生的城市',
      '您其中一位老师的名字',
      '您个人计算机的型号',
      '您最喜欢的餐馆名称',
      '驾驶执照最后四位数字'
    ],
    questionid: 0,
    answer: '',
    statusBarHeight: 20
  };

  public constructor(props: Props | undefined) {
    super(props);
    this.setState({
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight
    });
  }

  public componentDidShow(): void {
    this.setState({
      background: `cloud://steamcn.7374-steamcn/assets/img/login/background${Math.floor(
        Math.random() * 9
      )}.jpg`
    });
  }

  private handleUsernameChange(value: string): string {
    this.setState({
      username: value
    });
    return value;
  }

  private handlePasswordChange(value: string): string {
    this.setState({
      password: value
    });
    return value;
  }

  private handleQuestionsChange(e: { detail: { value: string } }): void {
    this.setState({
      questionid: parseInt(e.detail.value)
    });
  }

  private handleAnswerChange(value: string): string {
    this.setState({
      answer: value
    });
    return value;
  }

  private handleAnswerBlur(value: string): string {
    this.setState({
      answer: value
    });
    return value;
  }

  private login(): void {
    const { username, password, questionid, answer } = this.state;

    if (username.length === 0) {
      Taro.atMessage({
        message: `请输入用户名😟`,
        type: 'error',
        duration: 1500
      });
      return;
    } else if (password.length === 0) {
      Taro.atMessage({
        message: `请输入密码😟`,
        type: 'error',
        duration: 1500
      });
      return;
    } else if (questionid !== 0 && answer.trim() === '') {
      Taro.atMessage({
        message: `请输入安全问题答案😟`,
        type: 'error',
        duration: 1500
      });
      return;
    }

    this.props.login();
    Taro.showLoading({
      title: '正在登录 💦'
    });

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
    }).then(
      (res): void => {
        if (res.statusCode === 200) {
          const account: IAccount = res.data;
          this.props.loginSuccess(account);
          Taro.hideLoading();
          Taro.navigateBack();
        } else {
          const data = res.data;
          this.props.loginError();
          Taro.hideLoading();
          Taro.atMessage({
            message: `登录失败😱，${data.message}`,
            type: 'error',
            duration: 2000
          });
        }
      },
      (): void => {
        this.props.loginError();
        Taro.hideLoading();
        Taro.atMessage({
          message: '网络连接中断😭',
          type: 'error',
          duration: 2000
        });
      }
    );
  }

  public render(): JSX.Element {
    const {
      username,
      password,
      background,
      questions,
      questionid,
      answer,
      statusBarHeight
    } = this.state;
    return (
      <View>
        <AtMessage />

        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title="登录"
          color="#FFF"
          leftIconType="chevron-left"
          onClickLeftIcon={(): void => {
            Taro.navigateBack({ delta: 1 });
          }}
          border={false}
        />

        <View className="wrapper">
          <View className="content">
            <View className="background">
              <Image
                className="backgroundImage"
                src={background}
                mode="aspectFill"
              ></Image>
            </View>
            <AtInput
              clear
              name="username"
              title="用户名："
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={this.handleUsernameChange.bind(this)}
            />
            <AtInput
              clear
              name="password"
              title="密码："
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={this.handlePasswordChange.bind(this)}
            />
            <Picker
              mode="selector"
              range={questions}
              value={questionid}
              onChange={this.handleQuestionsChange}
            >
              <View className="list-item">
                <View className="list-item__label">安全问题：</View>
                <View className="list-item__value">
                  {questions[questionid]}
                </View>
              </View>
            </Picker>
            {questionid !== 0 && (
              <AtInput
                clear
                name="answer"
                title="答案："
                type="text"
                placeholder="安全问题答案"
                value={answer}
                onChange={this.handleAnswerChange.bind(this)}
                onBlur={this.handleAnswerBlur.bind(this)}
              />
            )}
            <AtButton
              className="login-button"
              type="primary"
              size="normal"
              circle
              onClick={this.login.bind(this)}
            >
              登录
            </AtButton>
          </View>
          <View className="footer">蒸汽动力 · SteamCN.com</View>
        </View>
      </View>
    );
  }
}

export default Login as Taro.ComponentClass;
