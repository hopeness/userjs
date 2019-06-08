// ==UserScript==
// @name         MDN 自动跳转中文翻译
// @namespace    http://github.com/rxliuli/
// @version      1.0.0
// @description  如果有中文翻译的话就跳转到中文翻译页面
// @author       rxliuli
// @match        http*://developer.mozilla.org/*
// @grant        none
// @license      MIT
// ==/UserScript==

;(function() {
  'use strict'

  /**
   * MDN 自动跳转中文翻译
   * 如果来到一个 MDN 的网页
   * 判断当前页面是否为中文
   *    - 如果是，就不进行任何操作
   *    - 否则判断当前页面是否有中文翻译页面
   *      - 如果没有，则不进行任何操作
   *      - 否则跳转至中文翻译页面
   */
  ;(() => {
    // 获取 language
    var language = new RegExp('https://developer.mozilla.org/(.*)/').exec(
      location.href,
    )[1]

    // 判断 language 是否为中文
    if (language === 'zh-CN') {
      return
    }

    // 获取可能存在的中文翻译页面
    var zhCN = document.querySelector('#translations li[lang="zh-CN"] a')
    // 如果有就跳转过去
    if (zhCN) {
      zhCN.click()
    }
  })()
})()
