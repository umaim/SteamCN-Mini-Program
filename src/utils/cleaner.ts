export default function contentCleaner(html: string): string {
  return html
    .replace(/[\r\n]/g, '') //去掉回车
    .replace(
      /<iframe src="https:\/\/store\.steampowered.com\/widget\/\d+\/" style="border:none;height:190px;width:100%;max-width:646px;"><\/iframe>/g,
      ''
    ) //去除 Steam Widget 空白
    .replace(/(<br\s?\/>){2,}/g, '<br/><br/>') //去多余换行
    .replace(/src="forum\.php/g, 'src="https://steamcn.com/forum.php') //相对地址添加域名
    .replace(/src="static/g, 'src="https://steamcn.com/static')
    .replace(/href="forum\.php/g, 'href="https://steamcn.com/forum.php')
    .replace(/font size="(7|6|5)"/g, 'font size="4"') // 最大字号为 4
    .replace(
      /"https:\/\/steamcn\.com\/static\/image\/common\/none\.gif" zoomfile=/g,
      ''
    ) //替换默认 src 中的 none 图片
    .replace(
      /<div class='showhide'><p>隐藏内容，<a href='javascript:;' onClick="var s=this\.parentNode\.parentNode\.getElementsByClassName\('spoiler'\)\[0\];'none'==s\.style\.display\?\(s\.style\.display='block',this\.innerHTML='点击隐藏'\) : \(s\.style\.display='none',this\.innerHTML='点击显示'\);">点击显示<\/a><\/p><div style='display: none;' class='spoiler'>/g,
      "<div class='showhide'><div class='spoiler'>"
    ); //去除 spoiler 隐藏代码，直接显示隐藏内容
}
