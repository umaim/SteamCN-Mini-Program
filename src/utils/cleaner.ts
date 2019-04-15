export const contentCleaner = (html: string) => {
  return html.replace(/[\r\n]/g, '') //去掉回车换行
    .replace(/(<br \/>){2,}/g, '<br/><br/>') //去多余换行
    .replace(/src="forum\.php/g, 'src="https://steamcn.com/forum.php') //相对地址添加域名
    .replace(/src="static/g, 'src="https://steamcn.com/static')
    .replace(/href="forum\.php/g, 'href="https://steamcn.com/forum.php')
    .replace(/font size="(7|6|5)"/g, 'font size="4"') // 最大字号为 4
}
