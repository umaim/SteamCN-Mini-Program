import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import './about.scss';

class About extends Taro.Component {
  public config: Taro.Config = {
    navigationBarTitleText: '关于'
  };

  public render(): JSX.Element {
    return (
      <View className="container">
        <View className="item header">
          <Image
            src="cloud://steamcn.7374-steamcn/assets/img/logo.jpg"
            className="logo"
          ></Image>
          <View>蒸汽动力 SteamCN.com</View>
          <View>Version 0.2.6</View>
        </View>

        <View className="item">
          <View className="title">项目地址</View>
          <View className="content">
            <View className="icon">
              <Image src="cloud://steamcn.7374-steamcn/assets/img/github.png"></Image>
            </View>
            <View className="text">
              <View>GayHub</View>
              <View>https://github.com/xPixv/SteamCN-Mini-Program</View>
            </View>
          </View>
        </View>

        <View className="item">
          <View className="title">反馈建议</View>

          <View className="content">
            <View className="icon">
              <Image src="cloud://steamcn.7374-steamcn/assets/img/steamcn.png"></Image>
            </View>
            <View className="text">
              <View>SteamCN</View>
              <View>https://steamcn.com/t477292-1-1</View>
            </View>
          </View>

          <View className="content">
            <View className="icon">
              <Image src="cloud://steamcn.7374-steamcn/assets/img/steam.png"></Image>
            </View>
            <View className="text">
              <View>Steam</View>
              <View>https://s.team/p/cdcc-dnbw</View>
            </View>
          </View>
        </View>

        <View className="item">
          <View className="title">小程序二维码</View>
          <Image
            src="cloud://steamcn.7374-steamcn/assets/img/qrcode.jpg"
            className="qrcode"
          ></Image>
        </View>
        <View className="footer">蒸汽动力 · SteamCN</View>
      </View>
    );
  }
}

export default About as Taro.ComponentClass;
