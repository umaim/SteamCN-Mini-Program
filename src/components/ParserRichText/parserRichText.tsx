import { ComponentType } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import './parserRichText.scss';

interface Props {
  html: string;
}

class ParserRichText extends Taro.Component<Props, {}> {
  public config: Taro.Config = {
    usingComponents: {
      parser: './Parser/index'
    }
  };

  public static defaultProps = {
    html: ''
  };

  public render(): JSX.Element {
    const { html } = this.props;
    return (
      <View>
        <parser html={html} selectable></parser>
      </View>
    );
  }
}

export default ParserRichText as ComponentType<Props>;
