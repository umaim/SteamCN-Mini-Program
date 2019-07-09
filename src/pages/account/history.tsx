import { ComponentType } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtMessage } from 'taro-ui';

import './history.scss';
import ThreadCard from '../../components/ThreadCard/threadCard';
import { IThreadMeta } from '../../interfaces/thread';

interface State {
  historyThreadList: IThreadMeta[];
  history: IThreadMeta[];
  page: number;
}

class History extends Taro.Component<{}, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '历史记录',
    onReachBottomDistance: 300
  };

  public state = {
    historyThreadList: Array<IThreadMeta>(),
    history: Array<IThreadMeta>(),
    page: 1
  };

  public componentDidMount(): void {
    Taro.getStorage({
      key: 'history'
    }).then(
      (res): void => {
        const history = (res.data as unknown) as IThreadMeta[];
        this.setState(
          {
            history: history.reverse()
          },
          (): void => {
            this.showMoreHistory();
          }
        );
      },
      (): void => {
        Taro.atMessage({
          message: '似乎没有留下你的足迹',
          type: 'info',
          duration: 1500
        });
      }
    );
  }

  public onReachBottom(): void {
    this.showMoreHistory();
  }

  private showMoreHistory(): void {
    const { history, historyThreadList, page } = this.state;
    if ((page - 1) * 10 >= history.length) {
      return;
    } else if (page * 10 < history.length) {
      this.setState({
        historyThreadList: historyThreadList.concat(
          history.slice((page - 1) * 10, page * 10)
        ),
        page: page + 1
      });
    } else {
      this.setState({
        historyThreadList: historyThreadList.concat(
          history.slice((page - 1) * 10, history.length)
        ),
        page: page + 1
      });
    }
  }

  public render(): JSX.Element {
    const { historyThreadList } = this.state;
    const threadCards = historyThreadList.map(
      (item): JSX.Element => {
        return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>;
      }
    );
    return (
      <View className="thread-list">
        <AtMessage />
        {threadCards}
      </View>
    );
  }
}

export default History as ComponentType;
