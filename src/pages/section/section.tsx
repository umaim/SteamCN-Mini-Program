import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'

import SectionGroupList from '../../components/SectionGroupList/sectionGroupList'

import './section.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Section {
  props: IProps;
}

class Section extends Component {
  config: Config = {
    navigationBarTitleText: '板块'
  }

  private _sectionMeta = {
    forum: [ //平台周边
      {
        title: '热点聚焦',
        desc: '业界热点讨论',
        fid: 'f161'
      },
      {
        title: '平台研讨',
        desc: '解决平台技术故障和账号问题',
        fid: 'f127'
      },
      {
        title: '华语汉化',
        desc: '游戏汉化讨论与分享汉化资源',
        fid: 'f257'
      },
      {
        title: '成就指南',
        desc: '研讨游戏成就系统',
        fid: 'f235'
      },
      {
        title: '游戏互鉴',
        desc: '发表原创游戏评测',
        fid: 'f129'
      },
      {
        title: '福利放送',
        desc: '免费喜 +1 的机会',
        fid: 'f319'
      },
      {
        title: '购物心得',
        desc: '交流购物经验以及相关话题',
        fid: 'f234'
      },
      {
        title: '慈善包',
        desc: '讨论各类游戏包组合 ×禁止发布交易的主题帖',
        fid: 'f271'
      },
      /* 需要登录，暂不开放 {
        title: '交易中心',
        desc: '',
        fid: 'f201'
      },
      {
        title: '分享互赠',
        desc: '论坛会员间互赠/换游戏 ×禁止交易',
        fid: 'f254'
      },
      {
        title: '资源载点',
        desc: '下载平台周边资源',
        fid: 'f189'
      }*/
    ],
    problem: [ //问题互助
      /*{
        title: '技术问题',
        desc: '程序、网络异常 | 账号帮助 | 技术问题',
        fid: 'f301'
      },*/
      {
        title: '购物问题',
        desc: '跨区事宜 | 购物帮助 | 慈善包、促销询问',
        fid: 'f302'
      },
      {
        title: '社区问题',
        desc: '论坛积分、账户、制度问题 | 活动咨询',
        fid: 'f304'
      },
      {
        title: '资源 / 汉化问题',
        desc: '汉化、资源寻求',
        fid: 'f318'
      },
      {
        title: '游戏 / 成就问题',
        desc: '游戏内容、成就问题',
        fid: 'f303'
      },
      {
        title: '福利 / 魔法 / 其它',
        desc: '其它问题',
        fid: 'f322'
      }
    ],
    discussion: [ //游戏讨论
      {
        title: '综合讨论',
        desc: '游戏综合讨论区',
        fid: 'f251'
      },
      {
        title: '刀塔',
        desc: 'Dota 2 专区',
        fid: 'f305'
      },
      {
        title: '全球攻势',
        desc: 'Counter-Strike: Global Offensive 专区',
        fid: 'f299'
      },
      {
        title: '生存类游戏',
        desc: '生存类游戏专区',
        fid: 'f291'
      },
      {
        title: '侠盗猎车手',
        desc: 'Grand Theft Auto 专区',
        fid: 'f312'
      },
      {
        title: '威乐',
        desc: 'Valve 专区',
        fid: 'f244'
      },
      {
        title: '艺电',
        desc: 'Electronic Arts 旗下游戏讨论区',
        fid: 'f246'
      },
      {
        title: '育碧',
        desc: 'Ubisoft 旗下游戏讨论区',
        fid: 'f245'
      },
      {
        title: '动视暴雪',
        desc: 'Activision Blizzard 旗下游戏讨论区',
        fid: 'f248'
      }
    ],
    peripheral: [ //论坛周边
      {
        title: '谈天说地',
        desc: '水区 | 收藏 | 理财 | 健身 | 影音',
        fid: 'f148'
      },
      /*{
        title: '旅游摄影',
        desc: '摄影作品 | 旅游图文',
        fid: 'f259'
      },
      {
        title: '美眉美食',
        desc: '美眉鲜肉 | 美食图片',
        fid: 'f273'
      },
      {
        title: '软硬兼施',
        desc: '软件硬件 | 苹果世界 | 安卓天地',
        fid: 'f200'
      },*/
      {
        title: '开箱晒物',
        desc: '开箱分享',
        fid: 'f330'
      }
    ],
    platform: [ //友商平台
      {
        title: 'Origin',
        desc: '美商艺电 [EA Origin] - 多款顶级在线游戏的独家发行平台',
        fid: 'f232'
      },
      {
        title: 'Uplay',
        desc: '法国育碧 [UBI Uplay] - 含手机端的游戏平台',
        fid: 'f274'
      },
      {
        title: '杉果',
        desc: '杉果 [Sonkwo] - 国内正版游戏分发平台',
        fid: 'f316'
      },
      {
        title: 'GOG',
        desc: '波兰 [GOG] - 蠢驴良心 DRM-FREE 游戏平台',
        fid: 'f276'
      },
      {
        title: 'Windows 商店',
        desc: '微软 [Microsoft Store] - Windows 原生游戏及应用分发商店',
        fid: 'f326'
      },
      {
        title: '方块游戏平台',
        desc: '方块 [Cubic] - 国内正版游戏分发平台',
        fid: 'f332'
      },
      {
        title: '腾讯 WeGame',
        desc: '腾讯 [WeGame] - 原 TGP 平台',
        fid: 'f325'
      },
      {
        title: '主机平台',
        desc: '掌机及家用主机 [Console] - 任天堂 NS、XNS | 索尼 PlayStation | 微软 Xbox 等',
        fid: 'f275'
      },
      {
        title: '移动平台',
        desc: '智能终端 [iOS | Android] - Apple Store | Google Play | TapTap 等',
        fid: 'f328'
      },
      {
        title: '其它平台',
        desc: '其它游戏分发平台',
        fid: 'f277'
      }
    ],
    official: [ //社区服务
      {
        title: '公告发布',
        desc: '社区公告及论坛动态',
        fid: 'f140'
      },
      {
        title: '社区活动',
        desc: '社区活动及节日活动',
        fid: 'f238'
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='container'>
        <View className='group'>
          <View className='groupTitle'>
            <Text>平台周边</Text>
          </View>
          <SectionGroupList list={this._sectionMeta.forum}></SectionGroupList>
        </View>
        <View className='group'>
          <View className='groupTitle'>
            <Text>问题互助</Text>
          </View>
          <SectionGroupList list={this._sectionMeta.problem}></SectionGroupList>
        </View>
        <View className='group'>
          <View className='groupTitle'>
            <Text>游戏讨论</Text>
          </View>
          <SectionGroupList list={this._sectionMeta.discussion}></SectionGroupList>
        </View>
        <View className='group'>
          <View className='groupTitle'>
            <Text>论坛周边</Text>
          </View>
          <SectionGroupList list={this._sectionMeta.peripheral}></SectionGroupList>
        </View>
        <View className='group'>
          <View className='groupTitle'>
            <Text>友商平台</Text>
          </View>
          <SectionGroupList list={this._sectionMeta.platform}></SectionGroupList>
        </View>
        <View className='group'>
          <View className='groupTitle'>
            <Text>社区服务</Text>
          </View>
          <SectionGroupList list={this._sectionMeta.official}></SectionGroupList>
        </View>
      </View>
    )
  }
}

export default Section as ComponentClass<PageOwnProps, PageState>
