# SteamCN 蒸汽动力论坛 微信小程序

这是 SteamCN 蒸汽动力论坛微信小程序。您可以使用本小程序查看 SteamCN 论坛上的帖子。当然前提是您有能正常使用的微信~

## 小程序功能

- 浏览 SteamCN 论坛中帖子的内容及坛友回复
- 登录论坛账号，访问有阅读权限的帖子
- 查看最新有价值的帖子
- 查看近期最热门的帖子
- 查看最新回复的帖子
- 分板块查阅帖子
- 记录小程序中的看帖历史

更多开发计划见：https://github.com/xPixv/SteamCN-Mini-Program/projects/1

## 现在就扫码体验吧~

![QRCode](resources/qrcode.jpg)

## 部分截图展示

### 主页

![Home](resources/Home.jpg)

### 查看帖子

![Thread Preview](resources/Thread.gif)

### 板块查看

![Section](resources/Section.gif)

### 微信分享

![Share](resources/Share.jpg)

## 更新日志

见 CHANGELOG：https://github.com/xPixv/SteamCN-Mini-Program/blob/master/CHANGELOG.md

## 反馈建议

在 issue 中进行反馈：https://github.com/xPixv/SteamCN-Mini-Program/issues

## 开发步骤

开发环境：
- [Node.js](https://nodejs.org) (>=8.0.0)
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

1. Clone 仓库 `master` 分支到本地
2. 安装项目，执行 `npm install` 或者 `yarn install` (推荐使用 yarn)，等待安装完成
3. 进入项目目录，运行 `npm run dev:weapp` 或者 `yarn dev:weapp`，等待 Taro 编译项目为微信小程序
4. 使用微信开发者工具，打开项目目录下的 `dist` 文件夹即可预览和调试

## 开源许可

本小程序使用 [MIT](https://github.com/xPixv/SteamCN-Mini-Program/blob/master/LICENSE) 许可发布源代码

## Open Source Credit ❤

- [Taro](https://github.com/NervJS/taro) —— MIT
- [Taro UI](https://github.com/NervJS/taro-ui) —— MIT
- [Parser](https://github.com/jin-yufeng/Parser) —— Unlicensed
- [dayjs](https://github.com/iamkun/dayjs) —— MIT
- [node-html-parser](https://github.com/taoqf/node-html-parser) —— Unlicensed
- [SteamCN 论坛](https://steamcn.com)及 SteamCN 论坛 App 资源
