const e={key:"v-6fd5ef19",path:"/coding-road/java-core/jvm/zongjie.html",title:"JVM \u6838\u5FC3\u77E5\u8BC6\u70B9\u603B\u7ED3",lang:"zh-CN",frontmatter:{category:["Java\u6838\u5FC3","JVM"],tag:["Java"],summary:"JVM \u6838\u5FC3\u77E5\u8BC6\u70B9\u603B\u7ED3 \u4E00\u3001\u57FA\u672C\u6982\u5FF5 1.1 OpenJDK \u81EA 1996 \u5E74 JDK 1.0 \u53D1\u5E03\u4EE5\u6765\uFF0CSun \u516C\u53F8\u5728\u5927\u7248\u672C\u4E0A\u53D1\u884C\u4E86 JDK 1.1\u3001JDK 1.2\u3001JDK 1.3\u3001JDK 1.4\u3001JDK 5\uFF0CJDK 6 \uFF0C\u8FD9\u4E9B\u7248\u672C\u7684 JDK \u90FD\u53EF\u4EE5\u7EDF\u79F0\u4E3A SunJDK \u3002\u4E4B\u540E\u5728 2006 \u5E74\u7684 JavaOne \u5927\u4F1A\u4E0A\uFF0CSun \u516C\u53F8\u5BA3\u5E03\u5C06 Java \u5F00\u6E90\uFF0C",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/jvm/zongjie.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"JVM \u6838\u5FC3\u77E5\u8BC6\u70B9\u603B\u7ED3"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-05-27T02:04:56.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-05-27T02:04:56.000Z"}]]},excerpt:"",headers:[{level:2,title:"\u4E00\u3001\u57FA\u672C\u6982\u5FF5",slug:"\u4E00\u3001\u57FA\u672C\u6982\u5FF5",children:[{level:3,title:"1.1 OpenJDK",slug:"_1-1-openjdk",children:[]},{level:3,title:"1.2 OracleJDK",slug:"_1-2-oraclejdk",children:[]},{level:3,title:"1.3 HotSpot VM",slug:"_1-3-hotspot-vm",children:[]}]},{level:2,title:"\u4E8C\u3001Java \u5185\u5B58\u533A\u57DF",slug:"\u4E8C\u3001java-\u5185\u5B58\u533A\u57DF",children:[{level:3,title:"2.1 \u7A0B\u5E8F\u8BA1\u6570\u5668",slug:"_2-1-\u7A0B\u5E8F\u8BA1\u6570\u5668",children:[]},{level:3,title:"2.2 Java\u865A\u62DF\u673A\u6808",slug:"_2-2-java\u865A\u62DF\u673A\u6808",children:[]},{level:3,title:"2.3 \u672C\u5730\u65B9\u6CD5\u6808",slug:"_2-3-\u672C\u5730\u65B9\u6CD5\u6808",children:[]},{level:3,title:"2.4 Java\u5806",slug:"_2-4-java\u5806",children:[]},{level:3,title:"2.5 \u65B9\u6CD5\u533A",slug:"_2-5-\u65B9\u6CD5\u533A",children:[]}]},{level:2,title:"\u4E09\u3001\u5BF9\u8C61",slug:"\u4E09\u3001\u5BF9\u8C61",children:[{level:3,title:"3.1 \u5BF9\u8C61\u7684\u521B\u5EFA",slug:"_3-1-\u5BF9\u8C61\u7684\u521B\u5EFA",children:[]},{level:3,title:"3.2 \u5BF9\u8C61\u7684\u5185\u5B58\u5E03\u5C40",slug:"_3-2-\u5BF9\u8C61\u7684\u5185\u5B58\u5E03\u5C40",children:[]},{level:3,title:"3.3 \u5BF9\u8C61\u7684\u8BBF\u95EE\u5B9A\u4F4D",slug:"_3-3-\u5BF9\u8C61\u7684\u8BBF\u95EE\u5B9A\u4F4D",children:[]}]},{level:2,title:"\u56DB\u3001\u5783\u573E\u6536\u96C6\u7B97\u6CD5",slug:"\u56DB\u3001\u5783\u573E\u6536\u96C6\u7B97\u6CD5",children:[{level:3,title:"4.1 Java \u5806\u56DE\u6536",slug:"_4-1-java-\u5806\u56DE\u6536",children:[]},{level:3,title:"4.2 \u65B9\u6CD5\u533A\u56DE\u6536",slug:"_4-2-\u65B9\u6CD5\u533A\u56DE\u6536",children:[]},{level:3,title:"4.3 \u5783\u573E\u6536\u96C6\u7B97\u6CD5",slug:"_4-3-\u5783\u573E\u6536\u96C6\u7B97\u6CD5",children:[]}]},{level:2,title:"\u4E94\u3001\u7ECF\u5178\u5783\u573E\u6536\u96C6\u5668",slug:"\u4E94\u3001\u7ECF\u5178\u5783\u573E\u6536\u96C6\u5668",children:[{level:3,title:"5.1 Serial \u6536\u96C6\u5668",slug:"_5-1-serial-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.2 ParNew \u6536\u96C6\u5668",slug:"_5-2-parnew-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.3 Parallel Scavenge \u6536\u96C6\u5668",slug:"_5-3-parallel-scavenge-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.4 Serial Old \u6536\u96C6\u5668",slug:"_5-4-serial-old-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.5 Paralled Old \u6536\u96C6\u5668",slug:"_5-5-paralled-old-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.6 CMS \u6536\u96C6\u5668",slug:"_5-6-cms-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.7 Garbage First \u6536\u96C6\u5668",slug:"_5-7-garbage-first-\u6536\u96C6\u5668",children:[]},{level:3,title:"5.8 \u5185\u5B58\u5206\u914D\u539F\u5219",slug:"_5-8-\u5185\u5B58\u5206\u914D\u539F\u5219",children:[]}]},{level:2,title:"\u516D\u3001\u865A\u62DF\u673A\u7C7B\u52A0\u8F7D\u673A\u5236",slug:"\u516D\u3001\u865A\u62DF\u673A\u7C7B\u52A0\u8F7D\u673A\u5236",children:[{level:3,title:"6.1 \u7C7B\u52A0\u8F7D\u65F6\u673A",slug:"_6-1-\u7C7B\u52A0\u8F7D\u65F6\u673A",children:[]},{level:3,title:"6.2 \u7C7B\u52A0\u8F7D\u8FC7\u7A0B",slug:"_6-2-\u7C7B\u52A0\u8F7D\u8FC7\u7A0B",children:[]},{level:3,title:"6.3 \u7C7B\u52A0\u8F7D\u5668",slug:"_6-3-\u7C7B\u52A0\u8F7D\u5668",children:[]},{level:3,title:"6.4 \u53CC\u4EB2\u59D4\u6D3E\u6A21\u578B",slug:"_6-4-\u53CC\u4EB2\u59D4\u6D3E\u6A21\u578B",children:[]},{level:3,title:"6.5 \u6A21\u5757\u5316\u4E0B\u7684\u7C7B\u52A0\u8F7D\u5668",slug:"_6-5-\u6A21\u5757\u5316\u4E0B\u7684\u7C7B\u52A0\u8F7D\u5668",children:[]}]},{level:2,title:"\u4E03\u3001\u7A0B\u5E8F\u7F16\u8BD1",slug:"\u4E03\u3001\u7A0B\u5E8F\u7F16\u8BD1",children:[{level:3,title:"7.1 \u7F16\u8BD1\u5668\u5206\u7C7B",slug:"_7-1-\u7F16\u8BD1\u5668\u5206\u7C7B",children:[]},{level:3,title:"7.2 \u89E3\u91CA\u5668\u4E0E\u7F16\u8BD1\u5668",slug:"_7-2-\u89E3\u91CA\u5668\u4E0E\u7F16\u8BD1\u5668",children:[]},{level:3,title:"7.3 \u5206\u5C42\u7F16\u8BD1",slug:"_7-3-\u5206\u5C42\u7F16\u8BD1",children:[]},{level:3,title:"7.4 \u70ED\u70B9\u63A2\u6D4B",slug:"_7-4-\u70ED\u70B9\u63A2\u6D4B",children:[]}]},{level:2,title:"\u516B\u3001\u4EE3\u7801\u4F18\u5316",slug:"\u516B\u3001\u4EE3\u7801\u4F18\u5316",children:[{level:3,title:"8.1 \u65B9\u6CD5\u5185\u8054",slug:"_8-1-\u65B9\u6CD5\u5185\u8054",children:[]},{level:3,title:"8.2 \u9003\u9038\u5206\u6790",slug:"_8-2-\u9003\u9038\u5206\u6790",children:[]},{level:3,title:"8.3 \u516C\u5171\u5B50\u8868\u8FBE\u5F0F\u6D88\u9664",slug:"_8-3-\u516C\u5171\u5B50\u8868\u8FBE\u5F0F\u6D88\u9664",children:[]},{level:3,title:"8.4 \u6570\u7EC4\u8FB9\u754C\u68C0\u67E5\u6D88\u9664",slug:"_8-4-\u6570\u7EC4\u8FB9\u754C\u68C0\u67E5\u6D88\u9664",children:[]}]}],git:{createdTime:1653617096e3,updatedTime:1653617096e3,contributors:[{name:"\u6797\u632F\u8F89",email:"linzhenhui@apexsoft.com",commits:1}]},readingTime:{minutes:42.77,words:12830},filePathRelative:"coding-road/java-core/jvm/zongjie.md"};export{e as data};
