// pages/thread/thread.js
const WxParse = require('../../lib/wxParse/wxParse.js');
const DomParser = require('../../lib/xmldom/dom-parser.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    title: '',
    username: '',
    avatar: '',
    replied: '',
    viewed: '',
    postTime: '',
    threadContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options);
    this.setData({
      url: options.url,
      title: options.title,
      username: options.username,
      replied: options.replied,
      viewed: options.viewed
    });
    wx.showLoading({
      title: '数据加载中',
    });
    this.requestThread(this.data.url);
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
    return {
      title: this.data.title,
      desc: '分享自蒸汽动力 SteamCN 小程序第三方版',
      path: `/pages/thread/thread?url=${this.data.url}&title=${this.data.title}&username=${this.data.username || ''}&replied=${this.data.replied}&viewed=${this.data.viewed}`
    };
  },

  // 请求帖子内容，并设置必要的参数
  requestThread(url) {
    wx.request({
      url: this.normalizeMobileThreadURL(url),
      data: '',
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
          if (dom.getElementsByTagName('body').toString().indexOf('安全提问(未设置请忽略)') > -1) { //需要登录才可查看
            wx.hideLoading();
            wx.showToast({
              title: '本帖需要登录才可查看😭',
              icon: 'none',
              duration: 3500
            })
          } else { // 无需登录，可正常查看
            // 帖子内容
            let htmlStr = dom.getElementsByTagName('body')["0"].childNodes[9].childNodes[3].childNodes[3].childNodes[3].childNodes.toString().split('<div class="plc cl"')[0];
            //let pid = dom.getElementsByTagName('body').toString().match(/id="pid(\d*)"/)[1];
            //let htmlStr = dom.getElementById(`pid${pid}`).childNodes[3].childNodes[3].childNodes.toString();
            htmlStr = this.normalizeHTML(htmlStr);

            // 完整标题
            let title = dom.getElementsByTagName('body')["0"].childNodes[9].childNodes[1].firstChild.data.split('\n').pop();

            // 发帖时间
            let postTime = dom.getElementsByTagName('body')["0"].childNodes[9].childNodes[3].childNodes[3].childNodes[1].childNodes[3].childNodes[2].toString().trim().replace('&amp;nbsp;', ' ');

            // 头像
            let avatar = dom.getElementsByTagName('body')["0"].childNodes[9].childNodes[3].childNodes[1].childNodes["0"].attributes["0"].nodeValue;
            this.setData({
              threadContent: htmlStr,
              postTime: postTime,
              avatar: avatar,
              title: title
            });
            //console.log(this.data.threadContent);
            WxParse.wxParse('article', 'html', this.data.threadContent, this, 15);
          }
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
      }
    });
  },

  /**
   * 将请求获取的内容标准化
   */
  normalizeHTML(htmlStr) {
    htmlStr = htmlStr.replace(/\sxmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, ''); // 去掉xmlns
    htmlStr = htmlStr.replace(/[\r\n]/g, ''); //去掉回车换行
    htmlStr = htmlStr.replace(/(<br\/>){2,}/g, '<br/><br/>'); //去多余换行
    htmlStr = htmlStr.replace(/src="forum.php/g, 'src="https://steamcn.com/forum.php'); //相对地址添加域名
    htmlStr = htmlStr.replace(/src="static/g, 'src="https://steamcn.com/static');
    htmlStr = htmlStr.replace(/href="forum.php/g, 'href="https://steamcn.com/forum.php');
    htmlStr = htmlStr.replace(/font size="7"/g, 'font size="6"'); // 最大字号为 6
    htmlStr = htmlStr.replace(/size=140x140/g, 'size=2000x550'); // 修改图片为全图
    htmlStr = htmlStr.replace(/color="#ff00"/g, 'color=#ff0000'); // 更改红色Hex，否则无法显示
    htmlStr = htmlStr.replace(/&amp;/g, '&'); // 转义实体符
    htmlStr = htmlStr.trim();
    //console.log(htmlStr);
    return htmlStr;
  },

  /**
   * 将短URL转为触屏版URL
   */
  normalizeMobileThreadURL(url) {
    //From: https://steamcn.com/t339527-1-1
    //To: https://steamcn.com/forum.php?mod=viewthread&tid=339527&mobile=2
    let temp = url.split('/').pop();
    let tid = temp.substr(1, temp.indexOf('-') - 1);
    let mobileURL = `https://steamcn.com/forum.php?mod=viewthread&tid=${tid}&mobile=2`;
    return mobileURL;
  },

  /**
   * 点击链接事件
   */
  wxParseTagATap(e) {
    let url = e.currentTarget.dataset.src;
    if (url.indexOf('https://steamcn.com/forum.php?mod=viewthread&tid') === -1) { // 防止点击图片触发剪切板事件
      wx.setClipboardData({
        data: url,
        success() {
          wx.showToast({
            title: `链接已复制`,
            duration: 1500,
            icon: 'success'
          })
        },
      });
    }
  }
})