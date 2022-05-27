import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "thinkingme",
    url: "https://thinkingme.github.io",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  repo: "thinkingme/thinkingme.github.io",
  // 文档存放的分值，默认为 "main"
  docsBranch: "master",
  //文档仓库地址，默认同主题选项中的 repo
  docsRepo: "thinkingme/thinkingme.github.io",
  //docsDir: 文档在仓库中的目录，默认为根目录
  docsDir: "docs",


  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "默认页脚",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "程序员的个人博客",
    intro: "/about-the-author/",
    medias: {
      Baidu: "https://example.com",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using giscus
       */
      type: "giscus",
      repo: "thinkingme/thinkingme.github.io",
      repoId: "R_kgDOHV22rw",
      category: "Announcements",
      categoryId: "DIC_kwDOHV22r84CPH_m",

      /**
       * Using twikoo
       */
      // type: "twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // type: "waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
