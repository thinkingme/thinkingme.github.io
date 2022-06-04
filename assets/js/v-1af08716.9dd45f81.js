"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[2376],{49807:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-1af08716",path:"/coding-road/java-core/jvm/asm.html",title:"史上最通俗易懂的 ASM 教程",lang:"zh-CN",frontmatter:{category:["Java核心","JVM"],tag:["Java"],summary:"史上最通俗易懂的 ASM 教程 一勺思想 We are all in the gutter, but some of us are looking at the stars. （我们都生活在阴沟里，但仍有人仰望星空 ）- 王尔德 《温德米尔夫人的扇子》 举世混浊我独清，众人皆醉我独醒 - 屈原 《楚辞》 前言 ASM 是一种通用 Java 字节码操作和分析框",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/coding-road/java-core/jvm/asm.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:title",content:"史上最通俗易懂的 ASM 教程"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T08:56:49.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:tag",content:"Java"}],["meta",{property:"article:modified_time",content:"2022-06-04T08:56:49.000Z"}]]},excerpt:"",headers:[{level:2,title:"一勺思想",slug:"一勺思想",children:[]},{level:2,title:"前言",slug:"前言",children:[]},{level:2,title:"class 字节码",slug:"class-字节码",children:[]},{level:2,title:"JVM 基于栈的设计模式",slug:"jvm-基于栈的设计模式",children:[{level:3,title:"局部变量表",slug:"局部变量表",children:[]},{level:3,title:"操作数栈",slug:"操作数栈",children:[]},{level:3,title:"JVM 指令",slug:"jvm-指令",children:[]}]},{level:2,title:"ASM 操作",slug:"asm-操作",children:[]},{level:2,title:"ASM API",slug:"asm-api",children:[]},{level:2,title:"MethodVisitor 方法解析",slug:"methodvisitor-方法解析",children:[{level:3,title:"ASM 使用 Demo",slug:"asm-使用-demo",children:[]}]}],git:{createdTime:1653617096e3,updatedTime:1654333009e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2},{name:"thinkingme",email:"linzhenhuigg@gmail.com",commits:1}]},readingTime:{minutes:7.49,words:2246},filePathRelative:"coding-road/java-core/jvm/asm.md"}},32548:(n,s,a)=>{a.r(s),a.d(s,{default:()=>y});var e=a(95393);const i=(0,e.uE)('<h1 id="史上最通俗易懂的-asm-教程" tabindex="-1"><a class="header-anchor" href="#史上最通俗易懂的-asm-教程" aria-hidden="true">#</a> 史上最通俗易懂的 ASM 教程</h1><h2 id="一勺思想" tabindex="-1"><a class="header-anchor" href="#一勺思想" aria-hidden="true">#</a> 一勺思想</h2><p>We are all in the gutter, but some of us are looking at the stars. （我们都生活在阴沟里，但仍有人仰望星空 ）- 王尔德 《温德米尔夫人的扇子》</p><p>举世混浊我独清，众人皆醉我独醒 - 屈原 《楚辞》</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>ASM 是一种通用 Java 字节码操作和分析框架。它可以用于修改现有的 class 文件或动态生成 class 文件。</p>',6),l=(0,e.Uk)("**ASM **is an all purpose Java bytecode manipulation and analysis framework. It can be used to modify existing classes or to dynamically generate classes, directly in binary form. ASM provides some common bytecode transformations and analysis algorithms from which custom complex transformations and code analysis tools can be built. ASM offers similar functionality as other Java bytecode frameworks, but is focused on"),t={href:"https://asm.ow2.io/performance.html",target:"_blank",rel:"noopener noreferrer"},c=(0,e.Uk)("performance"),d=(0,e.Uk)(". Because it was designed and implemented to be as small and as fast as possible, it is well suited for use in dynamic systems (but can of course be used in a static way too, e.g. in compilers)."),o=(0,e.uE)('<p>本篇文章分享的是对 ASM 的理解和应用，之前需要我们掌握<strong>class 字节码</strong>，<strong>JVM 基于栈的设计模式,JVM 指令</strong></p><h2 id="class-字节码" tabindex="-1"><a class="header-anchor" href="#class-字节码" aria-hidden="true">#</a> class 字节码</h2><p>我们编写的 java 文件，会通过 javac 命令编译为 class 文件，JVM 最终会执行该类型文件来运行程序。下图所示为 class 文件结构。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-43844b78-c01f-4990-b038-3c91ff2eeb34.jpg" alt="" loading="lazy"></p><p>下面我们通过一个简单的实例来进行说明。下面是我们编写的一个简单的 java 文件，只是简单的函数调用.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> num1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> NUM1 <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token operator">+</span>num1<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> a<span class="token operator">-</span>b<span class="token operator">-</span>NUM1<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 javac -g Test.java 编译为 class 文件，然后通过 <code>javap -verbose Test.class</code> 命令查看 class 文件格式。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class com.wuba.asmdemo.Test\n  minor version: 0\n  major version: 52\n  flags: ACC_PUBLIC, ACC_SUPER\nConstant pool:\n   #1 = Methodref          #6.#26         // java/lang/Object.&quot;&lt;init&gt;&quot;:()V\n   #2 = Fieldref           #5.#27         // com/wuba/asmdemo/Test.num1:I\n   #3 = Methodref          #5.#28         // com/wuba/asmdemo/Test.add:(II)I\n   #4 = Fieldref           #5.#29         // com/wuba/asmdemo/Test.NUM1:I\n   #5 = Class              #30            // com/wuba/asmdemo/Test\n   #6 = Class              #31            // java/lang/Object\n   #7 = Utf8               num1\n   #8 = Utf8               I\n   #9 = Utf8               NUM1\n  #10 = Utf8               &lt;init&gt;\n  #11 = Utf8               ()V\n  #12 = Utf8               Code\n  #13 = Utf8               LineNumberTable\n  #14 = Utf8               LocalVariableTable\n  #15 = Utf8               this\n  #16 = Utf8               Lcom/wuba/asmdemo/Test;\n  #17 = Utf8               func\n  #18 = Utf8               (II)I\n  #19 = Utf8               a\n  #20 = Utf8               b\n  #21 = Utf8               add\n  #22 = Utf8               sub\n  #23 = Utf8               &lt;clinit&gt;\n  #24 = Utf8               SourceFile\n  #25 = Utf8               Test.java\n  #26 = NameAndType        #10:#11        // &quot;&lt;init&gt;&quot;:()V\n  #27 = NameAndType        #7:#8          // num1:I\n  #28 = NameAndType        #21:#18        // add:(II)I\n  #29 = NameAndType        #9:#8          // NUM1:I\n  #30 = Utf8               com/wuba/asmdemo/Test\n  #31 = Utf8               java/lang/Object\n{\n  public static int NUM1;\n    descriptor: I\n    flags: ACC_PUBLIC, ACC_STATIC\n\n  public com.wuba.asmdemo.Test();     //构造函数\n    descriptor: ()V\n    flags: ACC_PUBLIC\n    Code:\n      stack=2, locals=1, args_size=1\n         0: aload_0\n         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V\n         4: aload_0\n         5: iconst_1\n         6: putfield      #2                  // Field num1:I\n         9: return\n      LineNumberTable:\n        line 3: 0\n        line 5: 4\n      LocalVariableTable:\n        Start  Length  Slot  Name   Signature\n            0      10     0  this   Lcom/wuba/asmdemo/Test;\n\n  public int func(int, int);\n    descriptor: (II)I\n    flags: ACC_PUBLIC\n    Code:\n      stack=3, locals=3, args_size=3\n         0: aload_0\n         1: iload_1\n         2: iload_2\n         3: invokevirtual #3                  // Method add:(II)I\n         6: ireturn\n      LineNumberTable:\n        line 10: 0\n      LocalVariableTable:\n        Start  Length  Slot  Name   Signature\n            0       7     0  this   Lcom/wuba/asmdemo/Test;\n            0       7     1     a   I\n            0       7     2     b   I\n\n  public int add(int, int);\n    descriptor: (II)I\n    flags: ACC_PUBLIC\n    Code:\n      stack=2, locals=3, args_size=3\n         0: iload_1\n         1: iload_2\n         2: iadd\n         3: aload_0\n         4: getfield      #2                  // Field num1:I\n         7: iadd\n         8: ireturn\n      LineNumberTable:\n        line 14: 0\n      LocalVariableTable:\n        Start  Length  Slot  Name   Signature\n            0       9     0  this   Lcom/wuba/asmdemo/Test;\n            0       9     1     a   I\n            0       9     2     b   I\n\n  public int sub(int, int);\n    descriptor: (II)I\n    flags: ACC_PUBLIC\n    Code:\n      stack=2, locals=3, args_size=3\n         0: iload_1\n         1: iload_2\n         2: isub\n         3: getstatic     #4                  // Field NUM1:I\n         6: isub\n         7: ireturn\n      LineNumberTable:\n        line 18: 0\n      LocalVariableTable:\n        Start  Length  Slot  Name   Signature\n            0       8     0  this   Lcom/wuba/asmdemo/Test;\n            0       8     1     a   I\n            0       8     2     b   I\n\n  static {};\n    descriptor: ()V\n    flags: ACC_STATIC\n    Code:\n      stack=1, locals=0, args_size=0\n         0: bipush        100\n         2: putstatic     #4                  // Field NUM1:I\n         5: return\n      LineNumberTable:\n        line 7: 0\n}\nSourceFile: &quot;Test.java&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出在编译为 class 文件后，字段名称，方法名称，类型名称等均在常量池中存在的。从而做到减小文件的目的。同时方法定义也转变为了 jvm 指令。下面我们需要对 jvm 指令加深一下了解。在了解之前需要我们理解 JVM 基于栈的设计模式</p><h2 id="jvm-基于栈的设计模式" tabindex="-1"><a class="header-anchor" href="#jvm-基于栈的设计模式" aria-hidden="true">#</a> JVM 基于栈的设计模式</h2><p>JVM 的指令集是基于栈而不是寄存器，基于栈可以具备很好的跨平台性。在线程中执行一个方法时，我们会创建一个栈帧入栈并执行，如果该方法又调用另一个方法时会再次创建新的栈帧然后入栈，方法返回之际，原栈帧会返回方法的执行结果给之前的栈帧，随后虚拟机将会丢弃此栈帧。</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-e31b7e50-1d48-4eef-9552-6fa7e6c68fed.jpg" alt="" loading="lazy"></p><h3 id="局部变量表" tabindex="-1"><a class="header-anchor" href="#局部变量表" aria-hidden="true">#</a> 局部变量表</h3><p>**局部变量表(Local Variable Table)**是一组变量值存储空间，用于存放方法参数和方法内定义的局部变量。虚拟机通过索引定位的方法查找相应的局部变量。举个例子。以上述的代码为例</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> a<span class="token operator">-</span>b<span class="token operator">-</span>NUM1<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法大家可以猜测一下局部变量有哪些? 答案是 3 个，不应该只有 a,b 吗？还有 this,对应实例对象方法编译器都会追加一个 this 参数。如果该方法为静态方法则为 2 个了。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public int sub(int, int);\n    descriptor: (II)I\n    flags: ACC_PUBLIC\n    Code:\n      stack=2, locals=3, args_size=3\n         0: iload_1\n         1: iload_2\n         2: isub\n         3: getstatic     #4                  // Field NUM1:I\n         6: isub\n         7: ireturn\n      LineNumberTable:\n        line 18: 0\n      LocalVariableTable:\n        Start  Length  Slot  Name   Signature\n            0       8     0  this   Lcom/wuba/asmdemo/Test;\n            0       8     1     a   I\n            0       8     2     b   I\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以局部变量表第 0 个元素为 this, 第一个为 a,第二个为 b</p><h3 id="操作数栈" tabindex="-1"><a class="header-anchor" href="#操作数栈" aria-hidden="true">#</a> 操作数栈</h3><p>通过局部变量表我们有了要操作和待更新的数据，我们如果对局部变量这些数据进行操作呢？通过操作数栈。当一个方法刚刚开始执行时，其操作数栈是空的，随着方法执行和字节码指令的执行，会从局部变量表或对象实例的字段中复制常量或变量写入到操作数栈，再随着计算的进行将栈中元素出栈到局部变量表或者返回给方法调用者，也就是出栈/入栈操作。一个完整的方法执行期间往往包含多个这样出栈/入栈的过程。</p><h3 id="jvm-指令" tabindex="-1"><a class="header-anchor" href="#jvm-指令" aria-hidden="true">#</a> JVM 指令</h3><ul><li>load 命令：用于将局部变量表的指定位置的相应类型变量加载到操作数栈顶；</li><li>store 命令：用于将操作数栈顶的相应类型数据保入局部变量表的指定位置；</li><li>invokevirtual:调用实例方法</li><li>ireturn: 当前方法返回 int</li></ul><p><strong>再举个例子</strong></p><p>a = b + c 的字节码执行过程中操作数栈以及局部变量表的变化如下图所示</p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-4670450e-6199-4562-9cf4-354234c734c8.jpg" alt="" loading="lazy"></p><p><img src="https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-9808d639-327f-4796-80d4-1809be0b9106.jpg" alt="" loading="lazy"></p><h2 id="asm-操作" tabindex="-1"><a class="header-anchor" href="#asm-操作" aria-hidden="true">#</a> ASM 操作</h2><p>通过上面的介绍，我们对字节码和 JVM 指令有了进一步的了解，下面我们看一下 ASM 是如果编辑 class 字节码的。</p><h2 id="asm-api" tabindex="-1"><a class="header-anchor" href="#asm-api" aria-hidden="true">#</a> ASM API</h2><p>ASM API 基于访问者模式，为我们提供了 ClassVisitor，MethodVisitor，FieldVisitor API 接口，每当 ASM 扫描到类字段是会回调 visitField 方法，扫描到类方法是会回调 MethodVisitor，下面我们看一下 API 接口</p><p><strong>ClassVisitor 方法解析</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ClassVisitor</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">int</span> version<span class="token punctuation">,</span> <span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">String</span> superName<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> interfaces<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">//访问类字段时回调</span>\n    <span class="token keyword">public</span> <span class="token class-name">FieldVisitor</span> <span class="token function">visitField</span><span class="token punctuation">(</span><span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">//访问类方法是回调</span>\n    <span class="token keyword">public</span> <span class="token class-name">MethodVisitor</span> <span class="token function">visitMethod</span><span class="token punctuation">(</span><span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> exceptions<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="methodvisitor-方法解析" tabindex="-1"><a class="header-anchor" href="#methodvisitor-方法解析" aria-hidden="true">#</a> MethodVisitor 方法解析</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MethodVisitor</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitParameter</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> access<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">//访问本地变量类型指令 操作码可以是LOAD,STORE，RET中一种；</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitIntInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token keyword">int</span> operand<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">//域操作指令，用来加载或者存储对象的Field</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitFieldInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token class-name">String</span> owner<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">//访问方法操作指令</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitMethodInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token class-name">String</span> owner<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="asm-使用-demo" tabindex="-1"><a class="header-anchor" href="#asm-使用-demo" aria-hidden="true">#</a> ASM 使用 Demo</h3><p>java 源码</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token operator">+</span>num1<span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>class 字节码</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> public int add(int, int);\n    descriptor: (II)I\n    flags: ACC_PUBLIC\n    Code:\n      stack=2, locals=3, args_size=3\n         0: iload_1\n         1: iload_2\n         2: iadd\n         3: aload_0\n         4: getfield      #2                  // Field num1:I\n         7: iadd\n         8: ireturn\n      LineNumberTable:\n        line 14: 0\n      LocalVariableTable:\n        Start  Length  Slot  Name   Signature\n            0       9     0  this   Lcom/wuba/asmdemo/Test;\n            0       9     1     a   I\n            0       9     2     b   I\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ASM 对应的 API</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mv = cw.visitMethod(ACC_PUBLIC, &quot;add&quot;, &quot;(II)I&quot;, null, null);\nmv.visitCode();\nmv.visitVarInsn(ILOAD, 1);\nmv.visitVarInsn(ILOAD, 2);\nmv.visitInsn(IADD);\nmv.visitVarInsn(ALOAD, 0);\nmv.visitFieldInsn(GETFIELD, &quot;com/wuba/asmdemo/Test&quot;, &quot;num1&quot;, &quot;I&quot;);\nmv.visitInsn(IADD);\nmv.visitInsn(IRETURN);\nLabel l1 = new Label();\nmv.visitLabel(l1);\nmv.visitLocalVariable(&quot;this&quot;, &quot;Lcom/wuba/asmdemo/Test;&quot;, null, l0, l1, 0);\nmv.visitLocalVariable(&quot;a&quot;, &quot;I&quot;, null, l0, l1, 1);\nmv.visitLocalVariable(&quot;b&quot;, &quot;I&quot;, null, l0, l1, 2);\nmv.visitMaxs(2, 3);\nmv.visitEnd();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出 ASM 是在指令层次上操作字节码的，和 class 字节码更加接近。如果我们有些字节码操作的需求，ASM 一定可以实现的。只是使用起来比较麻烦一些。这里强烈推荐一款 ASM 插件</p>',42),p={href:"https://plugins.jetbrains.com/plugin/5918-asm-bytecode-outline",target:"_blank",rel:"noopener noreferrer"},u=(0,e.Uk)("https://plugins.jetbrains.com/plugin/5918-asm-bytecode-outline"),r=(0,e._)("p",null,"可以一键生成对应的 ASM API 代码",-1),v=(0,e._)("p",null,[(0,e._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/jvm/asm-3c8c8db4-5b6a-4576-b147-62965d0e0c1c.jpg",alt:"",loading:"lazy"})],-1),m=(0,e._)("hr",null,null,-1),b=(0,e.Uk)("参考链接："),k={href:"https://zhuanlan.zhihu.com/p/94498015",target:"_blank",rel:"noopener noreferrer"},g=(0,e.Uk)("https://zhuanlan.zhihu.com/p/94498015"),h=(0,e._)("p",null,[(0,e._)("img",{src:"https://cdn.jsdelivr.net/gh/thinkingme/thinkingme.github.io@master/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1),f={},y=(0,a(13860).Z)(f,[["render",function(n,s){const a=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[i,(0,e._)("blockquote",null,[(0,e._)("p",null,[l,(0,e._)("a",t,[c,(0,e.Wm)(a)]),d])]),o,(0,e._)("blockquote",null,[(0,e._)("p",null,[(0,e._)("a",p,[u,(0,e.Wm)(a)])])]),r,v,m,(0,e._)("blockquote",null,[(0,e._)("p",null,[b,(0,e._)("a",k,[g,(0,e.Wm)(a)])])]),h])}]])},13860:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);