import{d as h,r as N,q as g,c as w,b as s,y as n,e as r,w as c,s as y,z as V,h as C,t as M,C as k,G as x,f as l,g as b,o as i,j as d,_ as B}from"./index-Df5Rugzl.js";import{M as Y}from"./style-ChfHFeu9.js";import{f as D}from"./index-DzkZSsWB.js";const E={class:"note-view-container"},j={class:"header"},z={class:"title-row"},H={class:"title"},R={class:"meta"},T={class:"time"},q={class:"content"},G=h({__name:"NoteView",setup(I){const a=M(),_=b(),e=N({}),u=o=>k(o).format("YYYY-MM-DD HH:mm:ss"),m=async o=>{try{const t=await D(o);e.value=t.data}catch(t){console.error(t),x.error("获取笔记失败")}},p=()=>{_.push(`/notes/edit/${a.params.id}`)};return g(()=>{a.params.id&&m(Number(a.params.id))}),(o,t)=>{const f=l("el-button"),v=l("el-tag");return i(),w("div",E,[s("div",j,[s("div",z,[s("h1",H,n(e.value.title),1),r(f,{type:"primary",onClick:p},{default:c(()=>t[0]||(t[0]=[d("编辑文章")])),_:1})]),s("div",R,[e.value.group_detail?(i(),y(v,{key:0,size:"small"},{default:c(()=>[d(n(e.value.group_detail.name),1)]),_:1})):V("",!0),s("span",T,"更新于 "+n(u(e.value.updated_at||"")),1)])]),s("div",q,[r(C(Y),{modelValue:e.value.content||""},null,8,["modelValue"])])])}}}),A=B(G,[["__scopeId","data-v-8d626e25"]]);export{A as default};