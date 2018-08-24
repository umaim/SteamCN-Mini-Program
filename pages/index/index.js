//index.js
const urls = getApp().globalData.urls;
const utils = require('../../utils/utils.js');
Page({
  data: {
    bannerImageList: [],
    //swiperHeight: 'auto',
    postItemList: [],
    COUNT: 9,
    auth: {}
  },
  onLoad: function() {
    this.setData({
      bannerImageList: [
        'https://blob.steamcn.com/block/59/59f3fa9ef9a50f749cf23580cc15b4f0.jpg',
        'https://blob.steamcn.com/block/d0/d0739a114a9cd28c1fd5f0213622aff3.jpg',
        'https://blob.steamcn.com/block/70/70e909b4dde9388a59b514600702a1c5.jpg'
      ]
    });
    this.init();
  },
  init() {
    wx.showLoading({
      title: '数据加载中...',
    });
    this.setData({
      auth: {}
    });
    let auth = utils.ifLogined();
    //this.initSwiper();
    this.getBannerImageList();
    this.getPostItemList(true);
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
  getPostItemList(reload) {

  }
})