import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/zhishixingqiu/": ["java-mianshi-zhinan", "readme.md"],
  "/download/": ["java", "pdf", "learn-jianyi", "nicearticle", "history"],
  "/xuexiluxian/": [
    {
      text: "Java",
      icon: "java",
      prefix: "java/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "C语言",
      link: "c.md",
    },
    {
      text: "C++",
      link: "ccc.md",
    },
    {
      text: "Python",
      link: "python.md",
    },
    {
      text: "Go语言",
      link: "go.md",
    },
    {
      text: "操作系统",
      link: "os.md",
    },
    {
      text: "前端",
      link: "qianduan.md",
    },
    {
      text: "蓝桥杯",
      link: "lanqiaobei.md",
    },
    {
      text: "算法和数据结构",
      link: "algorithm.md",
    },
  ],
  "/sidebar/sanfene/": "structure",
  "/coding-road/": [
    {
      text: "一、前言",
      link: "home.md",
    },
    {
      text: "二、Java核心",
      collapsable: true,
      prefix: "java-core/",
      children: [
        {
          prefix: "overview/",
          text: "2.1 Java概述",
          collapsable: true,
          children: "structure",
        },
        {
          text: "2.2 Java基础语法",
          collapsable: true,
          prefix: "basic-grammar/",
          children: "structure",
        },
        {
          text: "2.3 面向对象编程",
          prefix: "oo/",
          collapsable: true,
          children: "structure",
        },
        {
          text: "2.4 字符串&数组",
          collapsable: true,
          prefix: "string-Array/",
          children: "structure",
        },
        {
          text: "2.5 集合框架（容器）",
          collapsable: true,
          prefix: "collection/",
          children: "structure",
        },
        {
          text: "2.6 IO",
          collapsable: true,
          prefix: "io/",
          children: "structure",
        },
        {
          text: "2.7 异常处理",
          collapsable: true,
          prefix: "exception/",
          children: "structure",
        },
        {
          text: "2.8 常用工具类",
          collapsable: true,
          prefix: "utils/",
          children: "structure",
        },
        {
          text: "2.9 Java8新特性",
          prefix: "java8/",
          collapsable: true,
          children: "structure",
        },
        {
          text: "2.10 Java重要知识点",
          prefix: "basic-extra-meal/",
          collapsable: true,
          children: "structure",
        },
        {
          text: "2.11 并发编程",
          collapsable: true,
          prefix: "juc/",
          children: "structure",
        },
        {
          text: "2.12 JVM",
          prefix: "jvm/",
          collapsable: true,
          children: "structure",
        },
      ],
    },
    {
      text: "三、Java企业级开发",
      collapsable: true,
      prefix: "javaee/",
      children: [
        {
          text: "3.1 开发工具",
          prefix: "dev-tools/",
          collapsable: true,
          children: [
            {
              text: "git",
              collapsable: true,
              prefix: "git/",
              children: "structure",
            },
            {
              text: "maven",
              collapsable: true,
              prefix: "maven/",
              children: "structure",
            },
            {
              text: "IDE/编辑器",
              collapsable: true,
              prefix: "ide/",
              children: "structure",
            },
            {
              text: "nginx",
              collapsable: true,
              prefix: "nginx/",
              children: "structure",
            },
          ],
        },
        {
          text: "3.2 Spring",
          prefix: "spring/",
          collapsable: true,
          children: "structure",
        },
        {
          text: "3.3 SpringBoot",
          collapsable: true,
          prefix: "springboot/",
          children: "structure",
        },
        {
          text: "3.4 辅助工具/轮子",
          collapsable: true,
          prefix: "wheels/",
          children: "structure",
        },
        {
          text: "3.5 分布式",
          collapsable: true,
          prefix: "cloud/",
          children: "structure",
        },
      ],
    },
    {
      text: "四、数据库",
      collapsable: true,
      prefix: "database/",
      children: [
        {
          text: "Redis",
          collapsable: true,
          prefix: "redis/",
          children: "structure",
        },
        {
          text: "MongoDB",
          collapsable: true,
          prefix: "mongodb/",
          children: "structure",
        },
      ],
    },
    {
      text: "五、计算机基础",
      collapsable: true,
      prefix: "cs/",
      children: "structure",
    },
    {
      text: "六、求职面试",
      collapsable: true,
      prefix: "interview/",
      children: [
        {
          text: "八股文",
          collapsable: true,
          prefix: "baguwen/",
          children: "structure",
        },
        {
          text: "面经",
          collapsable: true,
          prefix: "mianjin/",
          children: "structure",
        },
        {
          text: "城市选择",
          prefix: "cityselect/",
          collapsable: true,
          children: "structure",
        },
      ],
    },
    {
      text: "七、学习资源",
      collapsable: true,
      prefix: "study-resource/",
      children: [
        {
          text: "PDF下载",
          collapsable: true,
          prefix: "download/",
          children: "structure",
        },
        {
          text: "学习建议",
          collapsable: true,
          prefix: "xuexijianyi/",
          children: ["read-csapp", "electron-information-engineering"],
        },
      ],
    },
    {
      text: "八、联系作者",
      collapsable: true,
      children: [
        {
          text: "心路历程",
          prefix: "about-the-author/",
          collapsable: true,
          children: ["readme.md"],
        },
      ],
    },
  ],
});
