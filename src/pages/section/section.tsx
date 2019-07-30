import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { Text, View } from '@tarojs/components';
import { AtNavBar } from 'taro-ui';

import SectionGroupList from '../../components/SectionGroupList/sectionGroupList';

import './section.scss';

interface Props {
  statusBarHeight: number;
}

@connect(({ system }) => ({
  statusBarHeight: system.statusBarHeight
}))
class Section extends Taro.Component<Props, {}> {
  public config: Taro.Config = {
    navigationBarTitleText: '板块'
  };

  private _sectionMeta = {
    forum: [
      //平台周边
      {
        title: '热点聚焦',
        desc: '周边热门话题讨论',
        fid: 161
      },
      {
        title: '平台研讨',
        desc: '进阶的技术性交流',
        fid: 127
      },
      {
        title: '华语汉化',
        desc: '适用于正版游戏的汉化',
        fid: 257
      },
      {
        title: '成就指南',
        desc: '游戏成就和达成攻略',
        fid: 235
      },
      {
        title: '游戏互鉴',
        desc: '发布原创游戏评测',
        fid: 129
      },
      {
        title: '福利放送',
        desc: '免费领取游戏的机会',
        fid: 319
      },
      {
        title: '购物心得',
        desc: '购物经验和优惠信息',
        fid: 234
      },
      {
        title: '慈善包',
        desc: '物美价廉的游戏集合',
        fid: 271
      },
      {
        title: '交易中心',
        desc: '游戏、卡片、道具、市场',
        fid: 201
      },
      {
        title: '分享互赠',
        desc: '送出余裕的游戏或道具',
        fid: 254
      },
      {
        title: '资源载点',
        desc: '备份、美化、媒体等资源',
        fid: 189
      }
    ],
    problem: [
      //问题互助
      {
        title: '技术问题',
        desc: '异常故障和账户帮助',
        fid: 301
      },
      {
        title: '购物问题',
        desc: '跨区、支付、慈善包等问题',
        fid: 302
      },
      {
        title: '社区问题',
        desc: '积分、账号和制度的疑问',
        fid: 304
      },
      {
        title: '资源 / 汉化问题',
        desc: '寻求资源／汉化相关问题',
        fid: 318
      },
      {
        title: '游戏 / 成就问题',
        desc: '针对某一游戏的特定问题',
        fid: 303
      },
      {
        title: '福利 / 软硬 / 其它',
        desc: '福利，软硬网络或其他问题',
        fid: 322
      },
      {
        title: '魔法学园',
        desc: '呼啦呼，雪尼拉，噜巴拉',
        fid: 311
      }
    ],
    discussion: [
      //游戏讨论
      {
        title: '综合讨论',
        desc: '一般游戏交流区',
        fid: 251
      },
      {
        title: '刀塔',
        desc: 'DOTA',
        fid: 305
      },
      {
        title: '全球攻势',
        desc: 'Global Offensive',
        fid: 299
      },
      {
        title: '生存类游戏',
        desc: 'Survival 类游戏',
        fid: 291
      },
      {
        title: '侠盗猎车手',
        desc: 'Grand Theft Auto',
        fid: 312
      },
      {
        title: '威乐',
        desc: 'Valve 旗下游戏讨论',
        fid: 244
      },
      {
        title: '艺电',
        desc: 'EA 旗下游戏讨论',
        fid: 246
      },
      {
        title: '育碧',
        desc: 'Ubisoft 旗下游戏讨论',
        fid: 245
      },
      {
        title: '动视暴雪',
        desc: 'Activision Blizzard 游戏',
        fid: 248
      }
    ],
    peripheral: [
      //论坛周边
      {
        title: '谈天说地',
        desc: '论坛指定水区',
        fid: 148
      },
      {
        title: '旅游摄影',
        desc: '摄影作品 | 旅游图文',
        fid: 259
      },
      {
        title: '美眉美食',
        desc: '美眉鲜肉 | 美食图片',
        fid: 273
      },
      {
        title: '软硬兼施',
        desc: '软件硬件 | 苹果世界 | 安卓天地',
        fid: 200
      },
      {
        title: '开箱晒物',
        desc: '开箱分享',
        fid: 330
      }
    ],
    platform: [
      //友商平台
      {
        title: 'Origin',
        desc: '艺电旗下游戏平台',
        fid: 232
      },
      {
        title: 'Uplay',
        desc: '育碧旗下游戏平台',
        fid: 274
      },
      {
        title: 'GOG',
        desc: '无 DRM 机制的自由平台',
        fid: 276
      },
      {
        title: '杉果',
        desc: '中电博亚旗下代理平台',
        fid: 316
      },
      {
        title: 'Epic Games',
        desc: '虚幻引擎开发商的新推平台',
        fid: 335
      },
      {
        title: '其它平台',
        desc: '其他销售网站旗下平台',
        fid: 277
      },
      {
        title: 'Windows 商店',
        desc: '微软游戏与软件平台',
        fid: 326
      },
      {
        title: '方块',
        desc: '方块游戏平台',
        fid: 332
      },
      {
        title: 'WeGame',
        desc: '腾讯游戏平台',
        fid: 325
      },
      {
        title: '主机平台',
        desc: 'PS 与 XBOX 等主机',
        fid: 275
      },
      {
        title: '移动平台',
        desc: '安卓与 iOS 手机游戏',
        fid: 328
      }
    ],
    official: [
      //社区服务
      {
        title: '公告发布',
        desc: '社区告示和动态',
        fid: 140
      },
      {
        title: '投诉反馈',
        desc: '意见、建议和投诉',
        fid: 197
      },
      {
        title: '社区活动',
        desc: '社区与节日活动',
        fid: 238
      }
    ]
  };

  public render(): JSX.Element {
    const { statusBarHeight } = this.props;
    return (
      <View>
        <AtNavBar
          customStyle={`background-color: #57bae8; padding-top: ${statusBarHeight}px`}
          title="论坛版块"
          border={false}
        />

        <View className="container">
          <View className="group">
            <View className="groupTitle">
              <Text>平台周边</Text>
            </View>
            <SectionGroupList list={this._sectionMeta.forum}></SectionGroupList>
          </View>
          <View className="group">
            <View className="groupTitle">
              <Text>问题互助</Text>
            </View>
            <SectionGroupList
              list={this._sectionMeta.problem}
            ></SectionGroupList>
          </View>
          <View className="group">
            <View className="groupTitle">
              <Text>游戏讨论</Text>
            </View>
            <SectionGroupList
              list={this._sectionMeta.discussion}
            ></SectionGroupList>
          </View>
          <View className="group">
            <View className="groupTitle">
              <Text>论坛周边</Text>
            </View>
            <SectionGroupList
              list={this._sectionMeta.peripheral}
            ></SectionGroupList>
          </View>
          <View className="group">
            <View className="groupTitle">
              <Text>友商平台</Text>
            </View>
            <SectionGroupList
              list={this._sectionMeta.platform}
            ></SectionGroupList>
          </View>
          <View className="group">
            <View className="groupTitle">
              <Text>社区服务</Text>
            </View>
            <SectionGroupList
              list={this._sectionMeta.official}
            ></SectionGroupList>
          </View>
        </View>
      </View>
    );
  }
}

export default Section as Taro.ComponentClass;
