var d=Object.defineProperty;var i=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var u=(o,e,a)=>e in o?d(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a,m=(o,e)=>{for(var a in e||(e={}))c.call(e,a)&&u(o,a,e[a]);if(i)for(var a of i(e))f.call(e,a)&&u(o,a,e[a]);return o};import{f as p,h as s,T as v,m as g,g as b,n as y,p as h,q as D,r as n,s as S,t as L}from"./app.9b6c14fa.js";import{S as P}from"./SkipLink.8558734e.js";var B=p({name:"FadeSlideY",setup(o,{slots:e}){const a=g(),r=a.resolve,l=a.pending;return()=>s(v,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:r,onBeforeLeave:l},()=>{var t;return(t=e.default)==null?void 0:t.call(e)})}}),F=p({name:"Layout",setup(){const o=L(),e=b(),a=S(),r=y(),l=h(),t=D(()=>e.value.blog.sidebarDisplay||o.value.blog.sidebarDisplay||"mobile");return()=>[s(P),s(n("CommonWrapper"),{},m(m({default:()=>r.value.home?s(n("HomePage")):s(B,()=>s(n("NormalPage"),{key:a.value.path}))},t.value!=="none"?{navScreenBottom:()=>s(n("BloggerInfo"))}:{}),!l.value&&t.value==="always"?{sidebar:()=>s(n("BloggerInfo"))}:{}))]}});export{F as default};
