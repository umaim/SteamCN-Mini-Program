// import { parse, HTMLElement } from 'node-html-parser';

export default function contentCleaner(html: string): string {
  html = html
    .replace(/[\r\n]/g, '') //去掉回车
    .replace(
      /<iframe src="https:\/\/store\.steampowered\.com\/widget\/\d+\/" style="border:none;height:190px;width:100%;max-width:646px;"><\/iframe>/g,
      ''
    ) //去除 Steam Widget 空白
    .replace(/(<br\s?\/>){2,}/g, '<br/><br/>') //去多余换行
    .replace(/src="forum\.php/g, 'src="https://steamcn.com/forum.php') //相对地址添加域名
    .replace(/src="static/g, 'src="https://steamcn.com/static')
    .replace(/href="forum\.php/g, 'href="https://steamcn.com/forum.php')
    .replace(/font size="(7|6)"/g, 'font size="5"') // 最大字号为 5
    .replace(
      /"https:\/\/steamcn\.com\/static\/image\/common\/none\.gif" zoomfile=/g,
      ''
    ) //替换默认 src 中的 none 图片
    .replace(
      /<div class='showhide'><p>隐藏内容，<a href='javascript:;' onClick="var s=this\.parentNode\.parentNode\.getElementsByClassName\('spoiler'\)\[0\];'none'==s\.style\.display\?\(s\.style\.display='block',this\.innerHTML='点击隐藏'\) : \(s\.style\.display='none',this\.innerHTML='点击显示'\);">点击显示<\/a><\/p><div style='display: none;' class='spoiler'>/g,
      "<div class='showhide'><div class='spoiler'>"
    ) //去除 spoiler 隐藏代码，直接显示隐藏内容
    .replace(/width="\d+"/g, '') // 去除图片宽高样式
    .replace(/height="\d+"/g, '')
    .replace(/<ignore_js_op><dl class="tattl attm"><dt><\/dt><dd>/g, '') //去除未插入主题的图片列表左侧 dd 产生的 padding
    .replace(/<\/div><\/dd><\/dl><\/ignore_js_op>/g, '')
    .replace(
      /<script type="text\/javascript">replyreload += ',' + \d+;<\/script><script type="text\/javascript">replyreload += ',' + \d+;<\/script>/g,
      ''
    ) // 去除 script 标签
    .replace(
      /<script type='text\/javascript'> if \(typeof jQuery(.+)return false; }\); } <\/script>/g,
      ''
    )
    .replace(
      /<script type="text\/javascript" reload="1">(.+)'true'\);<\/script><br\/><br\/>/g,
      ''
    )
    .replace(
      /<i class="pstatus">(.+编辑) <\/i>(<br\/>)?/g,
      '<div align="center"><font color="#808080"><i class="pstatus">$1</i></font></div>'
    ) //改变编辑提示样式
    .replace(
      /<div class="modact">.+(分类|移动|合并|关闭|提升|限时高亮|加入精华|审核通过)<\/a><\/div>/g,
      ''
    ); // 去除版务操作提示

  /*
    const root = parse(html) as HTMLElement;
    console.log(root);
  */

  // console.log('HTML::', html);

  return html;
}
