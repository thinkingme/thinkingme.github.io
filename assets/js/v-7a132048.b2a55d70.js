"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[7781],{87793:(e,t,a)=>{a.r(t),a.d(t,{data:()=>o});const o={key:"v-7a132048",path:"/coding-road/java-core/jvm/oom2.html",title:"oom2",lang:"zh-CN",frontmatter:{category:["Java核心","JVM"],tag:["Java"],summary:"oom2 前言 需求来了，说是要给图片加水印，如果用户登录了，就用用户id当水印，没有登录就用用户的ip当水印。 这不是很简单吗，很快啊就写完了，调样式到是调的比较久，什么透明度啊，大小啊，密度啊。 第二天悲剧了，测试发现水印图片加载不出来。 排查 嗯，先看日志，一看oom了。一想就是昨天的图片加水印，因为是在内存里操作的。一查确实buffimage对象大几",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/jvm/oom2.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"oom2"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2023-01-31T07:03:45.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2023-01-31T07:03:45.000Z"}]]},excerpt:"",headers:[{level:3,title:"前言",slug:"前言",children:[]},{level:2,title:"排查",slug:"排查",children:[]},{level:2,title:"解决",slug:"解决",children:[]},{level:2,title:"总结",slug:"总结",children:[]}],git:{createdTime:1675148625e3,updatedTime:1675148625e3,contributors:[{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:1.29,words:387},filePathRelative:"coding-road/java-core/jvm/oom2.md"}},58788:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});var o=a(95393);const r=[(0,o.uE)('<h1 id="oom2" tabindex="-1"><a class="header-anchor" href="#oom2" aria-hidden="true">#</a> oom2</h1><h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3><p>需求来了，说是要给图片加水印，如果用户登录了，就用用户id当水印，没有登录就用用户的ip当水印。</p><p>这不是很简单吗，很快啊就写完了，调样式到是调的比较久，什么透明度啊，大小啊，密度啊。</p><p>第二天悲剧了，测试发现水印图片加载不出来。</p><h2 id="排查" tabindex="-1"><a class="header-anchor" href="#排查" aria-hidden="true">#</a> 排查</h2><p>嗯，先看日志，一看oom了。一想就是昨天的图片加水印，因为是在内存里操作的。一查确实buffimage对象大几百m。一张图10m不到，加载到对象就翻了几倍。</p><h2 id="解决" tabindex="-1"><a class="header-anchor" href="#解决" aria-hidden="true">#</a> 解决</h2><p>其实想说加完水印扔到本地去保存，这样就不用每次都要在内存里操作了。但是这样就要占用很多的额外空间了，一张图，一个用户就要额外一张了。</p><p>事情变得复杂起来了。我把对象及时清理掉，然后用visualVM看内存表，多来几个并发内存就直接炸了，虽然回收也挺快，但是jmeter的成功率低了。</p><p>那咋办，图片10m不到，但是可以说还是太大了，我建议他们压缩后再存储。嗯，效果还可以。能承受更多了。一个对象变成几m左右，这样就不会轻易oom了吧。</p><p>再看下用的是jdk8默认的垃圾回收器，改成G1。再设置一下60%就回收，图片对象一用完就刷新。应该能承受更大点了吧。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>',13)],i={},n=(0,a(13860).Z)(i,[["render",function(e,t){return(0,o.wg)(),(0,o.iD)("div",null,r)}]])},13860:(e,t)=>{t.Z=(e,t)=>{const a=e.__vccOpts||e;for(const[e,o]of t)a[e]=o;return a}}}]);