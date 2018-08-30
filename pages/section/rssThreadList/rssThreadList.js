// pages/section/rssTheadList/rssThreadList.js
const DomParser = require('../../../lib/xmldom/dom-parser.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    desc: '',
    fid: '',
    threadline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      title: options.title,
      desc: options.desc,
      fid: options.fid
    });
    wx.showLoading({
      title: '数据加载中',
    });
    this.requestRSS();
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

  },

  requestRSS() {
    wx.request({
      url: `https://steamcn.com/forum.php?mod=rss&fid=${this.data.fid.substr(1)}`,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.statusCode === 200) {
          let data = res.data;
          //console.log(data);
          let Parser = new DomParser.DOMParser();
          let dom = Parser.parseFromString(data);
          let threadline = this.parseRSS(dom);
          this.setData({
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
    })
  },

  parseRSS(dom) {
    let items = dom.getElementsByTagName('item');
    let result = [];
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      let title = items[i].childNodes[1].firstChild.data;
      let url = items[i].childNodes[3].firstChild.data;
      let section = items[i].childNodes[7].firstChild.data;
      let desc = '';
      if (items[i].childNodes[5].childNodes.length > 0) { // 判断是否有 desc
        desc = items[i].childNodes[5].firstChild.data;
        desc = this.normalizeDesc(desc);
      }
      let username = items[i].childNodes[9].firstChild.data;
      let date = '';
      let enclosure = '';
      if (items[i].childNodes[11].nodeName === 'enclosure') {
        enclosure = items[i].childNodes[11].attributes["0"].value;
        date = items[i].childNodes[13].firstChild.data;
      } else {
        date = items[i].childNodes[11].firstChild.data;
      }
      //date = new Date(date).toLocaleString();
      result.push({
        user: {
          username: username
        },
        section: section,
        title: title,
        url: url,
        desc: desc,
        date: date,
        enclosure: enclosure,
        stats: {
          replied: '',
          viewed: ''
        }
      })
    }
    console.log(result);
    return result;
  },

  /**
   * 标准化desc描述内容
   */
  normalizeDesc(desc) {
    desc = desc.replace(/\r\n/g, ''); //去除换行
    desc = desc.replace(/\[sframe\](\d*)\[\/sframe\]/g, ''); // 去除 sframe
    desc = desc.replace(/\[steamlink\]([\S\s]*)\[\/steamlink\]/g, ''); // 去除 steamlink
    desc = desc.replace(/\[spoil\]|\[\/spoil\]/g, ''); //去除 spoil
    desc = desc.replace(/\[backcolor\]|\[\/backcolor\]/g, ''); // 去除 backcolor
    desc = desc.replace(/((http|https|ftp)?:\/\/)(\w|\/|\.|\?|=)*/g, ''); //去除链接，防止描述溢出
    return desc;
  }
})