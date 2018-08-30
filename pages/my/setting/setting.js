// pages/my/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historySize: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'history',
      success: (res) => {
        if (res.data.length === 0) {
          this.setData({
            historySize: 0
          })
        } else {
          wx.getStorageInfo({
            success: (res) => {
              this.setData({
                historySize: res.currentSize
              })
            },
            fail: (res) => {
              historySize: 0
            }
          });
        }
      },
      fail: (res) => {
        this.setData({
          historySize: 0
        })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  clearHistory() {
    wx.removeStorage({
      key: 'history',
      success: (res) => {
        this.setData({
          historySize: 0
        })
        wx.showToast({
          title: '清除成功',
          icon: 'success',
          duration: 1500
        });
      },
      fail: (res) => {
        wx.showToast({
          title: '清除失败😱',
          icon: 'none',
          duration: 1500
        });
      }
    })
  }
})