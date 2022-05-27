var qe=Object.defineProperty,Ke=Object.defineProperties;var Ge=Object.getOwnPropertyDescriptors;var Ce=Object.getOwnPropertySymbols;var Xe=Object.prototype.hasOwnProperty,Ye=Object.prototype.propertyIsEnumerable;var we=(e,t,n)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,he=(e,t)=>{for(var n in t||(t={}))Xe.call(t,n)&&we(e,n,t[n]);if(Ce)for(var n of Ce(t))Ye.call(t,n)&&we(e,n,t[n]);return e},me=(e,t)=>Ke(e,Ge(t));import{j as ne,B as Ie,k as Me,l as Je,m as Qe,n as ve,p as Ze,_ as T,r as W,b as u,e as p,g as C,d as S,q as z,s as _,h as r,F as A,v as U,x as w,f as y,t as E,y as ae,z as be,A as N,w as B,C as Te,D as $,i as ie,E as de,G as et,H as tt,I as nt,J as ge,K as ke,L as Ae,M as He,N as V,u as Pe,a as M,O as G,P as Re,Q as ue,R as at,S as ot,T as ye,U as Fe,V as Oe,W as rt,X as $e,Y as st,Z as le,$ as Le,a0 as lt,a1 as it,a2 as ut}from"./app.aa92d027.js";const F="transition",ee="animation",pe=(e,{slots:t})=>ne(Ie,ct(e),t);pe.displayName="Transition";const ze={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};pe.props=Me({},Ie.props,ze);const q=(e,t=[])=>{ve(e)?e.forEach(n=>n(...t)):e&&e(...t)},Se=e=>e?ve(e)?e.some(t=>t.length>1):e.length>1:!1;function ct(e){const t={};for(const h in e)h in ze||(t[h]=e[h]);if(e.css===!1)return t;const{name:n="v",type:a,duration:s,enterFromClass:d=`${n}-enter-from`,enterActiveClass:m=`${n}-enter-active`,enterToClass:f=`${n}-enter-to`,appearFromClass:o=d,appearActiveClass:l=m,appearToClass:i=f,leaveFromClass:c=`${n}-leave-from`,leaveActiveClass:v=`${n}-leave-active`,leaveToClass:b=`${n}-leave-to`}=e,k=vt(s),L=k&&k[0],g=k&&k[1],{onBeforeEnter:D,onEnter:I,onEnterCancelled:H,onLeave:j,onLeaveCancelled:oe,onBeforeAppear:re=D,onAppear:fe=I,onAppearCancelled:X=H}=t,Y=(h,x,P)=>{K(h,x?i:f),K(h,x?l:m),P&&P()},J=(h,x)=>{h._isLeaving=!1,K(h,c),K(h,b),K(h,v),x&&x()},Q=h=>(x,P)=>{const Z=h?fe:I,se=()=>Y(x,h,P);q(Z,[x,se]),Ne(()=>{K(x,h?o:d),O(x,h?i:f),Se(Z)||De(x,a,L,se)})};return Me(t,{onBeforeEnter(h){q(D,[h]),O(h,d),O(h,m)},onBeforeAppear(h){q(re,[h]),O(h,o),O(h,l)},onEnter:Q(!1),onAppear:Q(!0),onLeave(h,x){h._isLeaving=!0;const P=()=>J(h,x);O(h,c),ft(),O(h,v),Ne(()=>{!h._isLeaving||(K(h,c),O(h,b),Se(j)||De(h,a,g,P))}),q(j,[h,P])},onEnterCancelled(h){Y(h,!1),q(H,[h])},onAppearCancelled(h){Y(h,!0),q(X,[h])},onLeaveCancelled(h){J(h),q(oe,[h])}})}function vt(e){if(e==null)return null;if(Je(e))return[_e(e.enter),_e(e.leave)];{const t=_e(e);return[t,t]}}function _e(e){return Qe(e)}function O(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e._vtc||(e._vtc=new Set)).add(t)}function K(e,t){t.split(/\s+/).forEach(a=>a&&e.classList.remove(a));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function Ne(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let dt=0;function De(e,t,n,a){const s=e._endId=++dt,d=()=>{s===e._endId&&a()};if(n)return setTimeout(d,n);const{type:m,timeout:f,propCount:o}=pt(e,t);if(!m)return a();const l=m+"end";let i=0;const c=()=>{e.removeEventListener(l,v),d()},v=b=>{b.target===e&&++i>=o&&c()};setTimeout(()=>{i<o&&c()},f+1),e.addEventListener(l,v)}function pt(e,t){const n=window.getComputedStyle(e),a=k=>(n[k]||"").split(", "),s=a(F+"Delay"),d=a(F+"Duration"),m=xe(s,d),f=a(ee+"Delay"),o=a(ee+"Duration"),l=xe(f,o);let i=null,c=0,v=0;t===F?m>0&&(i=F,c=m,v=d.length):t===ee?l>0&&(i=ee,c=l,v=o.length):(c=Math.max(m,l),i=c>0?m>l?F:ee:null,v=i?i===F?d.length:o.length:0);const b=i===F&&/\b(transform|all)(,|$)/.test(n[F+"Property"]);return{type:i,timeout:c,propCount:v,hasTransform:b}}function xe(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,a)=>Ee(n)+Ee(e[a])))}function Ee(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function ft(){return document.body.offsetHeight}const ht={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},mt=(e,t)=>n=>{if(!("key"in n))return;const a=Ze(n.key);if(t.some(s=>s===a||ht[s]===a))return e(n)},ce={beforeMount(e,{value:t},{transition:n}){e._vod=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):te(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:a}){!t!=!n&&(a?t?(a.beforeEnter(e),te(e,!0),a.enter(e)):a.leave(e,()=>{te(e,!1)}):te(e,t))},beforeUnmount(e,{value:t}){te(e,t)}};function te(e,t){e.style.display=t?e._vod:"none"}const _t={},bt={class:"theme-default-content custom"};function gt(e,t){const n=W("Content");return u(),p("div",bt,[C(n)])}var kt=T(_t,[["render",gt],["__file","HomeContent.vue"]]);const yt={key:0,class:"features"},$t=S({setup(e){const t=z(),n=_(()=>ve(t.value.features)?t.value.features:[]);return(a,s)=>r(n).length?(u(),p("div",yt,[(u(!0),p(A,null,U(r(n),d=>(u(),p("div",{key:d.title,class:"feature"},[y("h2",null,E(d.title),1),y("p",null,E(d.details),1)]))),128))])):w("",!0)}});var Lt=T($t,[["__file","HomeFeatures.vue"]]);const Ct=["innerHTML"],wt=["textContent"],Tt=S({setup(e){const t=z(),n=_(()=>t.value.footer),a=_(()=>t.value.footerHtml);return(s,d)=>r(n)?(u(),p(A,{key:0},[r(a)?(u(),p("div",{key:0,class:"footer",innerHTML:r(n)},null,8,Ct)):(u(),p("div",{key:1,class:"footer",textContent:E(r(n))},null,8,wt))],64)):w("",!0)}});var St=T(Tt,[["__file","HomeFooter.vue"]]);const Nt=["href","rel","target","aria-label"],Dt=S({inheritAttrs:!1}),xt=S(me(he({},Dt),{props:{item:{type:Object,required:!0}},setup(e){const t=e,n=ae(),a=nt(),{item:s}=be(t),d=_(()=>de(s.value.link)),m=_(()=>et(s.value.link)||tt(s.value.link)),f=_(()=>{if(!m.value){if(s.value.target)return s.value.target;if(d.value)return"_blank"}}),o=_(()=>f.value==="_blank"),l=_(()=>!d.value&&!m.value&&!o.value),i=_(()=>{if(!m.value){if(s.value.rel)return s.value.rel;if(o.value)return"noopener noreferrer"}}),c=_(()=>s.value.ariaLabel||s.value.text),v=_(()=>{const L=Object.keys(a.value.locales);return L.length?!L.some(g=>g===s.value.link):s.value.link!=="/"}),b=_(()=>v.value?n.path.startsWith(s.value.link):!1),k=_(()=>l.value?s.value.activeMatch?new RegExp(s.value.activeMatch).test(n.path):b.value:!1);return(L,g)=>{const D=W("RouterLink"),I=W("AutoLinkExternalIcon");return r(l)?(u(),N(D,Te({key:0,class:{"router-link-active":r(k)},to:r(s).link,"aria-label":r(c)},L.$attrs),{default:B(()=>[$(L.$slots,"before"),ie(" "+E(r(s).text)+" ",1),$(L.$slots,"after")]),_:3},16,["class","to","aria-label"])):(u(),p("a",Te({key:1,class:"external-link",href:r(s).link,rel:r(i),target:r(f),"aria-label":r(c)},L.$attrs),[$(L.$slots,"before"),ie(" "+E(r(s).text)+" ",1),r(o)?(u(),N(I,{key:0})):w("",!0),$(L.$slots,"after")],16,Nt))}}}));var R=T(xt,[["__file","AutoLink.vue"]]);const Et={class:"hero"},Bt={key:0,id:"main-title"},It={key:1,class:"description"},Mt={key:2,class:"actions"},At=S({setup(e){const t=z(),n=ge(),a=ke(),s=_(()=>a.value&&t.value.heroImageDark!==void 0?t.value.heroImageDark:t.value.heroImage),d=_(()=>t.value.heroText===null?null:t.value.heroText||n.value.title||"Hello"),m=_(()=>t.value.heroAlt||d.value||"hero"),f=_(()=>t.value.tagline===null?null:t.value.tagline||n.value.description||"Welcome to your VuePress site"),o=_(()=>ve(t.value.actions)?t.value.actions.map(({text:i,link:c,type:v="primary"})=>({text:i,link:c,type:v})):[]),l=()=>{if(!s.value)return null;const i=ne("img",{src:Ae(s.value),alt:m.value});return t.value.heroImageDark===void 0?i:ne(He,()=>i)};return(i,c)=>(u(),p("header",Et,[C(l),r(d)?(u(),p("h1",Bt,E(r(d)),1)):w("",!0),r(f)?(u(),p("p",It,E(r(f)),1)):w("",!0),r(o).length?(u(),p("p",Mt,[(u(!0),p(A,null,U(r(o),v=>(u(),N(R,{key:v.text,class:V(["action-button",[v.type]]),item:v},null,8,["class","item"]))),128))])):w("",!0)]))}});var Ht=T(At,[["__file","HomeHero.vue"]]);const Pt={class:"home"},Rt=S({setup(e){return(t,n)=>(u(),p("main",Pt,[C(Ht),C(Lt),C(kt),C(St)]))}});var Ft=T(Rt,[["__file","Home.vue"]]);const Ot=S({setup(e){const t=Pe(),n=ge(),a=M(),s=ke(),d=_(()=>a.value.home||t.value),m=_(()=>n.value.title),f=_(()=>s.value&&a.value.logoDark!==void 0?a.value.logoDark:a.value.logo),o=()=>{if(!f.value)return null;const l=ne("img",{class:"logo",src:Ae(f.value),alt:m.value});return a.value.logoDark===void 0?l:ne(He,()=>l)};return(l,i)=>{const c=W("RouterLink");return u(),N(c,{to:r(d)},{default:B(()=>[C(o),r(m)?(u(),p("span",{key:0,class:V(["site-name",{"can-hide":r(f)}])},E(r(m)),3)):w("",!0)]),_:1},8,["to"])}}});var zt=T(Ot,[["__file","NavbarBrand.vue"]]);const Vt=S({setup(e){const t=a=>{a.style.height=a.scrollHeight+"px"},n=a=>{a.style.height=""};return(a,s)=>(u(),N(pe,{name:"dropdown",onEnter:t,onAfterEnter:n,onBeforeLeave:t},{default:B(()=>[$(a.$slots,"default")]),_:3}))}});var Ve=T(Vt,[["__file","DropdownTransition.vue"]]);const Wt=["aria-label"],Ut={class:"title"},jt=y("span",{class:"arrow down"},null,-1),qt=["aria-label"],Kt={class:"title"},Gt={class:"navbar-dropdown"},Xt={class:"navbar-dropdown-subtitle"},Yt={key:1},Jt={class:"navbar-dropdown-subitem-wrapper"},Qt=S({props:{item:{type:Object,required:!0}},setup(e){const t=e,{item:n}=be(t),a=_(()=>n.value.ariaLabel||n.value.text),s=G(!1),d=ae();Re(()=>d.path,()=>{s.value=!1});const m=o=>{o.detail===0?s.value=!s.value:s.value=!1},f=(o,l)=>l[l.length-1]===o;return(o,l)=>(u(),p("div",{class:V(["navbar-dropdown-wrapper",{open:s.value}])},[y("button",{class:"navbar-dropdown-title",type:"button","aria-label":r(a),onClick:m},[y("span",Ut,E(r(n).text),1),jt],8,Wt),y("button",{class:"navbar-dropdown-title-mobile",type:"button","aria-label":r(a),onClick:l[0]||(l[0]=i=>s.value=!s.value)},[y("span",Kt,E(r(n).text),1),y("span",{class:V(["arrow",s.value?"down":"right"])},null,2)],8,qt),C(Ve,null,{default:B(()=>[ue(y("ul",Gt,[(u(!0),p(A,null,U(r(n).children,i=>(u(),p("li",{key:i.text,class:"navbar-dropdown-item"},[i.children?(u(),p(A,{key:0},[y("h4",Xt,[i.link?(u(),N(R,{key:0,item:i,onFocusout:c=>f(i,r(n).children)&&i.children.length===0&&(s.value=!1)},null,8,["item","onFocusout"])):(u(),p("span",Yt,E(i.text),1))]),y("ul",Jt,[(u(!0),p(A,null,U(i.children,c=>(u(),p("li",{key:c.link,class:"navbar-dropdown-subitem"},[C(R,{item:c,onFocusout:v=>f(c,i.children)&&f(i,r(n).children)&&(s.value=!1)},null,8,["item","onFocusout"])]))),128))])],64)):(u(),N(R,{key:1,item:i,onFocusout:c=>f(i,r(n).children)&&(s.value=!1)},null,8,["item","onFocusout"]))]))),128))],512),[[ce,s.value]])]),_:1})],2))}});var Zt=T(Qt,[["__file","NavbarDropdown.vue"]]);const Be=e=>decodeURI(e).replace(/#.*$/,"").replace(/(index)?\.(md|html)$/,""),en=(e,t)=>{if(t.hash===e)return!0;const n=Be(t.path),a=Be(e);return n===a},We=(e,t)=>e.link&&en(e.link,t)?!0:e.children?e.children.some(n=>We(n,t)):!1,Ue=e=>!de(e)||/github\.com/.test(e)?"GitHub":/bitbucket\.org/.test(e)?"Bitbucket":/gitlab\.com/.test(e)?"GitLab":/gitee\.com/.test(e)?"Gitee":null,tn={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},nn=({docsRepo:e,editLinkPattern:t})=>{if(t)return t;const n=Ue(e);return n!==null?tn[n]:null},an=({docsRepo:e,docsBranch:t,docsDir:n,filePathRelative:a,editLinkPattern:s})=>{if(!a)return null;const d=nn({docsRepo:e,editLinkPattern:s});return d?d.replace(/:repo/,de(e)?e:`https://github.com/${e}`).replace(/:branch/,t).replace(/:path/,at(`${ot(n)}/${a}`)):null},on={key:0,class:"navbar-items"},rn=S({setup(e){const t=()=>{const l=ye(),i=Pe(),c=ge(),v=M();return _(()=>{var D,I;const b=Object.keys(c.value.locales);if(b.length<2)return[];const k=l.currentRoute.value.path,L=l.currentRoute.value.fullPath;return[{text:(D=v.value.selectLanguageText)!=null?D:"unknown language",ariaLabel:(I=v.value.selectLanguageAriaLabel)!=null?I:"unkown language",children:b.map(H=>{var Y,J,Q,h,x,P;const j=(J=(Y=c.value.locales)==null?void 0:Y[H])!=null?J:{},oe=(h=(Q=v.value.locales)==null?void 0:Q[H])!=null?h:{},re=`${j.lang}`,fe=(x=oe.selectLanguageName)!=null?x:re;let X;if(re===c.value.lang)X=L;else{const Z=k.replace(i.value,H);l.getRoutes().some(se=>se.path===Z)?X=Z:X=(P=oe.home)!=null?P:H}return{text:fe,link:X}})}]})},n=()=>{const l=M(),i=_(()=>l.value.repo),c=_(()=>i.value?Ue(i.value):null),v=_(()=>i.value&&!de(i.value)?`https://github.com/${i.value}`:i.value),b=_(()=>v.value?l.value.repoLabel?l.value.repoLabel:c.value===null?"Source":c.value:null);return _(()=>!v.value||!b.value?[]:[{text:b.value,link:v.value}])},a=l=>Fe(l)?Oe(l):l.children?me(he({},l),{children:l.children.map(a)}):l,d=(()=>{const l=M();return _(()=>(l.value.navbar||[]).map(a))})(),m=t(),f=n(),o=_(()=>[...d.value,...m.value,...f.value]);return(l,i)=>r(o).length?(u(),p("nav",on,[(u(!0),p(A,null,U(r(o),c=>(u(),p("div",{key:c.text,class:"navbar-item"},[c.children?(u(),N(Zt,{key:0,item:c},null,8,["item"])):(u(),N(R,{key:1,item:c},null,8,["item"]))]))),128))])):w("",!0)}});var je=T(rn,[["__file","NavbarItems.vue"]]);const sn=["title"],ln={class:"icon",focusable:"false",viewBox:"0 0 32 32"},un=rt('<path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path>',9),cn=[un],vn={class:"icon",focusable:"false",viewBox:"0 0 32 32"},dn=y("path",{d:"M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",fill:"currentColor"},null,-1),pn=[dn],fn=S({setup(e){const t=M(),n=ke(),a=()=>{n.value=!n.value};return(s,d)=>(u(),p("button",{class:"toggle-dark-button",title:r(t).toggleDarkMode,onClick:a},[ue((u(),p("svg",ln,cn,512)),[[ce,!r(n)]]),ue((u(),p("svg",vn,pn,512)),[[ce,r(n)]])],8,sn))}});var hn=T(fn,[["__file","ToggleDarkModeButton.vue"]]);const mn=["title"],_n=y("div",{class:"icon","aria-hidden":"true"},[y("span"),y("span"),y("span")],-1),bn=[_n],gn=S({emits:["toggle"],setup(e){const t=M();return(n,a)=>(u(),p("div",{class:"toggle-sidebar-button",title:r(t).toggleSidebar,"aria-expanded":"false",role:"button",tabindex:"0",onClick:a[0]||(a[0]=s=>n.$emit("toggle"))},bn,8,mn))}});var kn=T(gn,[["__file","ToggleSidebarButton.vue"]]);const yn=S({emits:["toggle-sidebar"],setup(e){const t=M(),n=G(null),a=G(null),s=G(0),d=_(()=>s.value?{maxWidth:s.value+"px"}:{}),m=_(()=>t.value.darkMode);$e(()=>{const l=f(n.value,"paddingLeft")+f(n.value,"paddingRight"),i=()=>{var c;window.innerWidth<=719?s.value=0:s.value=n.value.offsetWidth-l-(((c=a.value)==null?void 0:c.offsetWidth)||0)};i(),window.addEventListener("resize",i,!1),window.addEventListener("orientationchange",i,!1)});function f(o,l){var v,b,k;const i=(k=(b=(v=o==null?void 0:o.ownerDocument)==null?void 0:v.defaultView)==null?void 0:b.getComputedStyle(o,null))==null?void 0:k[l],c=Number.parseInt(i,10);return Number.isNaN(c)?0:c}return(o,l)=>{const i=W("NavbarSearch");return u(),p("header",{ref_key:"navbar",ref:n,class:"navbar"},[C(kn,{onToggle:l[0]||(l[0]=c=>o.$emit("toggle-sidebar"))}),y("span",{ref_key:"navbarBrand",ref:a},[C(zt)],512),y("div",{class:"navbar-items-wrapper",style:st(r(d))},[$(o.$slots,"before"),C(je,{class:"can-hide"}),$(o.$slots,"after"),r(m)?(u(),N(hn,{key:0})):w("",!0),C(i)],4)],512)}}});var $n=T(yn,[["__file","Navbar.vue"]]);const Ln={class:"page-meta"},Cn={key:0,class:"meta-item edit-link"},wn={key:1,class:"meta-item last-updated"},Tn={class:"meta-item-label"},Sn={class:"meta-item-info"},Nn={key:2,class:"meta-item contributors"},Dn={class:"meta-item-label"},xn={class:"meta-item-info"},En=["title"],Bn=ie(", "),In=S({setup(e){const t=()=>{const o=M(),l=le(),i=z();return _(()=>{var I,H,j;if(!((H=(I=i.value.editLink)!=null?I:o.value.editLink)!=null?H:!0))return null;const{repo:v,docsRepo:b=v,docsBranch:k="main",docsDir:L="",editLinkText:g}=o.value;if(!b)return null;const D=an({docsRepo:b,docsBranch:k,docsDir:L,filePathRelative:l.value.filePathRelative,editLinkPattern:(j=i.value.editLinkPattern)!=null?j:o.value.editLinkPattern});return D?{text:g!=null?g:"Edit this page",link:D}:null})},n=()=>{const o=M(),l=le(),i=z();return _(()=>{var b,k,L,g;return!((k=(b=i.value.lastUpdated)!=null?b:o.value.lastUpdated)!=null?k:!0)||!((L=l.value.git)!=null&&L.updatedTime)?null:new Date((g=l.value.git)==null?void 0:g.updatedTime).toLocaleString()})},a=()=>{const o=M(),l=le(),i=z();return _(()=>{var v,b,k,L;return((b=(v=i.value.contributors)!=null?v:o.value.contributors)!=null?b:!0)&&(L=(k=l.value.git)==null?void 0:k.contributors)!=null?L:null})},s=M(),d=t(),m=n(),f=a();return(o,l)=>{const i=W("ClientOnly");return u(),p("footer",Ln,[r(d)?(u(),p("div",Cn,[C(R,{class:"meta-item-label",item:r(d)},null,8,["item"])])):w("",!0),r(m)?(u(),p("div",wn,[y("span",Tn,E(r(s).lastUpdatedText)+": ",1),C(i,null,{default:B(()=>[y("span",Sn,E(r(m)),1)]),_:1})])):w("",!0),r(f)&&r(f).length?(u(),p("div",Nn,[y("span",Dn,E(r(s).contributorsText)+": ",1),y("span",xn,[(u(!0),p(A,null,U(r(f),(c,v)=>(u(),p(A,{key:v},[y("span",{class:"contributor",title:`email: ${c.email}`},E(c.name),9,En),v!==r(f).length-1?(u(),p(A,{key:0},[Bn],64)):w("",!0)],64))),128))])])):w("",!0)])}}});var Mn=T(In,[["__file","PageMeta.vue"]]);const An={key:0,class:"page-nav"},Hn={class:"inner"},Pn={key:0,class:"prev"},Rn={key:1,class:"next"},Fn=S({setup(e){const t=o=>o===!1?null:Fe(o)?Oe(o):lt(o)?o:!1,n=(o,l,i)=>{const c=o.findIndex(v=>v.link===l);if(c!==-1){const v=o[c+i];return v!=null&&v.link?v:null}for(const v of o)if(v.children){const b=n(v.children,l,i);if(b)return b}return null},a=z(),s=Le(),d=ae(),m=_(()=>{const o=t(a.value.prev);return o!==!1?o:n(s.value,d.path,-1)}),f=_(()=>{const o=t(a.value.next);return o!==!1?o:n(s.value,d.path,1)});return(o,l)=>r(m)||r(f)?(u(),p("nav",An,[y("p",Hn,[r(m)?(u(),p("span",Pn,[C(R,{item:r(m)},null,8,["item"])])):w("",!0),r(f)?(u(),p("span",Rn,[C(R,{item:r(f)},null,8,["item"])])):w("",!0)])])):w("",!0)}});var On=T(Fn,[["__file","PageNav.vue"]]);const zn={class:"page"},Vn={class:"theme-default-content"},Wn=S({setup(e){return(t,n)=>{const a=W("Content");return u(),p("main",zn,[$(t.$slots,"top"),y("div",Vn,[$(t.$slots,"content-top"),C(a),$(t.$slots,"content-bottom")]),C(Mn),C(On),$(t.$slots,"bottom")])}}});var Un=T(Wn,[["__file","Page.vue"]]);const jn={class:"sidebar-item-children"},qn=S({props:{item:{type:Object,required:!0},depth:{type:Number,required:!1,default:0}},setup(e){const t=e,{item:n,depth:a}=be(t),s=ae(),d=ye(),m=_(()=>We(n.value,s)),f=_(()=>({"sidebar-item":!0,"sidebar-heading":a.value===0,active:m.value,collapsible:n.value.collapsible})),o=G(!0),l=G(void 0);return n.value.collapsible&&(o.value=m.value,l.value=()=>{o.value=!o.value},d.afterEach(()=>{o.value=m.value})),(i,c)=>{var b;const v=W("SidebarItem",!0);return u(),p("li",null,[r(n).link?(u(),N(R,{key:0,class:V(r(f)),item:r(n)},null,8,["class","item"])):(u(),p("p",{key:1,tabindex:"0",class:V(r(f)),onClick:c[0]||(c[0]=(...k)=>l.value&&l.value(...k)),onKeydown:c[1]||(c[1]=mt((...k)=>l.value&&l.value(...k),["enter"]))},[ie(E(r(n).text)+" ",1),r(n).collapsible?(u(),p("span",{key:0,class:V(["arrow",o.value?"down":"right"])},null,2)):w("",!0)],34)),(b=r(n).children)!=null&&b.length?(u(),N(Ve,{key:2},{default:B(()=>[ue(y("ul",jn,[(u(!0),p(A,null,U(r(n).children,k=>(u(),N(v,{key:`${r(a)}${k.text}${k.link}`,item:k,depth:r(a)+1},null,8,["item","depth"]))),128))],512),[[ce,o.value]])]),_:1})):w("",!0)])}}});var Kn=T(qn,[["__file","SidebarItem.vue"]]);const Gn={key:0,class:"sidebar-items"},Xn=S({setup(e){const t=ae(),n=Le();return $e(()=>{Re(()=>t.hash,a=>{const s=document.querySelector(".sidebar");if(!s)return;const d=document.querySelector(`.sidebar a.sidebar-item[href="${t.path}${a}"]`);if(!d)return;const{top:m,height:f}=s.getBoundingClientRect(),{top:o,height:l}=d.getBoundingClientRect();o<m?d.scrollIntoView(!0):o+l>m+f&&d.scrollIntoView(!1)})}),(a,s)=>r(n).length?(u(),p("ul",Gn,[(u(!0),p(A,null,U(r(n),d=>(u(),N(Kn,{key:d.link||d.text,item:d},null,8,["item"]))),128))])):w("",!0)}});var Yn=T(Xn,[["__file","SidebarItems.vue"]]);const Jn={class:"sidebar"},Qn=S({setup(e){return(t,n)=>(u(),p("aside",Jn,[C(je),$(t.$slots,"top"),C(Yn),$(t.$slots,"bottom")]))}});var Zn=T(Qn,[["__file","Sidebar.vue"]]);const ea=S({setup(e){const t=le(),n=z(),a=M(),s=_(()=>n.value.navbar!==!1&&a.value.navbar!==!1),d=Le(),m=G(!1),f=g=>{m.value=typeof g=="boolean"?g:!m.value},o={x:0,y:0},l=g=>{o.x=g.changedTouches[0].clientX,o.y=g.changedTouches[0].clientY},i=g=>{const D=g.changedTouches[0].clientX-o.x,I=g.changedTouches[0].clientY-o.y;Math.abs(D)>Math.abs(I)&&Math.abs(D)>40&&(D>0&&o.x<=80?f(!0):f(!1))},c=_(()=>[{"no-navbar":!s.value,"no-sidebar":!d.value.length,"sidebar-open":m.value},n.value.pageClass]);let v;$e(()=>{v=ye().afterEach(()=>{f(!1)})}),it(()=>{v()});const b=ut(),k=b.resolve,L=b.pending;return(g,D)=>(u(),p("div",{class:V(["theme-container",r(c)]),onTouchstart:l,onTouchend:i},[$(g.$slots,"navbar",{},()=>[r(s)?(u(),N($n,{key:0,onToggleSidebar:f},{before:B(()=>[$(g.$slots,"navbar-before")]),after:B(()=>[$(g.$slots,"navbar-after")]),_:3})):w("",!0)]),y("div",{class:"sidebar-mask",onClick:D[0]||(D[0]=I=>f(!1))}),$(g.$slots,"sidebar",{},()=>[C(Zn,null,{top:B(()=>[$(g.$slots,"sidebar-top")]),bottom:B(()=>[$(g.$slots,"sidebar-bottom")]),_:3})]),$(g.$slots,"page",{},()=>[r(n).home?(u(),N(Ft,{key:0})):(u(),N(pe,{key:1,name:"fade-slide-y",mode:"out-in",onBeforeEnter:r(k),onBeforeLeave:r(L)},{default:B(()=>[(u(),N(Un,{key:r(t).path},{top:B(()=>[$(g.$slots,"page-top")]),"content-top":B(()=>[$(g.$slots,"page-content-top")]),"content-bottom":B(()=>[$(g.$slots,"page-content-bottom")]),bottom:B(()=>[$(g.$slots,"page-bottom")]),_:3}))]),_:3},8,["onBeforeEnter","onBeforeLeave"]))])],34))}});var aa=T(ea,[["__file","Layout.vue"]]);export{aa as default};
