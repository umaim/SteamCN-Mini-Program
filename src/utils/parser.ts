import { HTMLElement } from "node-html-parser";
import { IThreadMeta } from '../interfaces/thread'

export const homeParser = (dom: HTMLElement) => {
  let bannerElems = dom.querySelectorAll('.slideshow li')
  let bannerThreadList = parseBannerThreadList(bannerElems)

  let indexElems = dom.querySelectorAll('#portal_block_432_content li')
  let indexThreadList = parseIndexThreadList(indexElems)

  let newElems = dom.querySelectorAll('#portal_block_433_content li')
  let newThreadList = parseNewThreadList(newElems)

  let hotElems = dom.querySelectorAll('#portal_block_434_content li')
  let hotThreadList = parseHotThreadList(hotElems)

  console.log({ bannerThreadList, indexThreadList, newThreadList, hotThreadList })
  return { bannerThreadList, indexThreadList, newThreadList, hotThreadList }
}

const parseBannerThreadList = (elems: HTMLElement[]) => {
  let bannerThreadList = [] as IThreadMeta[]
  elems.forEach(elem => {
    /* Each elem like:
      <li style="width: 432px; height: 289px; display: none;">
        <a href="t476291-1-1" target="_blank">
          <img
          src="https://blob.steamcn.com/block/9d/9d25040d6ea2056324e2ff0e7b6896cf.jpg"
          width="432"
          height="289"
          title="板块: 成就指南
                 作者: k15 (2019-03-27)
                 浏览: 0 / 回复: 0
                 最后: k15 (2019-03-27)">
        </a>
        <span class="title">杀手2新狙击图《鬼港》成就及部分挑战指南</span>
      </li>
    */
    let title = elem.querySelector('span').text
    let image = elem.querySelector('img').attributes.src
    let hrefAttr = elem.querySelector('a').attributes.href
    let url = `https://steamcn.com/${hrefAttr}`
    let tid = parseInt((hrefAttr.match(/t(\d+)/) as RegExpMatchArray)[1])
    let imgTitleLines = elem.querySelector('img').attributes.title.trim().split('\n')
    let section = imgTitleLines[0].substr(4)
    let username = (imgTitleLines[1].match(/:([\S\s]*)\(/) as RegExpMatchArray)[1]
    let viewed = parseInt((imgTitleLines[2].match(/浏览: (\d*) \//) as RegExpMatchArray)[1])
    let replied = parseInt((imgTitleLines[2].match(/回复: (\d*)/) as RegExpMatchArray)[1])

    let meta: IThreadMeta = {
      title,
      image,
      url,
      tid,
      section,
      author: {
        username
      },
      stats: {
        viewed,
        replied
      }
    }
    bannerThreadList.push(meta)
  })
  return bannerThreadList
}


const parseExtraThreadList = (elems: HTMLElement[]) => {
  let extraThreadList = [] as IThreadMeta[]
  elems.forEach(elem => {
    /* Each elem like:
      <li>
        <em>
          <a href="suid-459867" target="_blank">k15</a>
        </em>
        <a href="t476291-1-1"
           title="板块: 成就指南
                  作者: k15 (2019-03-27)
                  浏览: 0 / 回复: 0
                  最后: k15 (2019-03-27)"
           target="_blank">杀手2新狙击图《鬼港》成就及部分挑战指南
        </a>
      </li>
    */
    let userElem = elem.querySelector('em a')
    let username = userElem.text
    let uid = parseInt(userElem.attributes.href.substr(5))
    let avatar = `https://steamcn.com/uc_server/avatar.php?uid=${uid}&size=small`;
    let threadElem = elem.querySelectorAll('a')[1]
    let title = threadElem.text
    let hrefAttr = threadElem.attributes.href
    let url = `https://steamcn.com/${hrefAttr}`
    let tid = parseInt((hrefAttr.match(/t(\d+)/) as RegExpMatchArray)[1])
    let imgTitleLines = threadElem.attributes.title.trim().split('\n')
    let section = imgTitleLines[0].substr(4)
    let viewed = parseInt((imgTitleLines[2].match(/浏览: (\d*) \//) as RegExpMatchArray)[1])
    let replied = parseInt((imgTitleLines[2].match(/回复: (\d*)/) as RegExpMatchArray)[1])

    let meta: IThreadMeta = {
      title,
      url,
      tid,
      section,
      author: {
        username,
        uid,
        avatar
      },
      stats: {
        viewed,
        replied
      }
    }
    extraThreadList.push(meta)
  })
  return extraThreadList
}

const parseIndexThreadList = (elems: HTMLElement[]) => {
  return parseExtraThreadList(elems)
}

const parseNewThreadList = (elems: HTMLElement[]) => {
  return parseExtraThreadList(elems)
}

const parseHotThreadList = (elems: HTMLElement[]) => {
  return parseExtraThreadList(elems)
}
