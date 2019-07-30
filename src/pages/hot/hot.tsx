import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtMessage, AtNavBar } from 'taro-ui';

import ThreadCard from '../../components/ThreadCard/threadCard';
import { IAccount } from '../../interfaces/account';
import { IThreadMeta } from '../../interfaces/thread';
import { IHotThreadItemRespond } from '../../interfaces/respond';

import './hot.scss';

interface Props {
  auth: boolean;
  account: IAccount;
  statusBarHeight: number;
}

interface State {
  hotThreadList: IThreadMeta[];
}

@connect(({ account, system }) => ({
  auth: account.auth,
  account: account.account,
  statusBarHeight: system.statusBarHeight
}))
class Hot extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '热门主题',
    enablePullDownRefresh: true
  };

  public state = {
    hotThreadList: Array<IThreadMeta>()
  };

  public componentDidMount(): void {
    this.initHot();
  }

  public onShareAppMessage(): {
    title: string;
    path: string;
  } {
    return {
      title: 'SteamCN 蒸汽动力 - 热门主题',
      path: 'pages/hot/hot'
    };
  }

  public onPullDownRefresh(): void {
    this.initHot();
  }

  private initHot(): void {
    Taro.showLoading({
      title: '努力加载中 💦'
    });
    this.requestHotThreadList();
  }

  private requestHotThreadList(): void {
    this.requestHot(434).then((res): void => {
      if (res) {
        this.setState(
          {
            hotThreadList: res
          },
          this.isFinish
        );
      }
    });
  }

  private requestHot(bid: number): Promise<void | IThreadMeta[] | undefined> {
    const { account } = this.props;
    return Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/hot/${bid}`,
      data: {},
      header: {
        authorization: account.accessToken
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }).then(
      (res): IThreadMeta[] | undefined => {
        if (res.statusCode === 200) {
          console.log(res.data);
          const itemlist = res.data.itemlist as IHotThreadItemRespond[];
          let thraedList = Array<IThreadMeta>();
          itemlist.forEach((item): void => {
            const title = item.title;
            const tid = parseInt(item.id);
            const url = `https://steamcn.com/t${tid}-1-1`;
            const image = item.coverpath;
            const section = item.fields.forumname;
            const timestamp = parseInt(item.fields.dateline);
            const username = item.fields.author;
            const uid = parseInt(item.fields.authorid);
            const avatar = item.fields.avatar_middle;
            const viewed = parseInt(item.fields.views);
            const replied = parseInt(item.fields.replies);
            thraedList.push({
              title,
              tid,
              url,
              image,
              section,
              timestamp,
              author: {
                username,
                uid,
                avatar
              },
              stats: {
                viewed,
                replied
              }
            });
          });
          return thraedList;
        } else {
          Taro.atMessage({
            message: `刷新失败😱`,
            type: 'error',
            duration: 2000
          });
        }
      },
      (): void => {
        Taro.atMessage({
          message: '网络连接中断😭',
          type: 'error',
          duration: 2000
        });
      }
    );
  }

  private isFinish(): void {
    const { hotThreadList } = this.state;
    if (hotThreadList.length > 0) {
      Taro.stopPullDownRefresh();
      Taro.hideLoading();
      Taro.atMessage({
        message: `刷新成功😁`,
        type: 'success',
        duration: 1500
      });
    }
  }

  public render(): JSX.Element {
    const { hotThreadList } = this.state;
    const { statusBarHeight } = this.props;
    const threadCards = hotThreadList.map(
      (item): JSX.Element => {
        return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>;
      }
    );
    return (
      <View>
        <AtMessage />

        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title="热门主题"
          border={false}
        />

        <View className="thread-list">{threadCards}</View>
      </View>
    );
  }
}

export default Hot as Taro.ComponentClass;
