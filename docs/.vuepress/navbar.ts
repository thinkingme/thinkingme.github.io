import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "进阶之路", 
    icon: "lujing", 
    link: "/coding-road/home.md"
  },
  {
    text: "学习路线",
    icon: "luxian",
    link: "/xuexiluxian/"
  },
  {
    text: "全部文章",
    icon: "bzhan", 
    link: "/article/"
  },
  {
    text: "珍藏资源",
    icon: "youzhi",
    children: [
      {
        text: "Java电子书下载", 
        icon: "java", 
        link: "/coding-road/study-resource/download/java.md"
      },
      {
        text: "PDF干货笔记下载", 
        icon: "pdf", 
        link: "/coding-road/study-resource/download/pdf.md"
      },
      {
        text: "学习建议", 
        icon: "xuexijianyi", 
        link: "/coding-road/study-resource/download/learn-jianyi.md"
      },
      { 
        text: "面渣逆袭", 
        icon: "zhunbei", 
        link: "/sidebar/sanfene/nixi.md" 
      },
      { 
        text: "优质文章", 
        icon: "youzhi", 
        link: "/coding-road/study-resource/download/nicearticle.md"
      },
      { 
        text: "网络日志", 
        icon: "rizhi", 
        link: "/coding-road/study-resource/download/history.md"
      },
    ],
  },
]);
