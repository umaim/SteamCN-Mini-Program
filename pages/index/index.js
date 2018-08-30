//index.js
const DomParser = require('../../lib/xmldom/dom-parser.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerImageList: [],
    threadline: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中',
    });
    this.requestHome();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.requestHome();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'SteamCN 蒸汽动力',
      desc: '分享自蒸汽动力 SteamCN 小程序第三方版',
      path: `/pages/index/index`
    };
  },

  /**
   * 页面导航
   */
  toThreadDetail(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/thread/thread?url=${item.url}&title=${item.title}&username=${item.user.username || ''}&replied=${item.stats.replied}&viewed=${item.stats.viewed}`
    })
  },

  /**
   *  请求论坛主页，获取图片轮播及最新主题信息，并设置必要的参数
   */
  requestHome() {
    wx.request({
      url: 'https://steamcn.com/forum.php?mobile=no',
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.statusCode === 200) {
          //console.log(res.data);
          let data = res.data;
          let Parser = new DomParser.DOMParser();
          let dom = Parser.parseFromString(data);
          // 解析 Swiper 数据
          let bannerImageList = this.parseImageList(dom);
          // 解析 ThreadLine 数据
          let threadline = this.parseThreadLine(dom);
          this.setData({
            bannerImageList: bannerImageList,
            threadline: threadline
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: `网络开了个小差👻`,
          duration: 1500,
          icon: 'none'
        });
      },
      complete: (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      },
    });
  },

  /**
   * 解析Swiper所需数据
   */
  parseImageList(dom) {
    let imageListDom = dom.getElementById('portal_block_431_content');
    let nodelist = imageListDom.childNodes["0"].childNodes[1].childNodes;
    let result = [];
    for (let i = 0; i < nodelist.length; i++) {
      let imageUrl = nodelist[i].childNodes["0"].childNodes["0"].attributes["0"].nodeValue;
      let wholeTitle = nodelist[i].childNodes["0"].childNodes["0"].attributes[3].nodeValue
      let titleLines = wholeTitle.trim().split('\n');
      let section = titleLines[0].substr(4);
      let username = titleLines[1].match(/:([\S\s]*)\(/)[1];
      let viewed = titleLines[2].match(/: (\d*) \//)[1];
      let replied = titleLines[2].match(/回复: (\d*)/)[1];
      let title = nodelist[i].childNodes[1].childNodes["0"].data;
      title = title.replace(/&amp;/g, '&');
      let url = `https://steamcn.com/${nodelist[i].childNodes["0"].attributes["0"].nodeValue}`;
      result.push({
        user: {
          username: username
        },
        section: section,
        title: title,
        stats: {
          viewed: viewed,
          replied: replied
        },
        url: url,
        imageUrl: imageUrl
      });
    }
    //console.log(result);
    return result;
  },

  /**
   * 解析 ThreadLine 数据
   */
  parseThreadLine(dom) {
    let threadlineDom = dom.getElementById('portal_block_432_content');
    let nodelist = threadlineDom.childNodes["0"].childNodes[1].childNodes;
    let result = [];
    for (let i = 0; i < nodelist.length; i++) {
      let url = `https://steamcn.com/${nodelist[i].childNodes[1].attributes["0"].nodeValue}`
      let username = nodelist[i].childNodes["0"].childNodes["0"].childNodes["0"].data;
      let uid = nodelist[i].childNodes["0"].childNodes["0"].attributes["0"].value.substr(5);
      let avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=small`;
      let wholeTitle = nodelist[i].lastChild.attributes[1].value;
      let titleLines = wholeTitle.trim().split('\n');
      let section = titleLines[0].substr(4);
      let viewed = titleLines[2].match(/: (\d*) \//)[1];
      let replied = titleLines[2].match(/回复: (\d*)/)[1];
      let temp = nodelist[i].childNodes[1].firstChild;
      let title = '';
      if (temp.nodeType === 1) { //Element
        title = temp.childNodes.toString();
      } else if (temp.nodeType === 3) { //Text
        title = temp.toString();
      }
      title = title.replace(/&amp;/g, '&');
      result.push({
        user: {
          username: username,
          avatar: avatar
        },
        section: section,
        title: title,
        stats: {
          viewed: viewed,
          replied: replied
        },
        url: url
      });
    }
    //console.log(result);
    return result;
  }
})