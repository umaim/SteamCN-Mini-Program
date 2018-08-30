// components/postItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toThreadDetail(e) {
      let item = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/thread/thread?url=${item.url}&title=${item.title}&username=${item.user.username || ''}&replied=${item.stats.replied}&viewed=${item.stats.viewed}`
      });
    }
  }
})