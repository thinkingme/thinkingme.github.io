import { defineUserConfig } from "vuepress";
import theme from "./theme";
import {searchPlugin} from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "zh-CN",
  title: "coding-rode",
  description: "平平无奇的程序员",

  base: "/",

  head: [
    // 添加百度统计
    [
      "script", {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],
  // plugins: [
  //   searchPlugin({
  //     // ...
  //     isSearchable: (page) => page.path !== "/",
  //     maxSuggestions: 10,
  //     hotKeys: ["s", "/"],
  //     // 用于在页面的搜索索引中添加额外字段
  //     getExtraFields: () => [],
  //     locales: {
  //       "/zh/": {
  //         placeholder: "搜索",
  //       },
  //     },
  //   }),
  // ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "coding-rode",
      description: "平平无奇的程序员",
    },
  },
  theme,
});
