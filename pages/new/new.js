// pages/new/new.js
const DomParser = require('../../lib/xmldom/dom-parser.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    threadline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中',
    });
    this.requestNewRepliedThread();
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
    this.requestNewRepliedThread();
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
      title: 'SteamCN 蒸汽动力 - 最新回复',
      desc: '分享自蒸汽动力 SteamCN 小程序第三方版',
      path: `/pages/new/new`
    };
  },

  /**
   * 请求最新回复内容
   */
  requestNewRepliedThread: function() {
    wx.request({
      url: 'https://steamcn.com/forum.php?mobile=no',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res.data);
          let data = res.data;
          let Parser = new DomParser.DOMParser();
          let dom = Parser.parseFromString(data);

          let threadlist = this.parseThreadList(dom);
          this.setData({
            threadline: threadlist
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


  /**
   * 解析主题列表
   */
  parseThreadList: function(dom) {
    let threadlineDom = dom.getElementById('portal_block_433_content');
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