"use strict";(self.webpackChunkcoding_road=self.webpackChunkcoding_road||[]).push([[9953],{61769:(a,n,s)=>{s.r(n),s.d(n,{data:()=>e});const e={key:"v-3b896528",path:"/shigu/image-yasuo.html",title:"",lang:"zh-CN",frontmatter:{summary:"坦白从宽吧，我就是那个花了两天两夜把 1M 图片优化到 100kb 的家伙——王小二！ 自从因为一篇报道登上热搜后，我差点抑郁，每天要靠 50 片安眠药才能入睡。 网络上曝光的那些关于一码通的消息，有真有假，我这里就不再澄清了。就说说我是怎么把图片从 1M 优化到 100kb 的故事吧。 是的，由于系统群体规模和访问规模的特殊性，每一行代码、每一张图片、每一",head:[["meta",{property:"og:url",content:"https://vuepress-theme-hope-v2-demo.mrhope.site/shigu/image-yasuo.html"}],["meta",{property:"og:site_name",content:"coding-rode"}],["meta",{property:"og:type",content:"article"}],["meta",{property:"og:updated_time",content:"2022-06-04T07:20:53.000Z"}],["meta",{property:"og:locale",content:"zh-CN"}],["meta",{property:"article:modified_time",content:"2022-06-04T07:20:53.000Z"}]]},excerpt:"",headers:[{level:3,title:"一、图像压缩",slug:"一、图像压缩",children:[]},{level:3,title:"二、Java 数字图像处理",slug:"二、java-数字图像处理",children:[]},{level:3,title:"三、图像压缩实战",slug:"三、图像压缩实战",children:[]},{level:3,title:"四、其他开源库",slug:"四、其他开源库",children:[]},{level:3,title:"四、一点点心声",slug:"四、一点点心声",children:[]}],git:{createdTime:1653617096e3,updatedTime:1654327253e3,contributors:[{name:"林振辉",email:"linzhenhui@apexsoft.com",commits:2}]},readingTime:{minutes:7.61,words:2282},filePathRelative:"shigu/image-yasuo.md"}},48797:(a,n,s)=>{s.r(n),s.d(n,{default:()=>b});var e=s(95393);const t=(0,e.uE)('<p>坦白从宽吧，我就是那个花了两天两夜把 1M 图片优化到 100kb 的家伙——王小二！</p><p>自从因为一篇报道登上热搜后，我差点抑郁，每天要靠 50 片安眠药才能入睡。</p><p>网络上曝光的那些关于一码通的消息，有真有假，我这里就不再澄清了。就说说我是怎么把图片从 1M 优化到 100kb 的故事吧。</p><p>是的，由于系统群体规模和访问规模的特殊性，每一行代码、每一张图片、每一个技术文档都反复核准，优化再优化，精益求精。为确保系统运行得更高效，我们将一张图片从 1MB 压缩到 500KB，再从 500KB 优化到 100KB。</p><p>这样的工作在外人看起来，简单到就好像悄悄给学妹塞一张情书就能让她做我女朋友一样简单。</p><p>但殊不知，这其中蕴含着极高的技术含量！</p><p>不信，我给你们普及下。</p><h3 id="一、图像压缩" tabindex="-1"><a class="header-anchor" href="#一、图像压缩" aria-hidden="true">#</a> 一、图像压缩</h3><p>图像压缩是数据压缩技术在数字图像上的应用，目的是减少图像数据中的冗余信息，从而用更加高效的格式存储和传输数据。</p><p>图像压缩可以是有损数据压缩，也可以是无损数据压缩。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-1.png" alt="" loading="lazy"></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-2.png" alt="" loading="lazy"></p><p>怎么样？</p><p>是不是感觉图像压缩技术没有想象中那么简单了？</p><p>更多关于图像压缩的资料可参考以下链接。</p>',15),p=(0,e.Uk)("机器之心："),o={href:"https://www.jiqizhixin.com/graph/technologies/08b2b25e-21a0-48e1-9de8-f91d424adfe1",target:"_blank",rel:"noopener noreferrer"},c=(0,e.Uk)("https://www.jiqizhixin.com/graph/technologies/08b2b25e-21a0-48e1-9de8-f91d424adfe1"),i=(0,e.uE)('<h3 id="二、java-数字图像处理" tabindex="-1"><a class="header-anchor" href="#二、java-数字图像处理" aria-hidden="true">#</a> 二、Java 数字图像处理</h3><p>作为这次“20 多万外包项目”的“主力开发人员”，我这里就给大家介绍下 Java 数字图像处理技术吧，一开始我就是用它来处理图片的。</p><p>数字图像处理（Digital Image Processing）是通过计算机对图像进行去除噪声、增强、复原、分割、提取特征等处理的方法和技术。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-3.png" alt="" loading="lazy"></p><p>输入的是图像信号，然后经过 DIP 进行有效的算法处理后，输出为数字信号。</p><p>为了压缩图像，我们需要读取图像并将其转换成 BufferedImage 对象，BufferedImage 是 Image 类的一个子类，描述了一个具有可访问的图像数据缓冲区，由 ColorModel 和 Raster 的图像数据组成。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-4.png" alt="" loading="lazy"></p><p>废话我就不多说了，直接进入实战吧！</p><h3 id="三、图像压缩实战" tabindex="-1"><a class="header-anchor" href="#三、图像压缩实战" aria-hidden="true">#</a> 三、图像压缩实战</h3><p>刚好我本地有一张之前用过的封面图，离 1M 只差 236 KB，可以拿来作为测试用。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-5.png" alt="" loading="lazy"></p><p>这其中要用到 ImageIO 类，这是一个静态类，提供了一系列方法用来读和写图像，同时还可以对图像进行简单的编码和解码。</p><p>比如说通过 <code>ImageIO.read()</code> 可以将图像读取到 BufferedImage 对象：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">File</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;ceshi.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">BufferedImage</span> image <span class="token operator">=</span> <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>比如说通过 <code>ImageIO.getImageWritersByFormatName()</code> 可以返回一个 Iterator，其中包含了通过命名格式对图像进行编码的 ImageWriter。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ImageWriter</span><span class="token punctuation">&gt;</span></span> writers <span class="token operator">=</span>  <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">getImageWritersByFormatName</span><span class="token punctuation">(</span><span class="token string">&quot;jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">ImageWriter</span> writer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ImageWriter</span><span class="token punctuation">)</span> writers<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>比如说通过 <code>ImageIO.createImageOutputStream()</code> 可以创建一个图像的输出流对象，有了该对象后就可以通过 <code>ImageWriter.setOutput()</code> 将其设置为输出流。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">File</span> compressedImageFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;bbcompress.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">OutputStream</span> os <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>compressedImageFile<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">ImageOutputStream</span> ios <span class="token operator">=</span> <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">createImageOutputStream</span><span class="token punctuation">(</span>os<span class="token punctuation">)</span><span class="token punctuation">;</span>\nwriter<span class="token punctuation">.</span><span class="token function">setOutput</span><span class="token punctuation">(</span>ios<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>紧接着，可以对 ImageWriter 进行一些参数配置，比如说压缩模式，压缩质量等等。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ImageWriteParam</span> param <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">getDefaultWriteParam</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nparam<span class="token punctuation">.</span><span class="token function">setCompressionMode</span><span class="token punctuation">(</span><span class="token class-name">ImageWriteParam</span><span class="token punctuation">.</span>MODE_EXPLICIT<span class="token punctuation">)</span><span class="token punctuation">;</span>\nparam<span class="token punctuation">.</span><span class="token function">setCompressionQuality</span><span class="token punctuation">(</span><span class="token number">0.01f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压缩模式一共有四种，MODE_EXPLICIT 是其中一种，表示 ImageWriter 可以根据后续的 set 的附加信息进行平铺和压缩，比如说接下来的 <code>setCompressionQuality()</code> 方法。</p><p><code>setCompressionQuality()</code> 方法的参数是一个 0-1 之间的数，0.0 表示尽最大程度压缩，1.0 表示保证图像质量很重要。对于有损压缩方案，压缩质量应该控制文件大小和图像质量之间的权衡（例如，通过在写入 JPEG 图像时选择量化表）。 对于无损方案，压缩质量可用于控制文件大小和执行压缩所需的时间之间的权衡（例如，通过优化行过滤器并在写入 PNG 图像时设置 ZLIB 压缩级别）。</p><p>整体代码如下所示：</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token class-name">File</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;ceshi.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">BufferedImage</span> image <span class="token operator">=</span> <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n            <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ImageWriter</span><span class="token punctuation">&gt;</span></span> writers <span class="token operator">=</span> <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">getImageWritersByFormatName</span><span class="token punctuation">(</span><span class="token string">&quot;jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">ImageWriter</span> writer <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ImageWriter</span><span class="token punctuation">)</span> writers<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token class-name">File</span> compressedImageFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">&quot;bbcompress.jpg&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">OutputStream</span> os <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>compressedImageFile<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token class-name">ImageOutputStream</span> ios <span class="token operator">=</span> <span class="token class-name">ImageIO</span><span class="token punctuation">.</span><span class="token function">createImageOutputStream</span><span class="token punctuation">(</span>os<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            writer<span class="token punctuation">.</span><span class="token function">setOutput</span><span class="token punctuation">(</span>ios<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n\n            <span class="token class-name">ImageWriteParam</span> param <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">getDefaultWriteParam</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            param<span class="token punctuation">.</span><span class="token function">setCompressionMode</span><span class="token punctuation">(</span><span class="token class-name">ImageWriteParam</span><span class="token punctuation">.</span>MODE_EXPLICIT<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            param<span class="token punctuation">.</span><span class="token function">setCompressionQuality</span><span class="token punctuation">(</span><span class="token number">0.01f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            writer<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">IIOImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            os<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            ios<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            writer<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行压缩后，可以看到图片的大小压缩到了 19 KB：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-6.png" alt="" loading="lazy"></p><p>可以看得出，质量因子为 0.01f 的时候图片已经有些失真了，可以适当提高质量因子比如说 0.5f，再来看一下。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-7.png" alt="" loading="lazy"></p><p>图片质量明显提高了，但大小依然只有 64 KB，压缩效果还是值得信赖的。</p><h3 id="四、其他开源库" tabindex="-1"><a class="header-anchor" href="#四、其他开源库" aria-hidden="true">#</a> 四、其他开源库</h3><p>接下来，推荐一些可以轻松集成到项目中的图像处理库吧，它们全都是免费的。</p><p>1）ImageJ，用 Java 编写的，可以编辑、分析、处理、保存和打印图像。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-8.png" alt="" loading="lazy"></p><p>2）Apache Commons Imaging，一个读取和写入各种图像格式的库，包括快速解析图像信息（如大小，颜色，空间，ICC 配置文件等）和元数据。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-9.png" alt="" loading="lazy"></p><p>3）ImageMagick，可以读取和写入超过 100 种格式的图像，包括 DPX、EXR、GIF、JPEG、JPEG-2000、PDF、PNG、Postscript、SVG 和 TIFF。还可以调整大小、翻转、镜像、旋转、扭曲、剪切和变换图像，调整图像颜色，应用各种特殊效果，包括绘制文本、线条、多边形、椭圆和贝塞尔曲线。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-10.png" alt="" loading="lazy"></p><p>4）OpenCV，由 BSD 许可证发布，可以免费学习和商业使用，提供了包括 C/C++、Python 和 Java 等主流编程语言在内的接口。OpenCV 专为计算效率而设计，强调实时应用，可以充分发挥多核处理器的优势。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-11.png" alt="" loading="lazy"></p><p>这里就以 OpenCV 为例，来演示一下图像压缩。当然了，OpenCV 用来压缩图像属于典型的大材小用。</p><p>第一步，添加 OpenCV 依赖到我们的项目当中，以 Maven 为例。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;\n\t&lt;groupId&gt;org.openpnp&lt;/groupId&gt;\n\t&lt;artifactId&gt;opencv&lt;/artifactId&gt;\n\t&lt;version&gt;4.5.1-2&lt;/version&gt;\n&lt;/dependency&gt;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，要想使用 OpenCV，需要先初始化。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">OpenCV</span><span class="token punctuation">.</span><span class="token function">loadShared</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三步，使用 OpenCV 读取图片。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">Mat</span> src <span class="token operator">=</span> <span class="token class-name">Imgcodecs</span><span class="token punctuation">.</span><span class="token function">imread</span><span class="token punctuation">(</span>imagePath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第四步，使用 OpenCV 压缩图片。</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">MatOfInt</span> dstImage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MatOfInt</span><span class="token punctuation">(</span><span class="token class-name">Imgcodecs</span><span class="token punctuation">.</span>IMWRITE_JPEG_QUALITY<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">Imgcodecs</span><span class="token punctuation">.</span><span class="token function">imwrite</span><span class="token punctuation">(</span><span class="token string">&quot;resized_image.jpg&quot;</span><span class="token punctuation">,</span> sourceImage<span class="token punctuation">,</span> dstImage<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>MatOfInt 的构造参数是一个可变参数，第一个参数 IMWRITE_JPEG_QUALITY 表示对图片的质量进行改变，第二个是质量因子，1-100，值越大表示质量越高。</p><p>执行代码后得到的图片如下所示：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-12.png" alt="" loading="lazy"></p><p>借这个机会，来对比下 OpenCV 和 JDK 原生 API 在压缩图像时所使用的时间。</p><p>这是我本机的配置情况，早年买的顶配 iMac，也是我的主力机。一开始只有 16 G 内存，后来加了一个 16 G 内存条，不过最近半年电脑突然死机重启的频率明显提高了，不知道是不是 Big Sur 这个操作系统的问题还是电脑硬件老了。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-13.png" alt="" loading="lazy"></p><p>结果如下所示：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>opencvCompress压缩完成，所花时间：1070\njdkCompress压缩完成，所花时间：322\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>压缩后的图片大小差不多，都是 19 KB，并且质量因子都是最低值。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-14.png" alt="" loading="lazy"></p><h3 id="四、一点点心声" tabindex="-1"><a class="header-anchor" href="#四、一点点心声" aria-hidden="true">#</a> 四、一点点心声</h3><p>经过上面的技术分析后，相信你们都明白了，把 1M 图片优化到 100kb 实在是一件“不太容易”的事情。。。。</p><p>100KB 很小了吧？只有原来的 1/10。</p><p>要知道，我可是连续加班了两天两夜，不眠不休。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-15.png" alt="" loading="lazy"></p><p>累到最后，我趴在电脑上都睡着了。</p><p>没想到哈喇子直接给电脑整短路了，我这才算是从梦里面吓醒来了！</p><p>😔，生活不易，且行且珍惜吧~</p><hr><p><strong>本篇已收录至 GitHub 上星标 1.6k+ star 的开源专栏《Java 程序员进阶之路》，据说每一个优秀的 Java 程序员都喜欢她，风趣幽默、通俗易懂。内容包括 Java 基础、Java 并发编程、Java 虚拟机、Java 企业级开发、Java 面试等核心知识点。学 Java，就认准 Java 程序员进阶之路</strong>😄。</p>',68),l={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},u=(0,e.Uk)("https://github.com/itwanger/toBeBetterJavaer"),r=(0,e._)("p",null,"star 了这个仓库就等于你拥有了成为了一名优秀 Java 工程师的潜力。也可以戳下面的链接跳转到《Java 程序员进阶之路》的官网网址，开始愉快的学习之旅吧。",-1),d={href:"https://tobebetterjavaer.com/",target:"_blank",rel:"noopener noreferrer"},m=(0,e.Uk)("https://tobebetterjavaer.com/"),k=(0,e._)("p",null,[(0,e._)("img",{src:"https://img-blog.csdnimg.cn/img_convert/79995d0b7cca47da7c124bf1995a0d3b.png",alt:"image",loading:"lazy"})],-1),g=(0,e._)("p",null,[(0,e._)("em",null,"没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟"),(0,e.Uk)("。")],-1),v={},b=(0,s(13860).Z)(v,[["render",function(a,n){const s=(0,e.up)("ExternalLinkIcon");return(0,e.wg)(),(0,e.iD)("div",null,[t,(0,e._)("blockquote",null,[(0,e._)("p",null,[p,(0,e._)("a",o,[c,(0,e.Wm)(s)])])]),i,(0,e._)("p",null,[(0,e._)("a",l,[u,(0,e.Wm)(s)])]),r,(0,e._)("p",null,[(0,e._)("a",d,[m,(0,e.Wm)(s)])]),k,g])}]])},13860:(a,n)=>{n.Z=(a,n)=>{const s=a.__vccOpts||a;for(const[a,e]of n)s[a]=e;return s}}}]);