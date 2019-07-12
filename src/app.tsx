import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

import Index from './pages/index';

import configStore from './store';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  public config: Config = {
    window: {
      navigationStyle: 'custom',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#57bae8',
      navigationBarTitleText: 'SteamCN 蒸汽动力',
      navigationBarTextStyle: 'white'
    },
    pages: [
      'pages/index/index',
      'pages/new/new',
      'pages/hot/hot',
      'pages/section/section',
      'pages/section/sectionThreadList',
      'pages/account/account',
      'pages/account/about',
      'pages/account/setting',
      'pages/account/history',
      'pages/account/login',
      'pages/thread/thread'
    ],
    tabBar: {
      custom: false,
      color: '#abb4bf',
      selectedColor: '#57bae8',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './assets/images/tab/home.png',
          selectedIconPath: './assets/images/tab/home_selected.png'
        },
        {
          pagePath: 'pages/new/new',
          text: '最新',
          iconPath: './assets/images/tab/new.png',
          selectedIconPath: './assets/images/tab/new_selected.png'
        },
        {
          pagePath: 'pages/hot/hot',
          text: '热门',
          iconPath: './assets/images/tab/hot.png',
          selectedIconPath: './assets/images/tab/hot_selected.png'
        },
        {
          pagePath: 'pages/section/section',
          text: '板块',
          iconPath: './assets/images/tab/section.png',
          selectedIconPath: './assets/images/tab/section_selected.png'
        },
        {
          pagePath: 'pages/account/account',
          text: '我的',
          iconPath: './assets/images/tab/profile.png',
          selectedIconPath: './assets/images/tab/profile_selected.png'
        }
      ]
    }
  };

  public componentDidMount(): void {
    dayjs.locale('zh-cn');
    dayjs.extend(relativeTime);
    this.updateApp();
  }

  /*更新小程序*/
  private updateApp(): void {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager();

      updateManager.onCheckForUpdate((res): void => {
        // 请求完新版本信息的回调
        console.log('是否有新版本：', res.hasUpdate);
      });

      updateManager.onUpdateReady((): void => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启小程序？',
          success(res): void {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });

      updateManager.onUpdateFailed((): void => {
        console.error('App Update Failed!');
      });
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
