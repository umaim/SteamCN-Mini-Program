// pages/thread/thread.js
const WxParse = require('../../wxParse/wxParse.js')
const utils = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    title: '',
    threadContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      url: options.url,
      title: options.title,
      threadContent: `
 <i class="pstatus"> 本帖最后由 breastsexy 于 2018-7-30 02:51 编辑 </i><br>
<br><br>
<div align="center"><font face="&amp;quot;"><font size="6"><strong>[SteamDB 使用指南]</strong></font></font></div><div align="center">Last Update: 2017-12-05 | By Cloud</div><br>
<font face="微软雅黑">&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Steam 商店经常打折，历史最低价格是多少？国区购买是不是锁运行，出国了能不能玩呢？零售商的Key锁运行么？锁语言么？<a href="https://steamdb.info/" target="_blank">SteamDB</a> 有什么实用又方便的功能呢？希望这篇指南能帮助到你们~<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;入 Steam 坑有段时间了，从不知道 SteamDB 这个网站，摸爬滚打到现在可以简单使用，SteamDB 其实还有很多功能可以发掘，本着授人以鱼不如授人以渔的想法写下这篇指南，希望能帮助到你们。（已经可以熟练使用的大佬可能会觉得这篇指南写的很啰嗦，纯萌新向嘛 _(:зゝ∠)_）<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;如果有任何相关的问题，可以在本指南下留言，作者水平有限，如有错误之处，还请指教 Orz~<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<strong><font size="4"><font color="#ff00ff">Steam 指南版本：<a href="http://steamcommunity.com/sharedfiles/filedetails/?id=1220481151" target="_blank">http://steamcommunity.com/sharedfiles/filedetails/?id=1220481151</a></font></font></strong><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<strike>Keylol (其乐) 版本：<a href="https://www.keylol.com/article/24680/1" target="_blank">https://www.keylol.com/article/24680/1</a></strike>&nbsp;&nbsp;RIP Keylol 🕯<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;该教程配合 <a href="https://steamdb.info/extension/" target="_blank">SteamDB 官方的浏览器拓展</a> 以及 <a href="http://www.enhancedsteam.com/" target="_blank">Enhanced Steam 浏览器插件</a> 服用效果更佳。<span class="bbcode_spoiler"><span class="bbcode_spoiler_content">（一定会用到这两个插件 _(:зゝ∠)_）</span></span><br>
<br>
<font size="1"><strong>2017年04月04日 修订：</strong><br>
</font></font><ul><li><font face="微软雅黑"><font size="1"> 新增隐藏成就查询</font></font></li><li> <font face="微软雅黑"><font size="1">名词统一，美化排版 <span class="bbcode_spoiler"><span class="bbcode_spoiler_content">(还是这么丑 _(:зゝ∠)_)</span></span></font></font></li><li><font face="微软雅黑"><font size="1"> 修改 Depot 和 Package 的不严谨的表述</font></font></li><li><font face="微软雅黑"><font size="1"> 修改措辞不合理若干处</font></font></li><li><font face="微软雅黑"><font size="1"> 新增少量表情包</font></font><br>
</li></ul><font face="微软雅黑"><font size="1"><strong>2017年 9月20日 修订：</strong></font></font><ul><li><font face="微软雅黑"><font size="1"> 新增 Patch Note 更新说明</font></font></li><li><font face="微软雅黑"><font size="1"> 新增 Stats 统计</font></font></li><li><font face="微软雅黑"><font size="1"> 删除 Broadcast 广播，并入 Stats</font></font></li><li><font face="微软雅黑"><font size="1"> 网站UI更新，更新部分图片</font></font></li><li><font face="微软雅黑"><font size="1"> 统一并美化排版 <span class="bbcode_spoiler"><span class="bbcode_spoiler_content"> 一如既往地丑_(:зゝ∠)_ </span></span></font></font></li><li><font face="微软雅黑"><font size="1"> 对某些表述不清楚地方进行补充和措辞</font></font></li><li><font face="微软雅黑"><font size="1">修改目录及致谢</font><br>
</font><br>
</li></ul><font face="微软雅黑"><font size="1"><strong>2017年 9月23日 修订：</strong><br>
</font></font><ul><li><font face="微软雅黑"><font size="1"> 新增获取免费游戏脚本</font></font></li><li><font face="微软雅黑"><font size="1"> 新增即时搜索功能</font></font></li><li><font face="微软雅黑"><font size="1"> 新增Steam服务器状态查询</font></font></li><li><font face="微软雅黑"><font size="1"> 修改部分目录描述</font><br>
</font><br>
</li></ul><font face="微软雅黑"><font size="1"><strong>2017年 9月28日 修订：</strong></font></font><ul><li><font face="微软雅黑"><font size="1"> 更新SteamDB评分算法</font><br>
</font><br>
</li></ul><font face="微软雅黑"><font size="1"><br>
<strong>2017年10月26日 修订：</strong></font></font><ul><li><font face="微软雅黑"><font size="1"> 新增不同订阅之间比较<br>
</font></font></li><li><font face="微软雅黑"><font size="1"> 二楼新增SteamDB相关技巧</font><br>
</font><br>
</li></ul><font face="微软雅黑"><font size="1"><strong>2017年12月05日 修订：</strong></font></font><ul><li><font face="微软雅黑"><font size="1">更新大量陈旧内容</font></font></li><li><font face="微软雅黑"><font size="1">图片大部分使用 Steam 指南中的图片</font></font></li><li><font face="微软雅黑"><font size="1">更新部分表达错误之处</font></font><br>
</li></ul><div align="center"><img src="https://steamcn.com/static/image/smiley/steamcn_5/kbc110.gif" border="0" alt=""></div><br>
<br>
<br>
<div align="right"><strong>2016年12月12日</strong></div><div align="right"><strong>——Cloud</strong></div><br>
<br> <br>
<div align="center"><font size="6"><strong>[SteamDB 简介]</strong></font></div><br> <div class="grey quote"><blockquote>引用: SteamDB was created to give more insight into the Steam database. We track updates for both applications and packages, we keep a history of all changes made to both applications and packages. We also have a range of other tools such as the Calculator to give people insight into their Steam accounts that would otherwise be impossible.</blockquote></div><br>
<strong>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<a href="https://steamdb.info/" target="_blank">SteamDB</a></strong> 是一个关于Steam数据库的一个网站，这个网站的建立是为了让用户更深入了解Steam数据库。它可以追溯 应用(Application) 和 包(Package) 的更新情况并将他们保存在历史中。同时也提供一些像 <a href="https://steamdb.info/calculator" target="_blank">Calculator</a> 一样的工具给用户，让用户更了解自己的Steam账户。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;这个网站可以提供Steam中游戏的各种数据，如 当前打折游戏、游戏价格历史变动、游戏限制（锁区情况、锁运行状况、锁语言情况）、游戏DLC查询、游戏内容变动历史查询、简单的成就查询等。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;网站的创建者及维护者：<br> <div class="grey quote"><blockquote>引用: xPaw made and hosts the website you're staring at right now, he also developed an application that takes store prices, and shows them on this website.<br>
<br>
Marlamin hosts and develops the applications that take the Steam information and output it to something we can show you on the website. He also made the predecessor to SteamDB, "CDR parser".</blockquote></div><br>
xPaw (<a href="https://steamcommunity.com/id/xpaw" target="_blank">Steam</a>, <a href="https://twitter.com/thexpaw" target="_blank">Twitter</a>, <a href="http://xpaw.ru/" target="_blank">Website</a>) 创建及维护你所看到的网站，并且开发获取Steam商店价格并将价格显示在网站上的功能。<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Marlamin (<a href="https://steamcommunity.com/id/marlamin" target="_blank">Steam</a>, <a href="https://twitter.com/marlamin" target="_blank">Twitter</a>, <a href="http://marlamin.com/" target="_blank">Website</a>) 参与维护网站，并且开发获取Steam的信息并将这些信息显示在网站上。同时他也是SteamDB的前身“CDR parser”的创建者。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;SteamDB 的 GitHub：<a href="https://github.com/SteamDatabase" target="_blank">https://github.com/SteamDatabase</a><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;如果喜欢这个网站，可以到该网站的 <a href="https://steamdb.info/donate/" target="_blank">Donate页面</a> 用PayPal对其进行捐赠，网站会将你记录在捐赠者的名单中，并且在你的SteamDB的个人主页上留下一个<font color="#ff8c00"><strong>金灿灿的DONATOR</strong></font>徽章。<br>
<br> <br>
<div align="center"><strong><font size="6">[部分重要名词解释]</font></strong></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;很多刚开始接触 Steam 以及 SteamDB 的同学可能存在一个误区：应用就是一个游戏；包就是在商店里面买的几个游戏或DLC的集合。其实不然下面就几个重要名词进行解释。<br>
<br>
<ul><li><strong>应用 (Application) (下简称：App)</strong><font face="&amp;quot;">：应用官方定义是 Game、Application、DLC、Tool以及Demo中的一种，它就是一个游戏/应用/DLC/工具/试玩版。在SteamDB中将其分的更细，分为：Application、Config、DLC、Demo、Depot(Not Used)、Driver、Game、Guide、Hardware、Legacy Media、Music、Plugin、Series、Tool、Unknown、Video。在 Steam 商店或 SteamDB 中的浏览器地址栏处是 app/XXXXX 的则是 App。如</font><font face="&amp;quot;"> </font><font face="&amp;quot;"><a href="http://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/" target="_blank" class="steamInfoLink linkOwn">The Witcher 3: Wild Hunt</a><div style="display:none" class="steamInfoWrapper" id="steam_info_app_292030_1"><div class="png_loading"></div><iframe frameborder="0" allowtransparency="true" src="https://steamdb.steamcn.com/tooltip?v=4#app/292030#steam_info_app_292030_1">Loading</iframe></div></font><font face="&amp;quot;"> </font><font face="&amp;quot;">的链接是 app/292030，说明所看到的是一个App。</font><br>
</li></ul><br>
<ul><li><strong>应用标识 (Application ID , AppID)</strong>：每个应用都有一个数字 ID 来唯一确定，不同 App 的 AppID 是不同的。 如 <a href="http://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/" target="_blank" class="steamInfoLink linkOwn">The Witcher® 3: Wild Hunt</a> 的 AppID 是 292030，而 <a href="http://store.steampowered.com/app/570/Dota_2/" target="_blank" class="steamInfoLink linkOwn">Dota 2</a> 的 AppID 是 570。<br>
</li></ul><br>
<ul><li><strong>仓库 (Depot)</strong>：仓库是真正承载游戏文件内容的地方，你下载下来的游戏其实是游戏的一个或多个仓库。如锁语言情况则是由仓库控制的，只有你拥有某个语言的仓库，你才能用这个语言进行游戏。仓库有它的大小、适用的操作系统等信息。同一个游戏在不同的操作系统上下载的是不同的仓库，这也很好的理解同一个游戏多平台的特性。如果开发商发现 Mac OS X 系统上发现了 Bug，修复后仅仅需要修改 Mac OS X 的仓库即可，而不用修改 Windows 以及 Linux 的仓库。<br>
</li></ul><ul><br>
<li><strong>仓库标识 (Depot ID)</strong>：像 App 一样，每个仓库也有一个数字 ID 来唯一确定，不同 Depot 的 Depot ID 不同，对应着不同的文件内容。如 <a href="https://steamdb.info/app/292030/depots/" target="_blank">The Witcher® 3: Wild Hunt - Depots</a> 的 Depots 表格中最左边一列的 ID 则是仓库标识。<br>
</li></ul><font face="Segoe UI, Segoe, Segoe WP, Tahoma, Microsoft YaHei, sans-serif"><br>
</font><ul><li><strong>订阅 / 包 (Subscription / Package) (下简称：Sub / 订阅)</strong>：订阅是一个或多个 App 及 Depot 的集合。无论你在 Steam 商店中买的是 一个游戏、一个DLC、多个游戏/DLC的捆绑包 还是 在零售商那里买来激活的 CD-Key 都是在账户中增加一条订阅。当你购买或者激活一个订阅后，你便有权下载以及启动这个订阅中的内容。在 Steam 商店或 SteamDB 中的浏览器地址栏处是 sub/XXXXX，说明所看到的是一个 Sub。<br>
</li></ul><br>
&nbsp; &nbsp;&nbsp; &nbsp; 在 <a href="https://steamdb.info/app/292030/subs/" target="_blank">The Witcher® 3: Wild Hunt - Packages</a> 页面中的 Packages that include this app 表格中列出了所有包含 AppID 为 292030 的所有订阅。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp; 表格中名字后有蓝色地球 🌍 的为商店目前在售的 Sub，该 Sub 可以通过 Steam 商店获得，其余没有蓝色地球的为其他方式获得的 Sub（CD-Key、免费获得等）或者以前在商店出售后来下架的 Sub。<br>
<br>
<div align="center"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346064105428/6871351263B7D7C0281BD9ECDF40554C4F1267C9/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064105428/6871351263B7D7C0281BD9ECDF40554C4F1267C9/" style="display: inline; visibility: visible;"></div><br>
<br>
<ul><li><strong>订阅标识 / 包标识 (Subscription ID / SubID)</strong>：同样，每一个订阅也有一个数字 ID 来唯一确定，不同 Sub 的 SubID 不同，也就可能包含不同的 App 和 Depot。如 <a href="https://steamdb.info/app/292030/depots/" target="_blank">The Witcher® 3: Wild Hunt - Packages</a> 页面中的 Packages that include this app 表格最左边一列 SUBID 即是 SubID。<br>
</li></ul><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下面理一下这几个名词的关系：<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在商店中购买游戏或激活 CD-Key 其实是进行一次订阅，在 <a href="https://store.steampowered.com/account/licenses/" target="_blank">账户许可信息</a> 中添加一条订阅信息（Subscription），Sub 里面包含了 App 及 Depot。如购买 <a href="http://store.steampowered.com/sub/124923/" target="_blank" class="steamInfoLink linkOwn">The Witcher 3: Wild Hunt - Game of the Year Edition</a> 便是完成了SubID 124923 的订阅，SubID 124923 包含的 App 以及 Depot 可以在<a href="https://steamdb.info/sub/124923/" target="_blank">该 Sub 的 SteamDB 页面</a>[steamdb.info] 中相应的标签中找到（如下图所示）。其中 App 会在 Steam 的库中以游戏、应用、DLC或工具显示，而 Depots 不会直接显示在库中，仅仅在你下载游戏的时候，下载 Sub 中包含的 Depots。<br>
<br>
<div align="center"><img width="224" height="147" src="https://steamuserimages-a.akamaihd.net/ugc/867370346063868916/1FFF52E15E73DA2C478F80EBBFBC56686D47A250/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346063868916/1FFF52E15E73DA2C478F80EBBFBC56686D47A250/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; 三者的层级关系如下图所示：<br>
<ul><li>每一个 Sub 至少有一个App，可以没有 Depot（如 Steam Controller 就没有 Depot）</li><li>每个 App 有 0 个至多个 Depot 的内容来支撑其运作，为该 App 服务，如游戏 App 需要的主程序 / 资源文件</li><li>每个 Sub 中可能有 0 至多个其他的 Depot，这些 Depot 大多是一些与游戏主体运行影响较小的内容，如 语言、配音、设定集、官方游戏指南等。<br>
</li></ul><font face="&amp;quot;"><br>
<div align="center"><img width="224" height="323" src="https://steamuserimages-a.akamaihd.net/ugc/867370346063868903/4E505C0EA3DA578AEB8BD37FE26C69492D2306B2/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346063868903/4E505C0EA3DA578AEB8BD37FE26C69492D2306B2/" style="display: inline; visibility: visible;"></div></font><br>
<div align="center">
<a href="forum.php?mod=viewthread&amp;tid=234499&amp;aid=264167&amp;from=album&amp;page=1&amp;mobile=2" class="orange"><img id="aimg_264167" src="forum.php?mod=image&amp;aid=264167&amp;size=140x140&amp;key=6a3be9d111e934b7&amp;type=fixnone" alt="make.jpg" title="make.jpg" zsrc="forum.php?mod=image&amp;aid=264167&amp;size=140x140&amp;key=6a3be9d111e934b7&amp;type=fixnone" style="display: inline; visibility: visible;"></a>
</div><br>
<br> <font face="Segoe UI, Segoe, Segoe WP, Tahoma, Microsoft YaHei, sans-serif"><br>
<div align="center"><strong><font size="6">[游戏历史最低价格]</font></strong></div></font><br>
&nbsp; &nbsp;&nbsp; &nbsp; 从 Steam 商店中打开 SteamDB（需要用到 Enhanced Steam 及 Steam Database 插件）。点击右侧 <strong>“查看 Steam Database” </strong>按钮，可以非常方便的打开该 App 或者 Sub 所对应的 SteamDB 页面。如果同一个页面有多个购买选框，则可以点击“添加至购物车”按钮左边的 <strong>“View on Steam Database (XXXXX)”</strong> 进入 SteamDB 页面，其中 XXXXX 即为所要添加进购物车的 SubID。如下图所示：<br>
<br>
<div align="center"><img width="224" height="114" src="https://steamuserimages-a.akamaihd.net/ugc/867370346063868891/FF255C8C4EF8DA4EBC46F83844BD52FDE6B115FD/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346063868891/FF255C8C4EF8DA4EBC46F83844BD52FDE6B115FD/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 App 或 商店在售 Sub 的 SteamDB 页面中的 “Price” 选项卡中便是 SteamDB 记录的价格历史信息。最右一列（LOWEST RECORDED PRICE）是 SteamDB 记录的历史最低价格，最下面的走势图直观地展示了价格的涨跌，鼠标接近价格变动的节点，就可以看到在那个时间点该游戏的折扣以及价格。<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;如 <a href="https://steamdb.info/app/292030/" target="_blank">The Witcher® 3: Wild Hunt</a> 的价格历史数据：<br>
<br>
<div align="center"><img width="224" height="340" src="https://steamuserimages-a.akamaihd.net/ugc/867370346063953310/327E8913A59B5C8BF836C3515620EA6B852FC4AF/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346063953310/327E8913A59B5C8BF836C3515620EA6B852FC4AF/" style="display: inline; visibility: visible;"></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp; 还有一个方便进入SteamDB的方法是运用论坛的插件。点击常用链接中的 “DB” 可以快速的进入该游戏的SteamDB页面。（如果插件中没有常用链接按钮，可以在 <a href="https://steamdb.steamcn.com/customize" target="_blank">自定义浮动信息窗</a> 设置中将 “常用链接”设置为 显示 ）<br>
<font face="&amp;quot;">&nbsp; &nbsp;&nbsp; &nbsp; 示例链接：<strong><a href="http://store.steampowered.com/sub/124923/" target="_blank" class="steamInfoLink linkOwn">The Witcher 3: Wild Hunt - Game of the Year Edition</a></strong></font><font face="&amp;quot;"><br>
</font><br>
<div align="center">
<a href="forum.php?mod=viewthread&amp;tid=234499&amp;aid=234343&amp;from=album&amp;page=1&amp;mobile=2" class="orange"><img id="aimg_234343" src="forum.php?mod=image&amp;aid=234343&amp;size=140x140&amp;key=98a61743c05be03d&amp;type=fixnone" alt="论坛插件进入STDB" title="论坛插件进入STDB" zsrc="forum.php?mod=image&amp;aid=234343&amp;size=140x140&amp;key=98a61743c05be03d&amp;type=fixnone" style="display: inline; visibility: visible;"></a>
</div><br> <br>
<div align="center"><font face="&amp;quot;"><font size="6"><strong>[锁区、锁运行状态]</strong></font></font></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在开始查看锁区状态的前，需要明白，锁区锁的是订阅（Sub）而不是应用（App）。因为在 Steam 商店购买或者激活 CD-Key 都是 Sub 而不是 App。所以查看锁区和锁运行状态是看的是Sub，同一个 App 不同的 Sub 限制不同。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;以 <a href="http://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/" target="_blank" class="steamInfoLink linkOwn">The Witcher® 3: Wild Hunt</a> 为例，在它 SteamDB 的 <a href="https://steamdb.info/app/292030/subs/" target="_blank">Package 页面</a>。<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 “Packages that include this app” 表格中：<ul><li>NAME 是订阅的名称，通过这个名称 一般（没有清晰的命名规范时则无法判断）可以判断该 Sub 是否存在区域限制等。</li><li>BILLING TYPE 是该 Sub 可以获得的途径，如 Store or CD Key 的可以 Steam 商店 / CD-Key方式获得，仅仅有 CD Key 的就只能通过激活 CD-Key 获得，仅仅有 Store 则只能通过 Steam 商店获得，Free on Demand 免费获得，No Cost 无需成本（与前者的区别是它可以库+1），OEM Ticket 通过专门厂商的 OEM 预装的 Steam 获得，Gift 多人包等礼物获得，等等。</li><li>LAST UPDATED 是 Sub 最后更新的日期。<br>
</li></ul><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;NAME 的命名有一些规律：<br>
<ul><li>包含 RU/CIS 或者 RU 的是俄区 CD-Key 或者商店的 Sub</li><li>包含 EU 的是欧洲区 CD-Key 或者商店 Sub</li><li>包含 JP 的是日本区 CD-Key 或者商店 Sub</li><li>包含 DE 的是德国区 CD-Key 或者商店 Sub</li><li>包含 Asia 的是亚洲区 CD-Key 或者商店 Sub</li><li>包含 Pre-Purchase / Pre-Order 的便是预售的 Sub</li><li>名字右边有个蓝色的小地球的 🌍 是商店目前在售的 Sub，可以在商店页面中查看，这种订阅也会比非商店在售 Sub 多 “Price” 选项卡<br>
</li></ul><br>
<br>
<div align="center"><img width="224" height="298" src="https://steamuserimages-a.akamaihd.net/ugc/867370346064105428/6871351263B7D7C0281BD9ECDF40554C4F1267C9/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064105428/6871351263B7D7C0281BD9ECDF40554C4F1267C9/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;选择你要查询限制的订阅（这里选择 The Witcher 3: Wild Hunt Game + Expansion Pass RU (Sub ID：65621) 巫师3大包的俄区零售Key），点击它的 <a href="https://steamdb.info/sub/65621/" target="_blank">SUBID 处链接</a> 即可进入该 Sub 的 STDB页面 ，在 Infomation 选项卡的 Known restrictions 中便可以看到红色框中锁区及锁运行状态，如下图：<ul><br>
<br>
<br>
<br>
<br>
<br>
<br>
<div align="center"><img width="224" height="99" src="https://steamuserimages-a.akamaihd.net/ugc/867370346064664453/1C48B75663E0309C98589C9EB5FBFA85618A2910/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064664453/1C48B75663E0309C98589C9EB5FBFA85618A2910/" style="display: inline; visibility: visible;"></div><br>
</ul><br>
<div align="left"><ul><li>“This package is <strong><font color="#ff0000">only </font></strong>purchasable in specified countries” 来列出所有<strong><font color="#ff0000">可以</font></strong>购买的国家（没有列出来的就是不能购买），这个 Sub 只允许在这些列出来的国家 IP 中礼物入库或激活CD-Key</li><li>“This package can <strong><font color="#ff0000">NOT </font></strong>be purchased in specified countries” 中的列出了 <font color="#ff0000"><strong>不能</strong> </font>购买的国家（锁区国家），这个 Sub 不允许在这些列出来的国家 IP 中礼物入库或激活CD-Key</li><li>“This package can <strong><font color="#ff0000">only </font></strong>be run in specified countries” 中列出了所有<strong><font color="#ff0000">可以</font></strong>运行的国家，这个 Sub 只允许在这些列出来的国家 IP 中运行游戏</li><li>“This package can <strong><font color="#ff0000">NOT </font></strong>be run in specified countries” 中列出了所有 <font color="#ff0000"><strong>不能</strong> </font>运行的国家，这个 Sub 不允许在这些列出来的国家 IP 中运行游戏</li><li>“No cross region trading and gifting” 历史遗留产物，大概可以不用管它 。<br>
</li></ul></div><br>
<br>
<strong>其中需要说明几点：</strong><br>
<ul type="1" class="litype_1"><li>限制状态没写就是没有，如上面的 The Witcher 3: Wild Hunt Game + Expansion Pass RU，只有购买区域限制，没有写运行限制，那就是没有运行限制</li><li>如果手头的是个礼物，不要将任何非账号区域的低价区礼物添加入库。首先，低价区礼物肯定有礼物激活的国家限制，不使用 魔法上网 这个礼物肯定无法入库，使用 魔法上网 入库就违反了 Steam 用户协议，<strong>有一定的账号风险</strong></li><li>如果手头是 CD-Key，直接激活，如果激活说你的国家不适用，就要谨慎一点。目前没有办法查看一个 Key 的 SubID，所以就要在这个游戏的 App 下的 Sub 中一个一个找，如果全部仅仅是锁激活，没有锁运行没有锁语言，那么就可以使用 魔法上网 激活这个 CD-Key，Sub 中有所激活哪些国家，就挂哪些国家的 魔法上网 试试</li><li>如果 CD-Key 锁激活，查询所有 Sub 中除了有锁激活外还有锁运行的限制，那就要视自己的情况而定了。锁运行的 Sub 在激活后大约 3 个月会解除锁运行限制。如果愿意等这 3 个月，那就使用 魔法上网 激活吧，反之自己处置 CD-Key</li><li>如果 CD-Key 锁激活、锁运行，还锁语言，那么无论过多久，都不会解除锁语言限制，这种 CD-Key <strong>强烈不建议激活</strong>，除非你仅仅是想 +1</li><li>如果安装了 SteamDB的官方浏览器插件，且 Steam 商店为登陆状态，那么在 App 的 Packages<br>
中会绿色高亮你账户中激活的 Sub。（如上上张图片中绿色高亮的 The Witcher 3: Wild Hunt - Game of the Year Edition 和 The Witcher Trilogy Pack）</li><li>如果在 App 的所有 Sub 中都没有发现有限制的，那么无论在什么零售商购买的 CD-Key 都是全球 CD-Key，如 Nioh: Complete Edition 仁王，Sub 全都没有限制，所以在俄区零售站买的就是全球 CD-Key<br>
</li></ul><br> <br>
<div align="center"><font face="&amp;quot;"><font size="6"><strong>[锁语言状态]</strong></font></font></div><br>
锁语言和锁区锁运行有一丢丢的不一样，不会直接写在 Information 中，需要自己对比检查。<br>
<br>
这次以 <a href="http://store.steampowered.com/app/213120/Transformers_Fall_of_Cybertron/" target="_blank" class="steamInfoLink">Transformers™: Fall of Cybertron™</a> 为例，<br>
<br>
首先在 Packages 中找到俄区零售 CD-Key 的 Sub（根据 NAME 判断 SubID：<a href="https://steamdb.info/sub/15992/" target="_blank">15992</a>），查看它的 Depots，找到 3 条记录，说明在这个 Sub 只包含这 3 个 Depot。<br>
<br>
<div align="center"><img width="224" height="106" src="https://steamuserimages-a.akamaihd.net/ugc/867370346064863757/8FC350DAFC71789012139108D9AC6039BE26CA99/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064863757/8FC350DAFC71789012139108D9AC6039BE26CA99/" style="display: inline; visibility: visible;"></div><br>
再在 Packages 中找到全球版的商店在售 Sub（根据小地球和 NAME 判断 SubID：<a href="https://steamdb.info/sub/16213/" target="_blank">16213</a>），查看它的 Depots，找到有 7 条记录，说明这个 Sub 中包含这 7 个 Depot。<br>
<br>
<div align="center"><img width="224" height="159" src="https://steamuserimages-a.akamaihd.net/ugc/867370346064863744/EB23165F0FC1FF79C5BA4D16E073016AC50794F0/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064863744/EB23165F0FC1FF79C5BA4D16E073016AC50794F0/" style="display: inline; visibility: visible;"></div><br>
经过对比发现，同样的游戏，俄区版本比全球版本少了很多 Depot，这些便是缺少的语言选项，如 Content ENU 是英语、Content ITA 是意大利语、Content DEU 是德语等，而俄区版本只有 Content RUS 俄语一个语言相关的 Depot，所以俄区这个 Sub 激活后只有俄语。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下面这个可以练个手 <strong><a href="http://store.steampowered.com/app/331600/" target="_blank" class="steamInfoLink linkOwn">One Piece Pirate Warriors 3（海贼无双3）</a></strong> 的本体俄区Key是否锁语言，那黄金版的俄区Key是否锁语言呢？（答案在下一行的隐藏中） 这也是为什么 <a href="http://steamcn.com/forum.php?mod=redirect&amp;goto=findpost&amp;ptid=233941&amp;pid=3446592&amp;fromuid=283957" target="_blank">这位坛友</a> 会悲剧。<br>
<br>
<div class="showhide"><p>隐藏内容，<a href="javascript:;" onclick="var s=this.parentNode.parentNode.getElementsByClassName('spoiler')[0];'none'==s.style.display?(s.style.display='block',this.innerHTML='点击隐藏') : (s.style.display='none',this.innerHTML='点击显示');">点击显示</a></p><div style="display: none;" class="spoiler">本体是不锁语言的，而黄金版是锁语言的</div></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;锁激活我挂梯子； 锁运行我等！&nbsp;&nbsp;
<a href="forum.php?mod=viewthread&amp;tid=234499&amp;aid=264171&amp;from=album&amp;page=1&amp;mobile=2" class="orange"><img id="aimg_264171" src="forum.php?mod=image&amp;aid=264171&amp;size=140x140&amp;key=cc610db82b812695&amp;type=fixnone" alt="make (3).jpg" title="make (3).jpg" zsrc="forum.php?mod=image&amp;aid=264171&amp;size=140x140&amp;key=cc610db82b812695&amp;type=fixnone" style="display: inline; visibility: visible;"></a>
<br>
<br> <br>
<div align="center"><strong><font size="6">[订阅里的内容]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;很多时候商店的 Sub 界面显示的并不完全，这时候需要自己查看这个 Sub 中包含了哪些 App<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;查看 Sub 中包含了哪些 App 或 Depot，在 Sub 的 SteamDB 界面的 Apps 或 Depots 选项卡中，列出了这个订阅中所包含的 App 或 Depots。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;以 <a href="http://store.steampowered.com/sub/37055/" target="_blank" class="steamInfoLink linkOwn">Might &amp; Magic X - Legacy Digital Deluxe</a> 为例，在商店中只能看到一个 Might &amp; Magic X - Legacy，但是在它的 SteamDB 页面的 <a href="https://steamdb.info/sub/37055/apps/" target="_blank">Apps 标签</a>[steamdb.info]中包含了 5 个 App（如下图所示）。在这里面我们看到了 “Might &amp; Magic VI” 。也就是说，在购买魔法门 10 的数字豪华版版后，会同时拥有魔法门 6。<br>
<br>
<div align="center"><img width="224" height="122" src="https://steamuserimages-a.akamaihd.net/ugc/867370346064965458/78DFDE894333BB5A02BE2192CA6E54B67BC3A592/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064965458/78DFDE894333BB5A02BE2192CA6E54B67BC3A592/" style="display: inline; visibility: visible;"></div><br> 
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;同样，也可以查询 DLC 的 Sub 中包含哪些 App，Steam 购买时有很多重复购买的坑，在购买前需要仔细斟酌一下<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;查询 Sub 中的 Depot 和 App 类似，在 Depots 标签中即可查看<br>
<br>
<div align="center"><img width="224" height="106" src="https://steamuserimages-a.akamaihd.net/ugc/867370346064987233/9D1BF832DE9F3E75AE3E22967923D53233A6761E/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346064987233/9D1BF832DE9F3E75AE3E22967923D53233A6761E/" style="display: inline; visibility: visible;"></div><br> <br>
<div align="center"><strong><font size="6">[不同订阅之间内容比较]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;很多时候，同一个游戏在商店中有很多版本，普通版、白银版、黄金版、豪华版、周年版等，他们之间有哪些内容上的差异呢？需要一个一个Sub点开，比较他们的Depot么？当然不用，SteamDB有个交叉引用的功能，可以很方便地查看不同 Sub 之间，Depot 差异。（这里可能就要问，为什么比较Depot而不比较App呢？因为 Depot 才是承载游戏文件的地方，不同 Depot 游戏内容不同，而同一个App 下 Depot 会不同，所以用App判断是不合理的。同样可以参考前面锁语言查询那一节）<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;以 <a href="http://store.steampowered.com/app/291650/Pillars_of_Eternity/" target="_blank" class="steamInfoLink linkWish">Pillars of Eternity</a> 为例，在它 SteamDB 的 <a href="https://steamdb.info/app/291650/subs/" target="_blank">Packages 标签</a>中列出该 App 的所有 Sub，在表格最下面有个链接：“Cross reference packages and depots for this app”，点击这个链接即可通过一张表格比较该 App 下所有 Sub 内容上的不同。<br>
<br>
<div align="center"><img width="224" height="154" src="https://steamuserimages-a.akamaihd.net/ugc/867370346065597468/51CBF877A2E5BBFD0AA5023C64503A426E19DBF2/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346065597468/51CBF877A2E5BBFD0AA5023C64503A426E19DBF2/" style="display: inline; visibility: visible;"></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;表格中，每一行代表一个 Depot，每一列代表一个 Sub。对勾 ✔ 代表对应的 Sub 中有对应的那个 Depot。这样就可以在一张表格中直观地比较出不同 Sub 的 Depot 区别。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;点击最下面的 “Only show packages available in the store”，即可以只比较商店中在售的 Sub，去掉零售的、已经下架的 Sub。在商店犹豫买哪一个的时候，不妨来这里比较一下。<br>
<br>
<div align="center"><img width="224" height="176" src="https://steamuserimages-a.akamaihd.net/ugc/867370346065615648/C03F430475BC31EB98CF236F1F5805BBF96F30CE/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346065615648/C03F430475BC31EB98CF236F1F5805BBF96F30CE/" style="display: inline; visibility: visible;"></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下面练手可以用这种方式查看 <a href="http://store.steampowered.com/app/213120/Transformers_Fall_of_Cybertron/" target="_blank" class="steamInfoLink">Transformers™: Fall of Cybertron™</a> 的锁语言状态，找出锁语言的 Sub。<br>
<br> <br>
<div align="center"><strong><font size="6">[App 成就信息]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;以 <a href="http://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/" target="_blank" class="steamInfoLink linkOwn">The Witcher® 3: Wild Hunt</a> 为例，在它的 SteamDB 页面中的 <a href="https://steamdb.info/app/292030/stats/" target="_blank">Stats 选项卡</a>[steamdb.info]中 Achievements 表格中便是该 App 的成就信息等统计信息，包括成就名、成就的描述以及成就解锁前后的图标。<br>
<br>
<div align="center"><img width="224" height="213" src="https://steamuserimages-a.akamaihd.net/ugc/867370346065694202/0FDDC553F36529B6036456A6A4C964377D678A6D/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346065694202/0FDDC553F36529B6036456A6A4C964377D678A6D/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp; 隐藏成就的信息没有成就的描述，仅仅能通过其成就名（DISPLAY NAME AND DESCRIPTION 这列） 以及 成就图标 来猜测。如 <a href="https://steamdb.info/app/489520/stats/" target="_blank">Minion Masters - Achievements</a> 里面全是隐藏成就，“Apprentice Collection” 这个成就名翻译过来是 “初级收藏家”，成就图是数字50，这又是个卡牌类游戏，就可以合理猜测是收藏50个不同的卡牌来解锁此成就。<br>
<br> <br>
<div align="center"><font face="&amp;quot;"><strong><font size="6">[商店当前折扣汇总]</font></strong></font></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 SteamDB 的 <a href="https://steamdb.info/sales/" target="_blank">Sales 页面</a> 可以非常方便地查看、筛选当前 Steam 商店正在打折的游戏。配合强大的过滤器（Filter） 进行筛选，快速找到你心仪的打折游戏。如果安装了官方浏览器插件，还会高亮 <font color="#008000"><strong>已经拥有的游戏</strong></font>，<font color="#00bfff"><strong>愿望单</strong></font> 里的游戏。<br>
<br>
<div align="center"><img width="224" height="176" src="https://steamuserimages-a.akamaihd.net/ugc/867370346065891474/9B36938004F3EB7A575B7E521256E89B0236650B/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346065891474/9B36938004F3EB7A575B7E521256E89B0236650B/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<strong>对这张表格说明几点：</strong><br>
<ul><li>点击每一行最左端的 Steam Logo 可以快速的跳转到该 App / Sub 的 Steam 商店页面</li><li>点击表格每一列的表头，可以按照该列升序 / 降序排序</li><li>在折扣 % 这一列色块颜色代表不同的折扣力度：无色为非历史最低价、绿色为平历史最低价、蓝色为新的历史最低价</li><li>默认一页显示 50 个，可以在表格顶部修改一页显示的折扣数量<br>
</li></ul><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 Sale 页面的右上角有个过滤器，可以对页面中的内容根据用户要求进行过滤。<br>
<br>
<div align="center"><img width="224" height="120" src="https://steamuserimages-a.akamaihd.net/ugc/867370346065962326/265CFFDB44A103C33A286AC2751256AB845085A2/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346065962326/265CFFDB44A103C33A286AC2751256AB845085A2/" style="display: inline; visibility: visible;"></div><br>
<br>
<table><tbody><tr><td><strong>过滤器中的名称</strong></td><td><strong>作用描述</strong></td></tr><tr><td>Price from X to Y</td><td>筛选出价格区间在 X~Y 的游戏</td></tr><tr><td>Discount</td><td>折扣，拖动后面的进度条可以筛选折扣大于 XX% 的游戏 *</td></tr><tr><td>Rating</td><td>评价，拖动后面的进度条可以筛选评价高于 XX% 的游戏</td></tr><tr><td>Show new discounts only</td><td>只显示新史低的游戏</td></tr><tr><td>Show wishlisted only</td><td>只显示愿望单中的游戏</td></tr><tr><td>Hide owned games</td><td>隐藏已有游戏</td></tr><tr><td>Filter by type</td><td>按照游戏类型过滤</td></tr><tr><td>Filter by category &amp; OS</td><td>按照目录及操作系统过滤</td></tr><tr><td>Filter by user tag</td><td>按照用户标签过滤</td></tr><tr><td>Chinese Yuan Renminbi</td><td>当前货币类型</td></tr></tbody></table><i><font size="1"><font color="#808080">* 此处的好评率用的不是 Steam 商店中的好评率算法 (好评数 / 评价总数) * 100%，而是 SteamDB 自己发现的一个评价算法，详情查看 <a href="https://steamdb.info/blog/steamdb-rating/" target="_blank">Introducing Steam Database's new rating algorithm</a></font></font></i><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;例如，我们想要在当前折扣中找出评价高于 80% 的日呆游戏，便可以设置 Rating 80% 、勾选 Hide owned games 、 游戏类型选 Games only 、用户标签选 Anime，点击reload之后便得到你想要的日呆~（虽然用户标签不一定完全准确，但是还是比一个一个翻折扣方便很多）<br>
<br>
<div align="center"><img width="224" height="138" src="https://steamuserimages-a.akamaihd.net/ugc/867370346066016638/341BBB18A323961D530400B0F3110BA2FEEEE5B3/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346066016638/341BBB18A323961D530400B0F3110BA2FEEEE5B3/" style="display: inline; visibility: visible;"></div><br> <br>
<div align="center"><strong><font size="6">[获取免费游戏脚本]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;SteamDB 获取免费游戏脚本几经周折，又复活了。此次的版本<font color="#ff0000">需要和 SteamDB 官方浏览器扩展一同使用</font>。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;访问 <a href="https://steamdb.info/freepackages/" target="_blank">Free Package 页面</a>即可获取到脚本，如下图：<br>
<br>
<div align="center"><img width="224" height="237" src="https://steamuserimages-a.akamaihd.net/ugc/867370346066027833/60E2D28A273A30F8402F08BF7DA67D58DE937B96/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346066027833/60E2D28A273A30F8402F08BF7DA67D58DE937B96/" style="display: inline; visibility: visible;"></div><br>
<br>
<strong>使用方法：</strong><br>
<ul type="1" class="litype_1"><li>安装 <a href="https://steamdb.info/extension/" target="_blank">SteamDB 官方的浏览器拓展</a></li><li>打开 <a href="https://steamdb.info/freepackages/" target="_blank">Free Package</a>[steamdb.info] 页面，等待脚本生成。（需要<br>
Steam 商店为已登录状态）</li><li>复制生成的代码</li><li>打开<a href="https://store.steampowered.com/account/licenses/" target="_blank">账户许可和产品序列号激活</a>页面</li><li>打开浏览器控制台 (Chrome：F12，选择 Console 选项卡) 并粘贴代码</li><li>脚本运行结束后会自动刷新账户许可和产品序列号激活页面</li><li>享受吧~<br>
</li></ul><br>
<strong>此版本脚本的特点：</strong><br>
<ul><li>根据你账户上未拥有的可以免费获取的 Sub 生成的，已经拥有的 Sub 不会在这个脚本中</li><li>如果你拥有本体，脚本会检测可领取的免费 DLC</li><li>只会生成在访问这个页面 IP 的国家中可以添加的免费获取的 Sub，如果该 IP 的国家不能添加则不会在脚本中</li><li>由于 Valve 限制，每个小时最多只能添加 50 个</li><li>免费 Sub 中包含 Demo<br>
</li></ul><br> <br>
<div align="center"><strong><font size="6">[基础搜索]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/search/" target="_blank">SteamDB 搜索页面</a> 可以对 SteamDB 数据库中几乎所有游戏信息进行检索，包括在 Steam 已经下架的游戏。<br>
<br>
<strong>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;搜索Apps：</strong><br>
<ul type="1" class="litype_1"><li>在 Name 除输入想要搜索的App名称（可以只输入部分名称、大小写不敏感）</li><li>在 App Type 处选择需要搜索的 App 类型（如Game、DLC等等）</li><li>Category 处选择所要搜索的类别（单人、多人、是否成就等）</li><li>然后点击 Search，下方就会列出来所有匹配的 Apps<br>
</li></ul>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下图是搜索名称中包含 “Dark Souls” 的所有 Game：<br>
<br>
<div align="center"><img width="224" height="201" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069037678/F8571F320D8EC7C7AF646CA5D8D6DD9DCC5B8C3D/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069037678/F8571F320D8EC7C7AF646CA5D8D6DD9DCC5B8C3D/" style="display: inline; visibility: visible;"></div><font size="1"><i><font color="#696969">* 若安装了 SteamDB 官方浏览器插件并且 Steam 商店为登录状态，搜索结果中会高亮</font><font color="#2e8b57">已拥有的游戏</font><font color="#696969">和</font><font color="#4169e1">愿望单游戏</font></i></font><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;搜索 Packages：<br>
<ul type="1" class="litype_1"><li>选择 “Packages” 选项卡进行 Sub 搜索</li><li>在 Name 处输入想要查询的 Sub 名称（可以只输入部分名称、大小写不敏感）</li><li>点击 Search后下方便会列出所有匹配的 Sub<br>
</li></ul><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下图是搜索名称中包含 “Dark Souls” 的所有 Sub：<br>
<br>
<div align="center"><img width="224" height="352" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069096705/C04BF49ACFE8676055D4D02FC3380F2DDD0AEDC0/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069096705/C04BF49ACFE8676055D4D02FC3380F2DDD0AEDC0/" style="display: inline; visibility: visible;"></div><strong><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;依赖应用搜索：</strong><ul type="1" class="litype_1"><li>选择 “Linked Apps” 选项卡进行依赖应用搜索</li><li>在 AppID 处填写想要查询的 AppID</li><li>点击 Search 后，下方会列出所有依赖于该 App 的所有 App<br>
</li></ul>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;结果中的 App 无法在没有所搜索的那个 App 的情况下单独运行。大多是该App的DLC。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;例如 <a href="http://store.steampowered.com/app/236430/DARK_SOULS_II/" target="_blank" class="steamInfoLink linkOwn">DARK SOULS™ II</a> 的 AppID 为 236430，使用以来应用搜索结果如下图：<font face="&amp;quot;"><br>
</font><br>
<div align="center"><img width="224" height="251" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069137060/1D5738FFE4ABC43FFB3911A732A6337D53C60A8A/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069137060/1D5738FFE4ABC43FFB3911A732A6337D53C60A8A/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;这些 App 在如果有商店页面，便会有这样一个提示：<br>
<br>
<div align="center"><img width="224" height="28" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069146973/5DA455C24451B91EE390BE7964E96A44347A6C09/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069146973/5DA455C24451B91EE390BE7964E96A44347A6C09/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;剩下三个是 Forum、AppKeys、PackageKeys查询，一般不怎么用到。<br>
<br> <br>
<div align="center"><strong><font size="6">[即时搜索功能]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; SteamDB使用 <a href="https://www.algolia.com/" target="_blank">algolia</a> 提供的服务，上线了一个即时搜索功能，不是每次按回车才看到搜索结果，而是在打字的同时，就呈现出根据关键字筛选的结果，如果你想要快速找多个游戏，这个功能可能比基础搜索更适用。并且可以根据用户好评率、价格区间、用户标签等进行筛选，非常强大。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;在<a href="https://steamdb.info/instantsearch/" target="_blank">即时搜索页面</a>搜索框中输入想要查询的关键字，结果在下方便即时呈现，并且会标注游戏是否拥有、是否在愿望单等信息.<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;下图是在搜索框中输入 “the witc” 后的结果：<br>
<br>
<div align="center"><img width="224" height="323" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069166467/72ACAB43C164C1AD5C0C6C86A2D5D38E5449125C/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069166467/72ACAB43C164C1AD5C0C6C86A2D5D38E5449125C/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在网页的左边也有一列筛选器，可以根据用户标签、好评率、价格区间、游戏类型、游戏特点 (成就、卡牌、云存储等)、是否支持VR、操作系统平台、开发商、发行商等进行筛选，找到自己想找的游戏。<br>
<br>
<font face="&amp;quot;"></font><br>
<div align="center"><strong><font size="6">[游戏更新日志]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在顶部导航来进入 <a href="https://steamdb.info/patchnotes/" target="_blank">Patch Note</a>[steamdb.info] 页面可以查看游戏的更新日志。（Tip：右上角有RSS源，可以订阅）日志只会记录近三天所有更新的游戏，只有少数热门游戏会记录详细的更新日志，包括：Dote2、CSGO、CS、Portal 2、L4D2、Sid Mieier's Civilization VI、PUBG等。并且只有这些少数热门游戏的日志会被保留，其余的超过三天更新日志便会删除。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;其中 Valve 的游戏大部分是通过对应的脚本进行自动检测并生成的，检测每次更新的文件变动再结合官方Blog发布的更新说明。<br>
<br>
<div align="center"><img width="224" height="178" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069504683/45C74E9E7D074705DC04D61BD97C35B415EAF49E/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069504683/45C74E9E7D074705DC04D61BD97C35B415EAF49E/" style="display: inline; visibility: visible;"></div><br>
<ul><li>有 <a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069511092/2CBB9D2D6EBC4B92FAA605254E5A59F92B9F63DC/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069511092/2CBB9D2D6EBC4B92FAA605254E5A59F92B9F63DC/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069511092/2CBB9D2D6EBC4B92FAA605254E5A59F92B9F63DC/" style="display: inline; visibility: visible;"></a> 标记代表该更新说明中包含检测脚本自动生成的日志</li><li>有 <a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069511104/F6D8F4FBF2D439FE7E0194F9E874F1E321C294C4/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069511104/F6D8F4FBF2D439FE7E0194F9E874F1E321C294C4/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069511104/F6D8F4FBF2D439FE7E0194F9E874F1E321C294C4/" style="display: inline; visibility: visible;"></a> 标记代表该更新说明中包含官方更新说明</li><li>有 <a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069511113/A449A2C29E4177DCC4DCB334D079B8FB6D59DAE8/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069511113/A449A2C29E4177DCC4DCB334D079B8FB6D59DAE8/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069511113/A449A2C29E4177DCC4DCB334D079B8FB6D59DAE8/" style="display: inline; visibility: visible;"></a> 标记代表该更新说明中不包含官方的更新说明</li><li>“#数字” 表示这是当天的第几次更新<br>
</li></ul><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;可以在 Patch Note 网页链接后加 AppID 参数仅查看这一个游戏的更新日志，如下面的链接仅仅查看CSGO的更新（同样有RSS源，订阅只接收这一个游戏的更新说明）：<br> <div class="blockcode"><div><ol><li>https://steamdb.info/patchnotes/?appid=730</li></ol></div></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下面节选几个更新说明内容：<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;CSGO <a href="https://steamdb.info/patchnotes/2119990/" target="_blank">2017年9月14日 更新内容</a>：主要是完美的国服公测更新（背景为深色的为游戏官网更新日志）<br>
<div align="center"><img width="224" height="312" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069531567/CDDDD713ACA40E22E2392BA0E8B3D4F07833583D/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069531567/CDDDD713ACA40E22E2392BA0E8B3D4F07833583D/" style="display: inline; visibility: visible;"></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;下面<font face="&amp;quot;">背景为白色的为 </font><a href="https://github.com/SteamDatabase/GameTracking-CSGO" target="_blank">自动检测脚本</a> <font face="&amp;quot;">生成的更新说明 (如图多个语言本地化修改)：</font><br>
<div align="center"><img width="224" height="122" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069538757/494D1ED6E7B74EE1BA8A040CF0F7B0D5DF874B12/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069538757/494D1ED6E7B74EE1BA8A040CF0F7B0D5DF874B12/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;下面的为部分枪械伤害、准心扩散、子弹容量等的具体更新参数说明 (如图格洛克弹夹和移动准心被砍了一刀)：<br>
<div align="center"><img width="224" height="162" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069542330/CA0C55328F7E9AA86114857C7362603D96D4DA65/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069542330/CA0C55328F7E9AA86114857C7362603D96D4DA65/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下面更新中新加的物品 (如图国服公测的印花胶囊、新的光谱2号箱和钥匙等)：<br>
<div align="center"><img width="224" height="120" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069545930/482715ABA1F8156F890F16C277586797645EDCD9/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069545930/482715ABA1F8156F890F16C277586797645EDCD9/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下图是 Dota 2 <a href="https://steamdb.info/patchnotes/2053927/" target="_blank">2017年8月20日 部分更新内容</a>：其中包括所有改动的数值变化（如图中疯狂面具降低护甲增加、冷却时间延长等）同样深色为官方Blog中的更新日志：<br>
<div align="center"><img width="224" height="380" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069557243/92A2A61E5D94D594D82437D94BD79FC4FC4552DC/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069557243/92A2A61E5D94D594D82437D94BD79FC4FC4552DC/" style="display: inline; visibility: visible;"></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;下图背景为白色的为<a href="https://github.com/SteamDatabase/GameTracking-Dota2" target="_blank">自动检测脚本</a>生成的更新说明（如图一些英文本地化的修改、祸乱之源(Bane)的英雄平衡等、技能修改、物品变动等）：<br>
<div align="center"><img width="224" height="744" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069564527/A99543E81E6274B60BCE82E691267EC4D88079A2/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069564527/A99543E81E6274B60BCE82E691267EC4D88079A2/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp; 下面是大逃杀PUBG 2017年9月14日 部分<a href="https://steamdb.info/patchnotes/2117179/" target="_blank">更新内容</a> (如图此次大逃杀更新添加了雾天天气、新增枪械、增加东北角的城镇等)：<br>
<div align="center"><img width="224" height="652" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069568988/9C0CCDA39622E04B600EA4717E351806DD3900CD/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069568988/9C0CCDA39622E04B600EA4717E351806DD3900CD/" style="display: inline; visibility: visible;"></div><br> <br>
<div align="center"><strong><font size="6">[Bundle 打包查询]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 SteamDB 的 <a href="https://steamdb.info/bundles/" target="_blank">Bundle 页面</a>可以直接看到 Steam 商店中所有以新打包方式的 Bundle 列表，默认按照添加的先后顺序排列，新添加的在最上面。<br>
<ul><li>点击每一行最左边的 Steam Logo 可以快速跳转到该 Bundle 的 Steam 商店页面</li><li>“Name” 是 Bundle 的名称</li><li>“Items” 是 Bundle 内总共含有的 App 数量</li><li>“You Own” 是您目前已经拥有包内的 App 数量（可能有误）</li><li>有123的小logo的那一列，说明该包是否必须整包购买。如果为 “No” 则你拥有其中的部分，可以通过该 Bundle 补全 Bundle 中的所有内容。如果是 “Yes” 则必须没有其中的任何一个游戏才能购买这个 Bundle。如 <a href="http://store.steampowered.com/bundle/4413/_/" target="_blank">《古剑奇谭》系列</a> 需要整包进行购买，若已经拥有其中的某个或多个 App，就不能给自己补全，只能购买成礼物了</li><li>每一列的表头，可以对该列进行升序 / 降序排列，可以非常方便找出折扣较好的 bundle<br>
</li></ul><br>
<div align="center"><img width="224" height="189" src="https://steamuserimages-a.akamaihd.net/ugc/867370346069617638/D3AEF01758E78D7A1E006A4289C60250393D1988/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069617638/D3AEF01758E78D7A1E006A4289C60250393D1988/" style="display: inline; visibility: visible;"></div><br> <br>
<div align="center"><strong><font size="6">[SteamDB 统计]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;在顶部导航栏中有一组 SteamDB 提供的统计数据，包括 当前游戏人数、当前Twitch直播观看数、全球Steam等级排名、全球Steam游戏数排名、游戏好评度排名、最新VAC封禁人数统计、Steam实况直播统计 以及 特殊徽章、游戏类型、游戏标签的统计。<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069628750/6D10C7B70AED5BC19526E627AC31814EC3E3A7B2/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069628750/6D10C7B70AED5BC19526E627AC31814EC3E3A7B2/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069628750/6D10C7B70AED5BC19526E627AC31814EC3E3A7B2/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<strong><font size="4">Steam当前游戏人数统计：</font></strong><br>
<br>
在 <a href="https://steamdb.info/graph/" target="_blank">Current Players</a> 中可以查看当前在同时游戏人数排行：<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069635583/4D1EF407B56ADD40A2C2DF2115EFF7AC81310E36/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069635583/4D1EF407B56ADD40A2C2DF2115EFF7AC81310E36/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069635583/4D1EF407B56ADD40A2C2DF2115EFF7AC81310E36/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;点击每一行左边的 “+” 可以添加 2 个及以上游戏，再点击表格上放的 “compare” 即可对添加的几个游戏的在线人数进行比较，如下图是 Dota2 和 PUBG 的同时游戏人数趋势比较：<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069644087/EC93FC838FD2A4A7A26D1FACD34046BF7CC6994D/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069644087/EC93FC838FD2A4A7A26D1FACD34046BF7CC6994D/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069644087/EC93FC838FD2A4A7A26D1FACD34046BF7CC6994D/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<br>
<strong><font size="4">Twitch直播当前观看人数：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/twitch/" target="_blank">Top on Twitch</a> 页面，可以查看当前在Twitch观看直播的人数排行（点击游戏名后的 <a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069654499/D188F4BA9022F43C75DC9A2BE2DD49DCFD416B1E/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069654499/D188F4BA9022F43C75DC9A2BE2DD49DCFD416B1E/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069654499/D188F4BA9022F43C75DC9A2BE2DD49DCFD416B1E/" style="display: inline; visibility: visible;"></a>可以跳转到对应游戏的 Twitch 频道）：<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069650225/A7C5EC1E9BB5F5885C5F2076EB925898639D51C0/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069650225/A7C5EC1E9BB5F5885C5F2076EB925898639D51C0/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069650225/A7C5EC1E9BB5F5885C5F2076EB925898639D51C0/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<br>
<strong><font size="4">全球Steam游戏数排名：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/badges/?badgeid=13" target="_blank">Top Game Owners</a> 页面中可以查看全球 Steam 游戏数排行榜（排名非实时，如个人资料隐藏等情况有滞后。游戏数依据 SteamWeb API 获取的数据，而非 Calculator 中显示的游戏数）：<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069684411/7076827F13D65A9D2166B9FF10B21A1C3AB9DACF/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069684411/7076827F13D65A9D2166B9FF10B21A1C3AB9DACF/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069684411/7076827F13D65A9D2166B9FF10B21A1C3AB9DACF/" style="display: inline; visibility: visible;"></a></font></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;* 努力+1上榜吧~<br>
<br>
<strong><font size="4">全球Steam等级排名：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/stats/toplevels/" target="_blank">Top Steam Levels</a> 页面中可以查看全球Steam等级排名（前 100，排名非实时，如个人资料隐藏等情况有滞后）：<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370346069662349/47A9ACA1F7041FC0DC991E1DFADC970C2AC3A10B/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370346069662349/47A9ACA1F7041FC0DC991E1DFADC970C2AC3A10B/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370346069662349/47A9ACA1F7041FC0DC991E1DFADC970C2AC3A10B/" style="display: inline; visibility: visible;"></a></font></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;* 排名第一当之无愧鹦鹉哥~ <br>
<br>
<strong><font size="4">Steam游戏好评度排名：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/stats/gameratings/" target="_blank">Top Rated Games</a> 页面中可以查看好评率排行榜 (*)，如果不知道买什么，就从这里面找找感兴趣的吧，每个游戏的质量都不差~<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370628952365911/A625FC2FF1CD84F0DE469A2E9A7746EB1FA19D8C/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370628952365911/A625FC2FF1CD84F0DE469A2E9A7746EB1FA19D8C/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952365911/A625FC2FF1CD84F0DE469A2E9A7746EB1FA19D8C/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<i><font size="1"><font color="#696969">* 注：这个上面的好评率不是简单的 好评数/评价总数，这种统计方法并不科学，可能有的游戏仅仅有1个好评便排名到100%。这里用的是 SteamDB 自己发现的一个评价算法，详情查看 <a href="https://steamdb.info/blog/steamdb-rating/" target="_blank">Introducing Steam Database's new rating algorithm</a></font></font></i><br>
<br>
<strong><font size="4">最新VAC封禁人数统计：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/stats/bans/" target="_blank">Latest VAC bans</a>[steamdb.info] 页面中可以查看 VAC 封禁和 Game 封禁的统计，每个月被封禁的人数统计：目前（2017年12月）由于不能每天查看每个人的 Steam 个人资料，所以统计数据有所下降<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370628952375841/454F11ED52C9FB0E8BC47260F65FCA4ABEFC4608/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370628952375841/454F11ED52C9FB0E8BC47260F65FCA4ABEFC4608/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952375841/454F11ED52C9FB0E8BC47260F65FCA4ABEFC4608/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<strong><font size="4">特殊徽章统计：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;在 <a href="https://steamdb.info/badges/" target="_blank">Badges 页面</a>记录了事件徽章（暑促和圣诞）和特殊勋章的统计（绝版徽章等）：<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370628952395393/00E6BA97693C76F6FBE4BF8470E6201FB286A4C8/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370628952395393/00E6BA97693C76F6FBE4BF8470E6201FB286A4C8/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952395393/00E6BA97693C76F6FBE4BF8470E6201FB286A4C8/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<strong><font size="4"><br>
</font></strong><strong><font size="4">游戏分类及游戏标签：</font></strong><br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 <a href="https://steamdb.info/genres/" target="_blank">Genres</a> 和 <a href="https://steamdb.info/tags/" target="_blank">Tags</a> 页面可以分别查看不同游戏分类和用户标签的游戏，点击某个标签即可查看该分类下的游戏列表：（分类从 <a href="https://steamspy.com/" target="_blank">Steam Spy</a> 获取）<br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370628952406356/6BC93EF70AC0D9EDB4A1078FAA6B000E0C4FF363/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370628952406356/6BC93EF70AC0D9EDB4A1078FAA6B000E0C4FF363/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952406356/6BC93EF70AC0D9EDB4A1078FAA6B000E0C4FF363/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<div align="center"><font face="&amp;quot;"><a href="https://steamuserimages-a.akamaihd.net/ugc/867370628952408660/5519122FCEEBD192E768B90D24C62072582014C1/" target="_blank"><img src="https://steamuserimages-a.akamaihd.net/ugc/867370628952408660/5519122FCEEBD192E768B90D24C62072582014C1/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952408660/5519122FCEEBD192E768B90D24C62072582014C1/" style="display: inline; visibility: visible;"></a></font></div><br>
<br>
<br>
<br> <br>
<div align="center"><font face="&amp;quot;"><font size="6"><strong>[实时变更查询]</strong></font></font></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 SteamDB 的 <a href="https://steamdb.info/realtime/" target="_blank">Realtime 页面</a> 用类命令行的界面对 Steam 游戏的变更的情况进行实时的显示，在这里你可以最快速地获取到 Steam 中游戏的变化，如游戏下架、发布DLC、游戏更新等等。 它更像是一个实时更新的、更详细的<a href="https://steamdb.info/changelist/" target="_blank">Changelist</a>。<br>
<br>
<div align="center"><img width="224" height="148" src="https://steamuserimages-a.akamaihd.net/ugc/867370628952484145/FC177AE13BFB7CD7EE89B7D2E1F6278A1F5C7BBC/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952484145/FC177AE13BFB7CD7EE89B7D2E1F6278A1F5C7BBC/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;如果你关注了某个应用，在该应用又变更的时候，会用浏览器通知提醒。关注一个 App，在该 App 页面的右上角点击 Watch 即可，若想取消关注，点击 Unwatch 即可。<br>
<br> <br>
<div align="center"><strong><font size="6">[帐号虚拟价值估算]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;在 SteamDB 的 <a href="https://steamdb.info/calculator/" target="_blank">Calculator页面</a>输入个人主页 URL / SteamID / 自定义ID ，再选择想要估值的区域，点击 “Get disappointed in your life™” 就可计算出所查询的帐号虚拟价值。在估算之前，需要被查询帐号的个人资料公共可见。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;点击顶部导航栏你的头像，可以快速的进入自己的 Calculator 主页。（Tips：在链接后面的 /?cc= 换成其他的国家代码即可查看帐号在其他区的价值。如 cc=us 可查看帐号美区的价值）<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;以<a href="https://steamdb.info/calculator/76561198263380239/" target="_blank">我的 Steam 账户的 Calculator 页面</a>为例：<br>
<br>
<div align="center"><img width="224" height="223" src="https://steamuserimages-a.akamaihd.net/ugc/867370628952433975/98EB52F6F62B9C9C982A98B289EDBEBFA2A3A146/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952433975/98EB52F6F62B9C9C982A98B289EDBEBFA2A3A146/" style="display: inline; visibility: visible;"></div><br>
每个数字下面都有一排小字对数字进行描述，下面是简单额释义：<br>
<br>
<table><tbody><tr><td>简介</td><td>说明</td></tr><tr><td>Current account value</td><td>帐号内所有游戏按照当前的价格购买所需要的金额</td></tr><tr><td>Total cost with sales</td><td>帐号内所有游戏全部都以史低价格购买所需要的金额</td></tr><tr><td>Steam level</td><td>Steam帐号等级</td></tr><tr><td>Average price</td><td>帐号内所有游戏当前的平均价值</td></tr><tr><td>Average price per hour</td><td>平均玩一个小时所需要的金额</td></tr><tr><td>Games owned</td><td>拥有的游戏数（包括免费游戏和Demo）</td></tr><tr><td>Hours on record</td><td>记录在案的游戏总时间</td></tr><tr><td>Average playtime</td><td>平均每个游戏游玩的时间</td></tr><tr><td>Games not played</td><td>从未玩过的游戏数</td></tr><tr><td>Games not played</td><td>从未玩过的游戏的占比</td></tr></tbody></table><i>* 以上所有价值计算均只计算所查询的区域有定价的部分，所查区域没有定价的不计算在内。</i><br>
<br> <br>
<div align="center"><strong><font size="6">[Steam 服务器状态查询]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;这个功能虽然不在 SteamDB 域名下，但是是同一个开发者开发的，并且在 SteamDB 上也有入口。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<a href="https://steamstat.us/" target="_blank">Steam Status</a> 是一个实时检测Steam服务器状态的网站，想看是不是Steam服务器挂了，可以到这里来一探究竟。<br>
<br>
<div align="center"><img width="224" height="220" src="https://steamuserimages-a.akamaihd.net/ugc/867370628952455215/9741517B71FC48D9D35C7E17814CDC9E99A4C320/" border="0" alt="" zsrc="https://steamuserimages-a.akamaihd.net/ugc/867370628952455215/9741517B71FC48D9D35C7E17814CDC9E99A4C320/" style="display: inline; visibility: visible;"></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;网站每隔40秒左右会刷新一次Steam服务器的状态，几乎可以说是实时的了。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;状态监测包括Dota 2各个地区服务器、CSGO各个地区服务器、Steam商店、Steam社区、Steam Web API等等的服务状态。<br>
<br> <br>
<div align="center"><strong><font size="6">[最后的碎碎念]</font></strong></div><br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;希望这篇帖子能帮助更多的萌新们得心应手的使用SteamDB这个网站。<br>
<br>
&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;由于指南作者水平有限，如有错误之处还请指教 Orz~<br>
<br>
<font size="4"><strong>&nbsp; &nbsp;&nbsp; &nbsp; 感谢</strong></font> <strong><font size="2"><font color="#ff00ff">小粉枪</font></font>、<font color="#9932cc">丹尼王</font>、<font color="#ff0000">冷壕</font></strong>、以及在楼下提出建议的<font color="#48d1cc">坛友</font>们~ 感谢你们提供的资料~ 本帖部分格式参考了 Lee Sir 的帖子~(帖子格式和配色真的很好看 QAQ)<br>
<br>
<strong>参考：</strong><br>
<br>
<a href="http://steamcn.com/t107451-1-1" target="_blank">（2014-10-29全新改版）steamdb终极完全版教程第二版</a><br>
<br>
<a href="http://steamcn.com/t190899-1-1" target="_blank">关于Steam目前形势政策下激活跨区礼物的问题教程</a><br>
<br>
<a href="https://steamdb.info/faq/" target="_blank">Frequently Asked Questions</a><br>
<br>`
    });
    var that = this;
    WxParse.wxParse('article', 'html', that.data.threadContent, that)
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