import { connect } from '@tarojs/redux';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtDivider, AtAvatar, AtMessage, AtLoadMore, AtNavBar } from 'taro-ui';
import dayjs from 'dayjs';

import { IThread, IReply } from '../../interfaces/thread';
import { IThreadRespond } from '../../interfaces/respond';
import { IAccount } from '../../interfaces/account';
import ParserRichText from '../../components/ParserRichText/parserRichText';
import ReplyCard from '../../components/ReplyCard/replyCard';
import contentCleaner from '../../utils/cleaner';

import './thread.scss';

interface Props {
  auth: boolean;
  account: IAccount;
  statusBarHeight: number;
}

interface State {
  pageNum: number;
  loadedPosition: number;
  thread: IThread;
  loadMoreVisibility: boolean;
  loadMoreStatus: 'more' | 'loading' | 'noMore';
}

@connect(({ account, system }) => ({
  auth: account.auth,
  account: account.account,
  statusBarHeight: system.statusBarHeight
}))
class Thread extends Taro.Component<Props, State> {
  public config: Taro.Config = {
    navigationBarTitleText: '主题',
    onReachBottomDistance: 300
  };

  public state = {
    pageNum: 1,
    loadedPosition: 0,
    loadMoreVisibility: false,
    loadMoreStatus: 'loading' as 'more' | 'loading' | 'noMore',
    thread: {
      title: '',
      tid: 0,
      timestamp: 0,
      viewed: 0,
      replied: 0,
      content: '',
      maxPosition: 0,
      author: {
        username: '',
        uid: 0,
        avatar: ''
      },
      replies: [
        {
          user: {
            username: '',
            uid: 0,
            avatar: ''
          },
          content: '',
          timestamp: 0,
          position: 0
        }
      ]
    }
  };

  public componentDidMount(): void {
    const { pageNum } = this.state;
    Taro.showLoading({
      title: '努力加载中 💦'
    });
    this.fetchThread(parseInt(this.$router.params.tid), pageNum);
  }

  public onShareAppMessage(): {
    title: string;
    path: string;
  } {
    const { thread } = this.state;
    return {
      title: `${thread.title} - SteamCN 蒸汽动力`,
      path: `/pages/thread/thread?tid=${this.$router.params.tid}`
    };
  }

  public onReachBottom(): void {
    const { loadedPosition, thread } = this.state;
    const currentPageNum = this.state.pageNum;
    if (loadedPosition < thread.maxPosition) {
      this.setState(
        {
          pageNum: currentPageNum + 1,
          loadMoreVisibility: true,
          loadMoreStatus: 'loading'
        },
        (): void => {
          const { pageNum } = this.state;
          this.fetchThread(parseInt(this.$router.params.tid), pageNum);
        }
      );
    } else {
      this.setState({
        loadMoreVisibility: true,
        loadMoreStatus: 'noMore'
      });
    }
  }

  private fetchThread(tid: number, pageNum: number): void {
    const { account } = this.props;
    Taro.request({
      url: `https://vnext.steamcn.com/v1/forum/thread/${tid}?page=${pageNum}`,
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
          const threadData = res.data as IThreadRespond;
          const currentPageNum = this.state.pageNum;
          if (currentPageNum === 1) {
            const { loadedPosition } = this.state;
            const floors = threadData.floors;
            const title = threadData.thread.subject;
            const tid = parseInt(threadData.thread.tid);
            const timestamp = parseInt(threadData.thread.dateline);
            const viewed = threadData.thread.views;
            const replied = threadData.thread.replies;
            const content = contentCleaner(threadData.floors[0].message);
            const maxPosition = parseInt(threadData.thread.maxposition);
            const username = threadData.thread.author;
            const uid = parseInt(threadData.thread.authorid);
            const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`;

            // console.log(content) // 打印主贴 HTML 代码

            let replies = Array<IReply>();
            for (let i = 1; i < floors.length; i++) {
              const floor = floors[i];
              const username = floor.author;
              const uid = parseInt(floor.authorid);
              const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`;
              const content = contentCleaner(floor.message);
              const timestamp = parseInt(floor.dbdateline);
              const position = parseInt(floor.position);
              replies.push({
                user: {
                  username,
                  uid,
                  avatar
                },
                content,
                timestamp,
                position
              });
            }
            this.setState({
              loadedPosition: loadedPosition + floors.length,
              thread: {
                title,
                tid,
                timestamp,
                viewed,
                replied,
                content,
                maxPosition,
                author: {
                  username,
                  uid,
                  avatar
                },
                replies
              }
            });
            Taro.hideLoading();
          } else {
            const { loadedPosition, thread } = this.state;
            const floors = threadData.floors;

            let replies = Array<IReply>();
            for (let i = 0; i < floors.length; i++) {
              const floor = floors[i];
              const username = floor.author;
              const uid = parseInt(floor.authorid);
              const avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=middle`;
              const content = contentCleaner(floor.message);
              const timestamp = parseInt(floor.dbdateline);
              const position = parseInt(floor.position);
              replies.push({
                user: {
                  username,
                  uid,
                  avatar
                },
                content,
                timestamp,
                position
              });
            }
            this.setState({
              loadedPosition: loadedPosition + floors.length,
              loadMoreVisibility: false,
              loadMoreStatus: 'more',
              thread: {
                ...thread,
                replies: thread.replies.concat(replies)
              }
            });
          }
        } else {
          const { auth } = this.props;
          Taro.hideLoading();
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
              message: `无法查看帖子😱，${message}`,
              type: 'error',
              duration: 3000
            });
          }
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

  public render(): JSX.Element {
    const pageDepth = Taro.getCurrentPages().length;
    const { thread, loadMoreStatus, loadMoreVisibility } = this.state;
    const { statusBarHeight } = this.props;
    const repliesArea = thread.replies.map(
      (reply): JSX.Element => {
        return (
          <View key={reply.position}>
            <ReplyCard reply={reply}></ReplyCard>
          </View>
        );
      }
    );
    return (
      // <WxmlifyRichText html={thread.content}></WxmlifyRichText> // 组件报错，不可用
      // <WxparseRichText html={thread.content}></WxparseRichText> // 效果挺好
      // <RichText nodes={thread.content}></RichText> //最方便，没有任何排版，样式原始，没有表格，图片不自适应
      // <wxparse data={thread.content} type="html" padding="15"></wxparse>
      <View>
        <AtMessage />

        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px;`}
          title="主题"
          color="#FFF"
          leftIconType={pageDepth === 1 ? 'home' : 'chevron-left'}
          onClickLeftIcon={
            pageDepth === 1
              ? (): void => {
                  Taro.switchTab({ url: '/pages/index/index' });
                }
              : (): void => {
                  Taro.navigateBack({ delta: 1 });
                }
          }
          border={false}
        />

        <View className="header">
          <Text decode className="title">
            {thread.title}
          </Text>
        </View>

        <View className="author">
          <AtAvatar
            circle
            image={thread.author.avatar}
            size="small"
            className="avatar"
          ></AtAvatar>
          <View className="info">
            <Text className="name">{thread.author.username}</Text>
            <View className="others">
              <Text className="time">
                {dayjs.unix(thread.timestamp as number).fromNow()}
              </Text>
              <Text>
                阅读 {thread.viewed} · 回复 {thread.replied}
              </Text>
            </View>
          </View>
        </View>

        <View className="content">
          <ParserRichText html={thread.content} selectable></ParserRichText>
        </View>

        <AtDivider>
          <View className="at-icon at-icon-check-circle"></View>
        </AtDivider>

        {repliesArea}

        {loadMoreVisibility && (
          <AtLoadMore
            status={loadMoreStatus as 'loading' | 'more' | 'noMore' | undefined}
            loadingText="捕获更多回复中~🤩"
            noMoreText="下面真的没有啦~😳"
          />
        )}
      </View>
    );
  }
}

export default Thread as Taro.ComponentClass;
