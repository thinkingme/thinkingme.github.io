const e={key:"v-5584707a",path:"/coding-road/java-core/juc/ConcurrentHashMap.html",title:"\u540A\u6253Java\u5E76\u53D1\u9762\u8BD5\u5B98\u4E4BConcurrentHashMap",lang:"zh-CN",frontmatter:{title:"\u540A\u6253Java\u5E76\u53D1\u9762\u8BD5\u5B98\u4E4BConcurrentHashMap",category:["Java\u6838\u5FC3","\u5E76\u53D1\u7F16\u7A0B"],tag:["Java"],summary:"\u5728\u4F7F\u7528HashMap\u65F6\uFF0C\u5728\u591A\u7EBF\u7A0B\u60C5\u51B5\u4E0B\u6269\u5BB9\u4F1A\u51FA\u73B0CPU\u63A5\u8FD1100%\u7684\u60C5\u51B5\uFF0C\u56E0\u4E3Ahashmap\u5E76\u4E0D\u662F\u7EBF\u7A0B\u5B89\u5168\u7684\uFF0C\u901A\u5E38\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5728java\u4F53\u7CFB\u4E2D\u53E4\u8001\u7684hashtable\u7C7B\uFF0C\u8BE5\u7C7B\u57FA\u672C\u4E0A\u6240\u6709\u7684\u65B9\u6CD5\u90FD\u91C7\u7528synchronized\u8FDB\u884C\u7EBF\u7A0B\u5B89\u5168\u7684\u63A7\u5236\uFF0C\u53EF\u60F3\u800C\u77E5\uFF0C\u5728\u9AD8\u5E76\u53D1\u7684\u60C5\u51B5\u4E0B\uFF0C\u6BCF\u6B21\u53EA\u6709\u4E00\u4E2A\u7EBF\u7A0B\u80FD\u591F\u83B7\u53D6\u5BF9\u8C61\u76D1\u89C6\u5668\u9501\uFF0C\u8FD9\u6837\u7684\u5E76\u53D1\u6027\u80FD\u7684\u786E\u4E0D\u4EE4\u4EBA\u6EE1\u610F\u3002 \u53E6\u5916\u4E00\u79CD\u65B9\u5F0F\u901A\u8FC7Col",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/juc/ConcurrentHashMap.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"\u540A\u6253Java\u5E76\u53D1\u9762\u8BD5\u5B98\u4E4BConcurrentHashMap"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-05-27T02:04:56.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-05-27T02:04:56.000Z"}]]},excerpt:"",headers:[{level:2,title:"\u5173\u952E\u5C5E\u6027\u53CA\u7C7B",slug:"\u5173\u952E\u5C5E\u6027\u53CA\u7C7B",children:[{level:3,title:"ConcurrentHashMap\u7684\u5173\u952E\u5C5E\u6027",slug:"concurrenthashmap\u7684\u5173\u952E\u5C5E\u6027",children:[]},{level:3,title:"ConcurrentHashMap\u4E2D\u5173\u952E\u5185\u90E8\u7C7B",slug:"concurrenthashmap\u4E2D\u5173\u952E\u5185\u90E8\u7C7B",children:[]}]},{level:2,title:"CAS\u5173\u952E\u64CD\u4F5C",slug:"cas\u5173\u952E\u64CD\u4F5C",children:[{level:3,title:"1. tabAt",slug:"_1-tabat",children:[]},{level:3,title:"2. casTabAt",slug:"_2-castabat",children:[]},{level:3,title:"3. setTabAt",slug:"_3-settabat",children:[]}]},{level:2,title:"\u91CD\u70B9\u65B9\u6CD5\u8BB2\u89E3",slug:"\u91CD\u70B9\u65B9\u6CD5\u8BB2\u89E3",children:[{level:3,title:"\u5B9E\u4F8B\u6784\u9020\u5668\u65B9\u6CD5",slug:"\u5B9E\u4F8B\u6784\u9020\u5668\u65B9\u6CD5",children:[]},{level:3,title:"initTable\u65B9\u6CD5",slug:"inittable\u65B9\u6CD5",children:[]},{level:3,title:"put\u65B9\u6CD5",slug:"put\u65B9\u6CD5",children:[]},{level:3,title:"get\u65B9\u6CD5",slug:"get\u65B9\u6CD5",children:[]},{level:3,title:"transfer\u65B9\u6CD5",slug:"transfer\u65B9\u6CD5",children:[]},{level:3,title:"\u4E0Esize\u76F8\u5173\u7684\u4E00\u4E9B\u65B9\u6CD5",slug:"\u4E0Esize\u76F8\u5173\u7684\u4E00\u4E9B\u65B9\u6CD5",children:[]}]},{level:2,title:"\u603B\u7ED3",slug:"\u603B\u7ED3",children:[]}],git:{createdTime:1653617096e3,updatedTime:1653617096e3,contributors:[{name:"\u6797\u632F\u8F89",email:"linzhenhui@apexsoft.com",commits:1}]},readingTime:{minutes:27.33,words:8200},filePathRelative:"coding-road/java-core/juc/ConcurrentHashMap.md"};export{e as data};