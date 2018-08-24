// pages/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundList: [
      'resources/img/background0.jpg',
      'resources/img/background1.jpg',
      'resources/img/background2.jpg',
      'resources/img/background3.jpg',
      'resources/img/background4.jpg',
      'resources/img/background5.jpg',
      'resources/img/background6.jpg',
      'resources/img/background7.jpg',
      'resources/img/background8.jpg'
    ],
    backgroundImage: 'resources/img/background0.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      backgroundImage: this.data.backgroundList[Math.floor(Math.random() * 9)]
    })
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

  }
})