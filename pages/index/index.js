//index.js
const urls = getApp().globalData.urls;
const utils = require('../../utils/utils.js');
Page({
  data: {
    bannerImageList: [],
    postItemList: [],
    COUNT: 9,
    threadline: [],
    auth: {}
  },
  onLoad: function() {
    this.setData({
      bannerImageList: [
        'https://blob.steamcn.com/block/dc/dc42e0fd096fa9558967b35e981c90ff.jpg',
        'https://blob.steamcn.com/block/e6/e681511945bdd8fe38c083fa4cbe7031.jpg',
        'https://blob.steamcn.com/block/6f/6faf62af885ee59d993f605661599d3b.jpg'
      ],
      threadline: [{
        user: {
          username: 'wu360463231',
          avatar: 'https://steamcn.com/uc_server/avatar.php?uid=52394&size=small'
        },
        section: '平台研讨',
        title: '【18-08-25 更新】Steamcommunity 302 Ver.6【修复Steam社区访问】',
        stats: {
          viewed: 1505166,
          replied: 3189
        },
        url: 'https://steamcn.com/t339527-1-1'
      }, {
        user: {
          username: '寒冬之握',
          avatar: 'https://steamcn.com/uc_server/avatar.php?uid=206629&size=small'
        },
        section: '游戏互鉴',
        title: '《Strange Brigade 奇异小队》——夺宝奇兵的埃及之旅',
        stats: {
          viewed: 83,
          replied: 3
        },
        url: 'https://steamcn.com/t419388-1-1'
      }, {
        user: {
          username: 'heroo945',
          avatar: 'https://steamcn.com/uc_server/avatar.php?uid=224301&size=small'
        },
        section: '慈善包',
        title: '[08.29]Humble Bundle 新主包 Humble Digital Tabletop Bundle 上线',
        stats: {
          viewed: 548,
          replied: 54
        },
        url: 'https://steamcn.com/t419404-1-1'
      }, {
        user: {
          username: 'zxrzy',
          avatar: 'https://steamcn.com/uc_server/avatar.php?uid=300369&size=small'
        },
        section: '购物心得',
        title: '【18-8-29】【特价促销】 Far Cry（孤岛惊魂）系列特惠',
        stats: {
          viewed: 157,
          replied: 7
        },
        url: 'https://steamcn.com/t419401-1-1'
      }]
    });
    this.init();
  },
  init() {
    /*wx.showLoading({
      title: '数据加载中...',
    });*/
    this.setData({
      auth: {}
    });
    let auth = utils.ifLogined();
    //this.initSwiper();
    this.getBannerImageList();
    this.getThreadLine(true);
  },
  initSwiper() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          swiperHeight: `${(res.windowWidth || res.screenWidth) / 108 * 36}px`
        })
      },
    })
  },
  getBannerImageList() {

  },
  getThreadLine(reload) {

  }
})