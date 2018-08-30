// pages/my/history/history.js
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
    wx.getStorage({
      key: 'history',
      success: (res) => {
        this.setData({
          threadline: res.data
        });
      },
      fail: (res) => {
        wx.showToast({
          title: '先刷刷论坛吧 XD',
          icon: 'none',
          duration: 3500
        });
      }
    });
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

  }
})