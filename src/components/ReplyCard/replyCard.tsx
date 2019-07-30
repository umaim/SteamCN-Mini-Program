import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import dayjs from 'dayjs';

import './replyCard.scss';
import ParserRichText from '../ParserRichText/parserRichText';
import { IReply } from '../../interfaces/thread';

interface Props {
  reply: IReply;
}

class ReplyCard extends Taro.Component<Props, {}> {
  public static defaultProps = {
    reply: {
      user: {
        username: '',
        uid: 0,
        avatar: ''
      },
      content: '',
      timestamp: 0,
      position: 0
    }
  };

  public static options = {
    addGlobalClass: true
  };

  public render(): JSX.Element {
    const { user, content, timestamp, position } = this.props.reply;
    return (
      <View className="reply">
        <View className="at-row at-row__justify--between">
          <View className="user">
            <AtAvatar circle image={user.avatar} size="small"></AtAvatar>
            <View className="info">
              <Text className="name">{user.username}</Text>
              <Text className="time">{dayjs.unix(timestamp).fromNow()}</Text>
            </View>
          </View>
          <Text className="floor">{`#${position}`}</Text>
        </View>
        <View className="content">
          <ParserRichText html={content} selectable></ParserRichText>
        </View>
      </View>
    );
  }
}

export default ReplyCard as Taro.ComponentClass<Props>;
