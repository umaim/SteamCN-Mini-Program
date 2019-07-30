import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtMessage, AtLoadMore, AtNavBar } from 'taro-ui';

import ThreadCard from '../../components/ThreadCard/threadCard';
import { IThreadMeta } from '../../interfaces/thread';
import { IAccount } from '../../interfaces/account';
import { ISectionThreadListItem } from '../../interfaces/respond';

import './sectionThreadList.scss';

interface Props {
  auth: boolean;
  account: IAccount;
  statusBarHeight: number;
}

interface State {
  sectionThreadList: IThreadMeta[];
  pageNum: number;
  loadMoreVisibility: boolean;
  loadMoreStatus: 'more' | 'loading' | 'noMore';
}

@connect(({ account, system }) => ({
  auth: account.auth,
  account: account.account,
  statusBarHeight: system.statusBarHeight
}))
class SectionThreadList extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '板块',
    enablePullDownRefresh: true,
    onReachBottomDistance: 300
  };

  public state = {
    sectionThreadList: Array<IThreadMeta>(),
    pageNum: 1,
    loadMoreVisibility: false,
    loadMoreStatus: 'loading' as 'more' | 'loading' | 'noMore'
  };

  public componentDidMount(): void {
    const { pageNum } = this.state;
    Taro.showLoading({
      title: '努力加载中 💦'
    });
    this.fetchSection(parseInt(this.$router.params.fid), pageNum);
  }

  public onPullDownRefresh(): void {
    Taro.showLoading({
      title: '努力加载中 💦'
    });
    this.setState(
      {
        sectionThreadList: Array<IThreadMeta>(),
        pageNum: 1
      },
      (): void => {
        const { pageNum } = this.state;
        this.fetchSection(parseInt(this.$router.params.fid), pageNum);
      }
    );
  }

  public onReachBottom(): void {
    const currentPageNum = this.state.pageNum;
    this.setState(
      {
        pageNum: currentPageNum + 1,
        loadMoreVisibility: true
      },
      (): void => {
        const { pageNum } = this.state;
        this.fetchSection(parseInt(this.$router.params.fid), pageNum);
      }
    );
  }

  private fetchSection(fid: number, page: number): void {
    const { account } = this.props;
    Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/thread?fid=${fid}&page=${page}&orderby=dateline`,
      data: {},
      header: {
        authorization: account.accessToken
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }).then(
      (res): void => {
        if (res.statusCode === 200) {
          const threadListRespond = res.data as ISectionThreadListItem[];

          let threadList = Array<IThreadMeta>();
          for (let i = 0; i < threadListRespond.length; i++) {
            const sectionThreadListItem = threadListRespond[i];

            // 跳过置顶帖
            if (sectionThreadListItem.displayorder !== '0') {
              continue;
            }

            const title = sectionThreadListItem.subject;
            const tid = parseInt(sectionThreadListItem.tid);
            const url = `https://steamcn.com/t${tid}-1-1`;
            const image = sectionThreadListItem.coverpath;
            const section = sectionThreadListItem.forumname;
            const timestamp = parseInt(sectionThreadListItem.dbdateline);
            const username = sectionThreadListItem.author;
            const uid = parseInt(sectionThreadListItem.authorid);
            const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`;
            const viewed = sectionThreadListItem.views;
            const replied = parseInt(sectionThreadListItem.replies);

            threadList.push({
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
          }
          const { sectionThreadList } = this.state;
          this.setState(
            {
              sectionThreadList: sectionThreadList.concat(threadList),
              loadMoreVisibility: false
            },
            (): void => {
              Taro.hideLoading();
              Taro.stopPullDownRefresh();
            }
          );
        } else {
          const { auth } = this.props;
          Taro.hideLoading();
          Taro.stopPullDownRefresh();
          if (auth) {
            Taro.atMessage({
              message: `登录凭据过期，请重新登录🥀`,
              type: 'error',
              duration: 3000
            });
          } else {
            let message = res.data.message as string;
            message = message.replace('</p></div><div><p>', '');
            Taro.atMessage({
              message: `无法查看本板块😱，${message}`,
              type: 'error',
              duration: 3000
            });
          }
        }
      },
      (): void => {
        Taro.hideLoading();
        Taro.stopPullDownRefresh();
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
      sectionThreadList,
      loadMoreStatus,
      loadMoreVisibility
    } = this.state;
    const { statusBarHeight } = this.props;
    const threadCards = sectionThreadList.map(
      (item): JSX.Element => {
        return <ThreadCard threadMeta={item} key={item.tid}></ThreadCard>;
      }
    );
    return (
      <View className="thread-list">
        <AtMessage />

        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title={this.$router.params.title ? this.$router.params.title : '板块'}
          color="#FFF"
          leftIconType="chevron-left"
          onClickLeftIcon={(): void => {
            Taro.navigateBack({ delta: 1 });
          }}
          border={false}
        />

        {threadCards}
        {loadMoreVisibility && (
          <AtLoadMore
            status={loadMoreStatus as 'loading' | 'more' | 'noMore'}
            loadingText="捕获更多帖子中~🤩"
            noMoreText="下面真的没有啦~😳"
          />
        )}
      </View>
    );
  }
}

export default SectionThreadList as Taro.ComponentClass;
