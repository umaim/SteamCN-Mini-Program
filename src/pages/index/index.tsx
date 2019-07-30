import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View, Swiper, SwiperItem, Text, Image } from '@tarojs/components';
import { AtMessage, AtNavBar } from 'taro-ui';

import ThreadCard from '../../components/ThreadCard/threadCard';
import { IThreadMeta } from '../../interfaces/thread';
import { IHotThreadItemRespond } from '../../interfaces/respond';
import { IAccount } from '../../interfaces/account';
import { initCredential } from '../../actions/account';
import { getSystemInfo } from '../../actions/system';

import './index.scss';

interface Props {
  auth: boolean;
  account: IAccount;
  statusBarHeight: number;
  initCredential: () => void;
  getSystemInfo: () => void;
}

interface State {
  bannerThreadList: IThreadMeta[];
  indexThreadList: IThreadMeta[];
}

@connect(
  ({ account, system }) => ({
    auth: account.auth,
    account: account.account,
    statusBarHeight: system.statusBarHeight
  }),
  dispatch => ({
    initCredential() {
      dispatch(initCredential());
    },
    getSystemInfo() {
      dispatch(getSystemInfo());
    }
  })
)
class Index extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: 'SteamCN 蒸汽动力',
    enablePullDownRefresh: true
  };

  public state = {
    bannerThreadList: Array<IThreadMeta>(),
    indexThreadList: Array<IThreadMeta>()
  };

  public constructor(props: Props) {
    super(props);
    this.props.getSystemInfo();
  }

  public componentDidShow(): void {
    this.props.initCredential();
  }

  public componentDidMount(): void {
    this.initHome();
  }

  public onPullDownRefresh(): void {
    this.initHome();
  }

  private initHome(): void {
    Taro.showLoading({
      title: '努力加载中 💦'
    });
    this.requestBannerThreadList();
    this.requestIndexThreadList();
  }

  private requestBannerThreadList(): void {
    this.requestHot(431).then((res): void => {
      if (res) {
        this.setState(
          {
            bannerThreadList: res
          },
          this.isFinish
        );
      }
    });
  }

  public requestIndexThreadList(): void {
    this.requestHot(432).then((res): void => {
      if (res) {
        this.setState(
          {
            indexThreadList: res
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
            const image =
              item.pic.indexOf('https://blob.steamcn.com') === -1
                ? `https://blob.steamcn.com/${item.pic}`
                : item.pic;
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
    const { bannerThreadList, indexThreadList } = this.state;
    if (bannerThreadList.length > 0 && indexThreadList.length > 0) {
      Taro.stopPullDownRefresh();
      Taro.hideLoading();
      Taro.atMessage({
        message: `刷新成功😁`,
        type: 'success',
        duration: 1500
      });
    }
  }

  public onShareAppMessage(): {
    title: string;
    path: string;
  } {
    return {
      title: 'SteamCN 蒸汽动力',
      path: '/pages/index/index'
    };
  }

  private toThread(tid: number): void {
    Taro.navigateTo({
      url: `/pages/thread/thread?tid=${tid}`
    });
  }

  public render(): JSX.Element {
    const { bannerThreadList, indexThreadList } = this.state;
    const { statusBarHeight } = this.props;
    const swiperItems = bannerThreadList.map(
      (item): JSX.Element => {
        return (
          <SwiperItem
            key={item.tid}
            onClick={this.toThread.bind(this, item.tid)}
          >
            <Image
              src={item.image || ''}
              className="swiper-item-image"
              mode="scaleToFill"
            ></Image>
            <Text className="swiper-item-title">{item.title}</Text>
          </SwiperItem>
        );
      }
    );
    const threadCards = indexThreadList.map(
      (item): JSX.Element => {
        return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>;
      }
    );

    return (
      <View className="index">
        <AtMessage />

        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title="SteamCN 蒸汽动力"
          border={false}
        />

        <Swiper
          className="index-swiper"
          autoplay
          interval={2500}
          duration={500}
          circular
        >
          {swiperItems}
        </Swiper>
        <View className="thread-list">{threadCards}</View>
      </View>
    );
  }
}

export default Index as Taro.ComponentClass;
