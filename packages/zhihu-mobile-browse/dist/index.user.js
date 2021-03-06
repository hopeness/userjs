// ==UserScript==
// @name        知乎移动端浏览优化
// @description 知乎移动端浏览优化，避免使用 App 打开知乎。
// @namespace   http://github.com/rxliuli/userjs
// @version     0.1.1
// @author      rxliuli
// @include     https://www.zhihu.com/question/*
// @run-at      document-start
// @license     MIT
// @grant       GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  function initStyle() {
    GM_addStyle(
      `
    /* 屏蔽右侧栏 */
    .Question-sideColumn {
        display: none;
    }
    /* 问题页加宽 */
    .Question-mainColumn {
        width: unset !important;
    }
    /* 将问题回答在移动端占宽进行优化 */
    .RichContent {
        width: calc(100vw - 32px);
    }
    .RichContent .RichContent-inner.RichContent-inner {
        max-height: initial!important;
    }
    .RichContent .ContentItem-expandButton {
        display: none;
    }
    .List-item .RichContent .RichText::after {
        content: '';
        display: block;
        height: 64px;
    }
    /*删除评论下的打开 app 按钮*/
    .CommentsForOia > button.Button:last-of-type {
        display: none;
    }
    /*删除选择知乎 app 的弹窗*/
    .ModalWrap {
        display: none;
    }
    .ModalWrap-body {
        overflow: auto!important;
    }
    /*删除在 app 打开的底部按钮*/
    .OpenInAppButton.OpenInApp {
        display: none;
    }
    /*删除底部的推荐*/
    .Card.HotQuestions{
      display: none;
    }
    /*删除顶部的下载 App 按钮*/
    .MobileAppHeader-actions{
      text-align: right;
    }
    .MobileAppHeader-actions .MobileAppHeader-downloadLink:first-of-type{
      display: none;
    }
    .MobileAppHeader-actions .MobileAppHeader-downloadLink:first-of-type{
      display: none;
    }
    .MobileAppHeader-searchBox.MobileAppHeader-searchBoxWithUnlogin {
      width: calc(100vw - 200px);
    }
    /*删除中间的相关推荐*/
    .Card.RelatedReadings{
      display: none;
    }
`,
    );
  }

  initStyle();

}());
