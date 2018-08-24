//app.js
App({
  onLaunch: function() {

  },
  globalData: {
    userInfo: null,
    urls: {
      rss: {
        guide: { //导航
          hot: 'https://steamcn.com/forum.php?mod=guide&view=hot&rss=1', //最新热门
          newreply: 'https://steamcn.com/forum.php?mod=guide&view=new&rss=1', //最新回复
          newthread: 'https://steamcn.com/forum.php?mod=guide&view=newthread&rss=1', //最新发表
        },
        forum: { //社区周边
          hot: 'https://steamcn.com/forum.php?mod=rss&fid=161', //热点聚焦
          disscussion: 'https://steamcn.com/forum.php?mod=rss&fid=127', //平台研讨
          localization: 'https://steamcn.com/forum.php?mod=rss&fid=257', //华语汉化
          achievement: 'https://steamcn.com/forum.php?mod=rss&fid=235', //成就指南
          appreciation: 'https://steamcn.com/forum.php?mod=rss&fid=129', //游戏互鉴
          welfare: 'https://steamcn.com/forum.php?mod=rss&fid=319', //福利放送
          shopping: 'https://steamcn.com/forum.php?mod=rss&fid=234', //购物心得
          bundle: 'https://steamcn.com/forum.php?mod=rss&fid=271', //慈善包
          trade: 'https://steamcn.com/forum.php?mod=rss&fid=201', //交易中心
          giveaway: 'https://steamcn.com/forum.php?mod=rss&fid=254', //分享互赠
          resources: 'https://steamcn.com/forum.php?mod=rss&fid=189', //资源载点
        },
        problem: { //问题互助
          tech: 'https://steamcn.com/forum.php?mod=rss&fid=301', //技术问题
          shopping: 'https://steamcn.com/forum.php?mod=rss&fid=302', //购物问题
          forum: 'https://steamcn.com/forum.php?mod=rss&fid=304', //社区问题
          resources: 'https://steamcn.com/forum.php?mod=rss&fid=318', //资源 / 汉化问题
          game: 'https://steamcn.com/forum.php?mod=rss&fid=303', //游戏 / 成就问题
          other: 'https://steamcn.com/forum.php?mod=rss&fid=322', // 福利 / 魔法 / 其它
        },
        discussion: { //游戏讨论
          general: 'https://steamcn.com/forum.php?mod=rss&fid=251', //综合讨论
          dota: 'https://steamcn.com/forum.php?mod=rss&fid=305', //刀塔
          csgo: 'https://steamcn.com/forum.php?mod=rss&fid=299', //全球攻势
          survival: 'https://steamcn.com/forum.php?mod=rss&fid=291', //生存类游戏
          gta: 'https://steamcn.com/forum.php?mod=rss&fid=312', //侠盗猎车手
          valve: 'https://steamcn.com/forum.php?mod=rss&fid=244', //威乐
          ea: 'https://steamcn.com/forum.php?mod=rss&fid=246', //艺电
          ubisoft: 'https://steamcn.com/forum.php?mod=rss&fid=245', //育碧
          activision: 'https://steamcn.com/forum.php?mod=rss&fid=248', //动视暴雪
        },
        peripheral: { //论坛周边
          anything: 'https://steamcn.com/forum.php?mod=rss&fid=148', //谈天说地
          photography: 'https://steamcn.com/forum.php?mod=rss&fid=259', //旅游摄影
          girlnfood: 'https://steamcn.com/forum.php?mod=rss&fid=273', //美眉美食
          softhardware: 'https://steamcn.com/forum.php?mod=rss&fid=200', //软硬兼施
          unbox: 'https://steamcn.com/forum.php?mod=rss&fid=330', //开箱筛物
        },
        platform: { //友商平台
          origin: 'https://steamcn.com/forum.php?mod=rss&fid=232', //Origin
          uplay: 'https://steamcn.com/forum.php?mod=rss&fid=274', //Uplay
          sonkwo: 'https://steamcn.com/forum.php?mod=rss&fid=316', //杉果
          gog: 'https://steamcn.com/forum.php?mod=rss&fid=276', //GOG
          windows: 'https://steamcn.com/forum.php?mod=rss&fid=326', //Windows 商店
          cubic: 'https://steamcn.com/forum.php?mod=rss&fid=332', // 方块游戏平台
          wegame: 'https://steamcn.com/forum.php?mod=rss&fid=325', //腾讯 Wegame
          console: 'https://steamcn.com/forum.php?mod=rss&fid=275', //主机平台
          mobile: 'https://steamcn.com/forum.php?mod=rss&fid=328', //移动平台
          other: 'https://steamcn.com/forum.php?mod=rss&fid=277', //其它平台
        },
        official: { //社区服务
          announcement: 'https://steamcn.com/forum.php?mod=rss&fid=140', //公告发布
          activity: 'https://steamcn.com/forum.php?mod=rss&fid=238', //社区活动
        }
      },
      loginPage: 'https://steamcn.com/member.php?mod=logging&action=login',
      login: 'https://steamcn.com/member.php?mod=logging&action=login&loginsubmit=yes&inajax=1&loginhash=LpUeg'
    }
  }
})