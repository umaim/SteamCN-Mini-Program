// components/sectionItem/sectionItem.js
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
    toSectionList(e) {
      let item = e.currentTarget.dataset.item;
      console.log(item);
      wx.navigateTo({
        url: `/pages/section/rssThreadList/rssThreadList?title=${item.title}&desc=${item.desc}&fid=${item.fid}`
      });
    }
  }
})