const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let ifLogined = () => {
  let auth = wx.getStorageSync('auth') || {}
  if (auth.token && auth.uid) {
    return auth
  }
  return false
}

let navigatItem = (e) => {
  const url = e.currentTarget.dataset.url || '/pages/index/index'
  const open = e.currentTarget.dataset.open
  const toUrl = () => {
    wx.navigateTo({
      url,
    })
  }
  if (open) {
    toUrl()
  } else {
    if (ifLogined()) {
      toUrl()
    } else {
      wx.navigateTo({
        url: '/pages/my/login/login'
      })
    }
  }
}

let toThreadDetail = (e) => {
  let item = e.currentTarget.dataset.item;
  wx.navigateTo({
    url: `/pages/thread/thread?url=${item.url}&title=${item.title}`
  })
}

module.exports = {
  formatTime,
  ifLogined,
  navigatItem,
  toThreadDetail
}