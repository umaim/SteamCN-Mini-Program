import Taro from '@tarojs/taro';

import './parserRichText.scss';

interface Props {
  /**
   * 富文本数据，可以是 HTML 字符串、节点对象、节点数组
   *
   * @default []
   */
  html: string | object | object[];

  /**
   * 是否允许链接受到点击时自动复制链接（仅限http(s)开头的网络链接）
   *
   * @default true
   */
  autocopy?: boolean;

  /**
   * 是否允许播放视频时自动暂停其他视频
   *
   * @default true
   */
  autopause?: boolean;

  /**
   * 是否自动将`<title>`标签的内容设置到页面标题上
   *
   * @default true
   */
  autosetTitle?: boolean;

  /**
   * 是否允许长按复制内容
   *
   * @default false
   */
  selectable?: boolean;

  /**
   * 标签的默认样式
   *
   * @default {}
   */
  tagStyle?: object;

  /**
   * 图片显示模式
   *
   * @default 'default'
   */
  imgMode?:
    | 'default'
    | 'widthFix'
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';

  /**
   * 是否使用渐显动画
   *
   * @default false
   */
  showWithAnimation?: boolean;

  /**
   * 渐显动画持续时间
   *
   * @default 400
   */
  animationDuration?: number;
}

/**
 * ParserRichText 富文本组件
 */
class ParserRichText extends Taro.Component<Props, {}> {
  public static defaultProps = {
    html: [],
    autocopy: true,
    autopause: true,
    autosetTitle: true,
    showWithAnimation: false,
    animationDuration: 400,
    selectable: false,
    tagStyle: {},
    imgMode: 'default'
  };

  public config: Taro.Config = {
    usingComponents: {
      parser: './Parser/index'
    }
  };

  public render(): JSX.Element {
    const {
      html,
      autocopy,
      autopause,
      autosetTitle,
      selectable,
      tagStyle,
      imgMode,
      showWithAnimation,
      animationDuration
    } = this.props;
    return (
      <parser
        html={html}
        autocopy={autocopy}
        autopause={autopause}
        autosetTitle={autosetTitle}
        selectable={selectable}
        tag-style={tagStyle}
        img-mode={imgMode}
        show-with-animation={showWithAnimation}
        animation-duration={animationDuration}
      />
    );
  }
}

export default ParserRichText as Taro.ComponentClass<Props>;
