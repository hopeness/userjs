function addOtherStyle() {
  // language=CSS
  // noinspection CssUnusedSymbol
  GM_addStyle(`
  /*需要透明化的元素*/
  body,
  .p-client_container,
  .p-client,
  .p-client .p-top_nav,
  .p-workspace {
      background-color: transparent;
  }
  .p-workspace {
      /*background-image: url(https://cdn.jsdelivr.net/gh/rxliuli/img-bed/20200306083232.jpg);*/
      /*background-repeat: no-repeat;*/
      /*background-size: cover;*/
  }

  /* 工作区 */
  .p-workspace *,
  .p-workspace__channel_sidebar *,
  .p-workspace__primary_view *,
  .p-workspace__secondary_view *,
  .c-virtual_list__item * {
      background-color: rgba(48, 48, 48, 0.08) !important;
  }
  /* 鼠标在消息上 */
  .c-message_kit__message:hover {
      background-color: rgba(48, 48, 48, 0.5) !important;
  }
  /* 消除文本特殊加重 */
  .c-message_kit__blocks--rich_text * {
      background-color: transparent !important;
  }
  .c-message_list__day_divider__line {
      border-color: rgba(48, 48, 48, 0.5) !important;
  }
  .p-top_nav__search{
      background-color: rgba(48, 48, 48, 0.08) !important;
  }
  `)
}

interface Config {
  label: string
  imageUrl: string
  videoUrl: string
}
class ConfigApi {
  async list(): Promise<Config[]> {
    return new Promise<Config[]>((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://userjs.rxliuli.com/data.json',
        onload(res) {
          resolve(JSON.parse(res.responseText))
        },
        onerror(e) {
          reject(e)
        },
      })
    })
  }

  private static readonly CurrentBackgroundVideoKey = 'CurrentBackgroundVideo'

  get() {
    try {
      return JSON.parse(GM_getValue(ConfigApi.CurrentBackgroundVideoKey))
    } catch (e) {}
  }
  set(config: Config) {
    return GM_setValue(
      ConfigApi.CurrentBackgroundVideoKey,
      JSON.stringify(config),
    )
  }
}
const configApi = new ConfigApi()

function setBackVideo(config: Config) {
  /**
   * 根据 html 字符串创建 Element 元素
   * @param str html 字符串
   * @returns 创建的 Element 元素
   */
  function createElByString(str: string): HTMLElement {
    const root = document.createElement('div')
    root.innerHTML = str
    return root.querySelector('*') as HTMLElement
  }

  const $videoEl = createElByString(`<video
  id="videoWallPaper"
  muted="muted"
  loop="loop"
  autoplay="autoplay"
  src="${config.videoUrl}"
/>
`)
  GM_addStyle(`video#videoWallPaper {
  position: fixed;
  right: 0;
  bottom: 0;

  min-width: 100%;
  min-height: 100%;

  width: auto;
  height: auto;
  z-index: -100;

  background-image: url(${config.imageUrl || ''});
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(0.5);
}
`)
  document.body.appendChild($videoEl)
}

if (window.location.hostname === 'app.slack.com') {
  const config = configApi.get()
  if (config) {
    setBackVideo(config)
    addOtherStyle()
  }
}

if (
  location.href.startsWith('https://userjs.rxliuli.com/') ||
  location.hostname === '127.0.0.1'
) {
  Reflect.set(unsafeWindow, 'com.rxliuli.SlackDarkCute.configApi', configApi)
}
